# 🎯 KASHKHATI - منصة اكتشاف الذات الثقافية

> **Cultural Self-Discovery Platform for the Middle East (Saudi, UAE, Palestine, Jordan)**

Full-stack monorepo — React 19 + TypeScript + Tailwind CSS + Express.js + PostgreSQL

---

## 📦 Structure

```
KASHKHATI/                 # ← هذا الريبو الوحيد
├── src/                   # Frontend (React + Vite)
│   ├── pages/             # 7 صفحات (Home, Quiz, Avatar, Library, Blueprint, Cultural, Monetization)
│   ├── components/ui/     # Button, Input, Card, Badge, Alert
│   ├── types/ & constants/
│   └── index.css
├── backend/               # Backend (Express.js + PostgreSQL)
│   ├── src/
│   │   ├── config/        # database + schema (7 tables)
│   │   ├── controllers/   # auth, quiz, blueprint, library, subscription
│   │   ├── middleware/auth.ts
│   │   ├── routes/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── public/
├── package.json           # Frontend package.json
└── README.md
```

---

## 🚀 Quick Start (الطريقة الأسهل)

### Windows — نقرة واحدة:
```bat
# من داخل مجلد KASHKHATI
.\start.bat
```
سيفتح **Backend** على `http://localhost:3000` و **Frontend** على `http://localhost:5173` تلقائياً.

### يدوياً:

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm run dev
# → http://localhost:3000  (health: /health)
```

**Terminal 2 — Frontend:**
```bash
npm install
npm run dev
# → http://localhost:5173
```

> **متطلبات:** Node.js 16+ و PostgreSQL 12+ مع قاعدة `kashkhati_db` (`createdb kashkhati_db`)

---

## 🔑 Environment

انسخ `backend/.env.example` إلى `backend/.env` وعدّل القيم:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kashkhati_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
```

---

## 📡 API (19 endpoints)

- `POST /api/auth/register` , `POST /api/auth/login` , `GET/PUT /api/auth/profile`
- `POST /api/quiz/submit` , `GET /api/quiz/responses`
- `POST /api/blueprint` , `GET /api/blueprint` , `GET /api/blueprint/:id`
- `GET /api/library` , `GET /api/library/:id` , `POST /api/library/:id/interact`
- `GET /api/subscription` , `POST /api/subscription/upgrade` , etc.

`Authorization: Bearer <JWT>`

---

## 🛠️ Build

```bash
# Frontend production
npm run build        # → dist/

# Backend production
cd backend
npm run build        # → backend/dist/
npm start
```

---

## 📚 Docs

- `START_HERE.md` — دليل البدء السريع
- `backend/README.md` — توثيق الـ API
- `KASHKHATI_COMPLETE_DOCUMENTATION.md` — التوثيق الشامل

---

**Made for the Middle East — Saudi, UAE, Sham (Palestine & Jordan)**
