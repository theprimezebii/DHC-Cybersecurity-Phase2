# Cybersecurity Internship Phase 2 – Advanced Security Implementation

This repository contains the **Week 4–6** deliverables for the DevelopersHub Corporation Cybersecurity Internship.

## Implemented Security Measures

### Week 4: Advanced Threat Detection & Web Security
- **Intrusion Detection**: Custom log monitor (`intrusion-detector.js`) detects brute-force login attempts and prints alerts (simulates Fail2Ban/OSSEC).
- **Rate Limiting**: `express-rate-limit` applied globally to prevent brute-force attacks.
- **CORS**: Configured to allow only trusted origins.
- **API Security**: A protected route (`/api/users`) using API key authentication (`x-api-key` header).
- **Security Headers & CSP**: Helmet with a strict Content Security Policy and HSTS.

### Week 5: Ethical Hacking & Exploitation Prevention
- **SQL Injection**: Tested with SQLMap on the previous insecure app; this app uses parameterised queries to prevent SQLi.
- **CSRF Protection**: Implemented using `csurf` middleware (see `csurf` branch or code comments).
- **Ethical Hacking Report**: see `reports/week5-ethical-hacking-report.md`.

### Week 6: Security Audits & Penetration Testing
- **OWASP ZAP/Nikto/Lynis** audit results are summarised in `reports/week6-security-audit-report.md`.
- **Final Penetration Testing** confirmed all previous vulnerabilities are fixed.
- **Secure Deployment Practices**: Automatic update checks with `npm audit`, container scanning recommendations in report.
- **Video Walkthrough**: (link to be added)

## How to Run
1. Clone this repo
2. `npm install`
3. Copy `.env.example` to `.env` and set secrets
4. `node app.js`
5. Open `http://localhost:3000`

## Reports
All detailed reports are in the `reports/` folder.

## Video Recording
[Insert YouTube/Drive link here after recording]
