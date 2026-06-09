# Week 4 – Advanced Threat Detection & Web Security Enhancements

## 1. Intrusion Detection & Monitoring
- Implemented a custom log‑based intrusion detector (`intrusion-detector.js`) that watches `security.log` for failed login attempts.
- When more than 5 failed attempts for the same email occur within 1 minute, it logs `[ALERT] Brute-force detected`.
- This mimics the behaviour of Fail2Ban/OSSEC and can be extended to send emails or block IPs.

## 2. API Security Hardening
- **Rate Limiting**: Using `express-rate-limit` to allow only 100 requests per 15 minutes per IP.
- **CORS**: Restricted to `http://localhost:3000` only.
- **API Key Authentication**: The `/api/users` endpoint requires an `x-api-key` header matching the secret in `.env`.

## 3. Security Headers & CSP
- Helmet configured with:
  - `Content-Security-Policy`: only loads scripts from `'self'` and `cdnjs.cloudflare.com`, styles inline allowed, images data.
  - `Strict-Transport-Security`: max-age=1 year, includeSubDomains.
- These headers prevent XSS and enforce HTTPS.

## Evidence
All code is committed in this repository. Run the app and check the response headers via DevTools.
