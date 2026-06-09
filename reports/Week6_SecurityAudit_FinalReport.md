# Week 6 – Advanced Security Audits & Final Deployment Security

## 1. Security Audits
- **OWASP ZAP**: Scanned the running app – no high‑risk alerts. All previously found vulnerabilities are absent.
- **Nikto**: Ran against localhost:3000 – clean, only informational items.
- **Lynis**: System audit (run separately) – no critical issues.

## 2. Compliance with OWASP Top 10
- Verified each category (Injection, Broken Authentication, Sensitive Data Exposure, etc.) – all mitigated.

## 3. Final Penetration Testing
- Burp Suite active scan: No SQLi, XSS, or access control flaws.
- Unauthenticated access to `/profile` returns 401.
- Rate limiting blocks excessive requests.

## 4. Secure Deployment Practices
- `npm audit` shows 0 vulnerabilities.
- Docker security best practices (non‑root user, minimal base image) recommended – see `Dockerfile` (optional).

## 5. Conclusion
The application is ready for secure deployment. All Phase 2 objectives have been met.
