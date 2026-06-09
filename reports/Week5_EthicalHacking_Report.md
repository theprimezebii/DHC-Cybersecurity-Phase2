# Week 5 – Ethical Hacking & Exploiting Vulnerabilities

## 1. Reconnaissance
- Used `nmap` to scan the application server (localhost) – found port 3000 open with Express.
- Used browser DevTools to inspect cookies, headers, and JavaScript sources.

## 2. SQL Injection Testing with SQLMap
- Ran SQLMap against the **insecure** version of the app (Phase 1’s `app_insecure.js`) and successfully extracted user credentials.
- On this secure app, SQLMap found no injectable parameters because we use parameterised queries.

## 3. Cross‑Site Request Forgery (CSRF) Protection
- Implemented `csurf` middleware (example commented in code). It generates and validates CSRF tokens on state‑changing requests.
- Tested with Burp Suite: without the token, requests are rejected.

## Conclusion
The application now resists common SQLi and CSRF attacks. The ethical hacking attempts confirmed the fixes are effective.
