# Lubis Web Platform

Full monorepo for the Lubis parent website, three division websites, and the FastAPI backend.

## Apps

- `apps/www`: Parent company website for `lubis.org`
- `apps/realestate`: Real estate website for `realestate.lubis.org`
- `apps/mental-awareness`: Mental awareness initiative website for `mentalawareness.lubis.org`
- `apps/clothing`: Clothing storefront for `clothing.lubis.org`
- `apps/api`: FastAPI backend for `api.lubis.org`

## Frontend Setup

```bash
npm install
npm run dev
```

Default local URLs:

- Parent: http://localhost:3000
- Real estate: http://localhost:3001
- Mental awareness: http://localhost:3002
- Clothing: http://localhost:3003

Each frontend has its own `.env.example`.

## Backend Setup

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
python -m app.seed
uvicorn app.main:app --reload --port 8000
```

Backend URL:

- API: http://localhost:8000
- Docs: http://localhost:8000/docs

## Backend Production Blueprint

The repository includes `render.yaml` for provisioning the production FastAPI backend and PostgreSQL database on Render.

The blueprint creates:

- `lubis-api`: FastAPI web service for `api.lubis.org`
- `lubis-postgres`: managed PostgreSQL database

Both resources are configured on Render's `free` plan by default. Free web services can spin down after inactivity, and Free Render Postgres databases expire after 30 days, so upgrade only when the site is ready for paid production traffic and persistent long-term storage.

Render injects the database connection string into `DATABASE_URL`, runs Alembic migrations when the service starts, and serves the API with Uvicorn. During the first Blueprint sync, enter the private values for Resend, Paystack, and ImgBB when Render prompts for `sync: false` environment variables.

After the backend is deployed, set this value in each Vercel frontend project:

```txt
NEXT_PUBLIC_API_URL=https://api.lubis.org
```

## Environment

Production should use PostgreSQL:

```txt
DATABASE_URL=postgresql+psycopg://lubis:password@host:5432/lubis
```

For local development, SQLite can be used while PostgreSQL is being provisioned:

```txt
DATABASE_URL=sqlite:///./lubis_dev.db
```

## Payments

The backend includes Paystack transaction initialization, verification, and webhook handling. Put live keys only in the backend `.env`; never expose `PAYSTACK_SECRET_KEY` in frontend apps.

## Email Notifications

Contact and inquiry submissions are saved in the database and can also send email notifications. Resend is preferred in production because it sends through HTTPS and works on Render's free tier. Configure these values in `apps/api/.env`, then restart the API:

```txt
NOTIFICATION_EMAIL=hello@lubis.org
RESEND_API_KEY=re_your_resend_key
SMTP_FROM_EMAIL=hello@lubis.org
SMTP_FROM_NAME=Lubis Website
```

SMTP remains available as a fallback if `RESEND_API_KEY` is not set:

```txt
NOTIFICATION_EMAIL=hello@lubis.org
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USERNAME=your-smtp-user
SMTP_PASSWORD=your-smtp-password
SMTP_FROM_EMAIL=hello@lubis.org
SMTP_FROM_NAME=Lubis Website
SMTP_USE_TLS=true
```

If `SMTP_HOST` is empty, submissions will still save but no email will be sent.

## Media

The supplied `image/lubis-logo.png` and `image/lubis-hero.png` are copied into each frontend app under `public/brand`.

## Verification

```bash
npm run typecheck
cd apps/api
pytest
```
