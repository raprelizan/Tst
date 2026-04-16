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

## المتطلبات (What you need on your computer)

قبل التشغيل المحلي، ثبّت البرامج التالية:

1. **Node.js 20+** (يفضّل آخر إصدار LTS) + `npm`
2. **PostgreSQL 14+** + أداة `psql` (سطر الأوامر)
3. **Git** (لنسخ المشروع)
4. (اختياري) **VS Code** أو أي محرر كود

للتحقق من التثبيت:

```bash
node -v
npm -v
psql --version
git --version
```

## هل يمكن استخدام XAMPP؟

نعم، **ممكن جزئياً**:

- هذا المشروع يعتمد على **Node.js + Express + PostgreSQL** وليس PHP/MySQL.
- لذلك XAMPP ليس ضروريًا لتشغيله، لكنه يمكن أن يفيد فقط كـ **Apache reverse proxy** إذا أردت.
- ستظل بحاجة إلى:
  - Node.js (لتشغيل backend/frontend)
  - PostgreSQL (قاعدة البيانات الأساسية)

الخلاصة: يمكنك استخدام XAMPP بجانب المشروع، لكن لا يغني عن Node.js وPostgreSQL.

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

إذا ظهر خطأ `psql: command not found` فهذا يعني أن PostgreSQL Client غير مضاف إلى `PATH`.

## التثبيت والتشغيل بالتفصيل (Step-by-step)

### 1) تنزيل المشروع

```bash
git clone <YOUR_REPO_URL>
cd Tst
```

### 2) تثبيت الأدوات المطلوبة

- Node.js 20+ و npm
- PostgreSQL 14+
- Git

تحقق:

```bash
node -v
npm -v
psql --version
git --version
```

### 3) تثبيت الاعتمادات (Dependencies)

من جذر المشروع:

```bash
npm install
npm run install:all
```

### 4) إعداد قاعدة البيانات PostgreSQL

إذا برنامج تثبيت PostgreSQL سأل عن **Port** و **Locale** اختر:

- **Port:** `5432` (الخيار الافتراضي والمفضل)
- **Locale:** اتركه على **System Default** أو اختر `en_US.UTF-8`

> إذا كان المنفذ `5432` مستخدمًا فعلًا، اختر مثلًا `5433`، ثم حدّث `DATABASE_URL` بنفس المنفذ.

1. أنشئ قاعدة بيانات باسم `amansignal` (أو أي اسم تريد).
2. حدّث `DATABASE_URL` داخل `backend/.env`.

مثال:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/amansignal
```

ثم نفّذ المخطط:

```bash
cp backend/.env.example backend/.env
psql "$DATABASE_URL" -f backend/sql/schema.sql
```

### 5) إعداد مفتاح التشفير

داخل `backend/.env` ضع قيمة قوية لـ:

```env
CONFIDENTIAL_ENCRYPTION_KEY=replace_with_very_long_random_secret_min_32_chars
```

> يجب أن يكون 32 حرفًا على الأقل.

### 6) تشغيل المشروع

من جذر المشروع:

```bash
npm run dev
```

سيعمل:

- Backend على المنفذ `4000`
- Frontend على المنفذ `5173`

### 7) التحقق أن كل شيء يعمل

1. افتح: `http://localhost:5173`
2. افتح: `http://localhost:4000/api/health`
3. يجب أن ترى JSON مثل:

```json
{ "status": "ok", "service": "AmanSignal API" }
```

### 8) تشغيل كل خدمة منفصلة (اختياري)

Backend فقط:

```bash
npm run dev:backend
```

Frontend فقط:

```bash
npm run dev:frontend
```

## حل المشاكل الشائعة على Windows (PowerShell)

### 1) خطأ npm.ps1 (Execution Policy)

إذا ظهر الخطأ:
`l’exécution de scripts est désactivée sur ce système`

نفّذ PowerShell كمسؤول ثم:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

أغلق PowerShell وافتحه مجددًا، أو استخدم مباشرة:

```powershell
npm.cmd -v
```

### 2) `psql` غير معروف

هذا يعني PostgreSQL غير مثبت أو مساره غير مضاف إلى `PATH`.

- ثبّت PostgreSQL.
- أضف المسار (مثال):
  `C:\Program Files\PostgreSQL\16\bin`
- أعد فتح PowerShell ثم جرّب:

```powershell
psql --version
```

### 3) `git` غير معروف

- ثبّت Git for Windows من الموقع الرسمي.
- أثناء التثبيت اختر إضافة Git إلى PATH.
- أعد فتح PowerShell ثم:

```powershell
git --version
```

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
