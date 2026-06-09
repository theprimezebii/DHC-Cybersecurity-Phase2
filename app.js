require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const validator = require('validator');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const db = require('./database');
const logger = require('./logger');
const { hashPassword, generateToken, apiKeyAuth } = require('./utils');
const authMiddleware = require('./authMiddleware');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// --- Security Headers (Helmet + CSP) ---
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    }
  },
  strictTransportSecurity: {
    maxAge: 63072000,
    includeSubDomains: true
  }
}));

// --- CORS Configuration ---
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// --- Rate Limiting (prevents brute force) ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

// --- Log all requests ---
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// --- View Routes (same as before but improved) ---
app.get('/', (req, res) => res.render('index', { user: null }));

app.get('/signup', (req, res) => res.render('signup', { error: null }));

app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!validator.isEmail(email)) return res.render('signup', { error: 'Invalid email' });
  const safeName = validator.escape(name || '');
  const normalizedEmail = validator.normalizeEmail(email);
  const hashed = await hashPassword(password);
  try {
    db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)').run(normalizedEmail, hashed, safeName);
    logger.info('User created', { email: normalizedEmail });
    res.redirect('/login');
  } catch (err) {
    logger.error('Signup error', { error: err.message });
    res.render('signup', { error: 'Email already exists' });
  }
});

app.get('/login', (req, res) => res.render('login', { error: null }));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    logger.warn('Failed login attempt', { email });
    return res.render('login', { error: 'Invalid email or password' });
  }
  require('bcrypt').compare(password, user.password, (err, result) => {
    if (!result) {
      logger.warn('Failed login attempt (wrong password)', { email });
      return res.render('login', { error: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true, secure: false });
    logger.info('User logged in', { userId: user.id });
    res.redirect('/profile');
  });
});

app.get('/profile', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(req.user.id);
  res.render('profile', { user });
});

// --- API endpoint (secured with API key) ---
app.get('/api/users', apiKeyAuth, (req, res) => {
  const users = db.prepare('SELECT id, email, name FROM users').all();
  res.json(users);
});

app.listen(process.env.PORT || 3000, () => {
  logger.info('Phase 2 Secure App running on port ' + (process.env.PORT || 3000));
});
