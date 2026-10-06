# RAHUSA Hospital Management System

A real hospital information system for RAHUSA CLINIC.

## Current foundation

- Next.js application
- PostgreSQL database through Prisma
- Permanent patient records with unique MRNs
- Patient registration
- Patient search by name, MRN or phone
- Individual patient record pages
- Clinical encounter model ready for OPD, emergency and inpatient workflows

## Local setup

1. Install Node.js 20+.
2. Copy .env.example to .env and set DATABASE_URL.
3. Run `npm install`.
4. Run `npx prisma db push`.
5. Run `npm run dev`.
6. Open http://localhost:3000.

## Deployment

The application can be deployed to Vercel. A hosted PostgreSQL database must be connected through DATABASE_URL before patient registration can persist.

## Development roadmap

1. Patient registration and longitudinal record
2. OPD consultation
3. Laboratory and radiology
4. Admission, wards, beds and inpatient monitoring
5. Pharmacy and inventory
6. Emergency/triage
7. Billing and payments
8. Reports and dashboard
9. Authentication, roles and audit trail
10. Backups, security hardening and production deployment
