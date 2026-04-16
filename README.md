# AmanSignal (أمان سيغنال)

AmanSignal is a secure intermediary platform for collecting community reports and forwarding moderated reports to competent authorities. It does **not** replace law enforcement.

## Architecture

- `frontend/`: React + Vite responsive client (Arabic/French support, mandatory Terms popup)
- `backend/`: Node.js + Express API with moderation pipeline, status tracking, and admin endpoints
- `backend/sql/schema.sql`: PostgreSQL schema for reports and indexing

## Key Safety Features

- Anonymous or confidential report modes
- Encrypted confidential contact payloads (AES-256-GCM)
- Rule-based AI moderation filter
- Legal warnings and mandatory terms acceptance
- Rate limiting to reduce abuse and spam
- Status lifecycle: `received -> under_review -> forwarded -> closed`

## API Endpoints

- `GET /api/health`
- `POST /api/reports/submit`
- `GET /api/reports/status/:trackingCode`
- `GET /api/reports/admin/reports`
- `PATCH /api/reports/admin/reports/:id/status`

## Local Setup

## التشغيل السريع (Quick Start)

```bash
# من جذر المشروع
npm install
npm run install:all
cp backend/.env.example backend/.env
```

حدّث قيمة `DATABASE_URL` داخل `backend/.env` ثم نفّذ:

```bash
psql "$DATABASE_URL" -f backend/sql/schema.sql
npm run dev
```

- الواجهة الأمامية: `http://localhost:5173`
- الـ API: `http://localhost:4000/api/health`

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Database

Create a PostgreSQL database named `amansignal`, then apply:

```bash
psql "$DATABASE_URL" -f sql/schema.sql
```

### 3) Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` if backend is not on `http://localhost:4000/api`.

## Legal/Ethical Compliance Included

- Mandatory first-use Terms popup
- Dedicated Terms page and Privacy page
- Strong disclaimers that platform is an intermediary only
- Clear warning before report submission

## Notes

- File uploads are accepted and metadata is stored; plug in secure cloud storage for production.
- Admin authentication is intentionally minimal in this starter and must be hardened before deployment.
