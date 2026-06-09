const fs = require('fs');
const LOG_FILE = 'security.log';
const FAIL_THRESHOLD = 5;
const WINDOW_MS = 60 * 1000; // 1 minute
const failedAttempts = {};

fs.watchFile(LOG_FILE, { interval: 2000 }, (curr, prev) => {
  const logs = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(Boolean);
  const now = Date.now();
  for (let line of logs) {
    if (line.includes('Failed login attempt')) {
      const match = line.match(/"email":"([^"]+)"/);
      const email = match ? match[1] : 'unknown';
      if (!failedAttempts[email]) failedAttempts[email] = [];
      failedAttempts[email].push(now);
      // remove old entries
      failedAttempts[email] = failedAttempts[email].filter(t => now - t < WINDOW_MS);
      if (failedAttempts[email].length >= FAIL_THRESHOLD) {
        console.log(`[ALERT] Brute-force detected for user ${email} – ${failedAttempts[email].length} failed attempts in 1 minute`);
        // Could send email, trigger firewall rule, etc.
      }
    }
  }
});
console.log('Intrusion detector running...');
