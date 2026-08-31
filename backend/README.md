# KASHKHATI Backend API

منصة اكتشاف الذات الثقافية - واجهة برمجية شاملة

## 📋 المتطلبات

- Node.js 16+
- PostgreSQL 12+
- npm أو yarn

## 🚀 البدء السريع

### 1. التثبيت

```bash
cd KASHKHATI-Backend
npm install
```

### 2. إعداد قاعدة البيانات

```bash
# إنشاء قاعدة بيانات PostgreSQL
createdb kashkhati_db

# أو استخدم أي واجهة إدارة قاعدة بيانات
```

### 3. تكوين البيئة

انسخ `.env.example` إلى `.env` وحدّث القيم:

```bash
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=kashkhati_db
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRY=7d

CORS_ORIGIN=http://localhost:5173
```

### 4. تشغيل التطبيق

```bash
# Development mode مع auto-reload
npm run dev

# Production build
npm run build
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/auth/profile` - الحصول على ملف المستخدم
- `PUT /api/auth/profile` - تحديث الملف الشخصي

### Quiz
- `POST /api/quiz/submit` - إرسال إجابات الاختبار
- `GET /api/quiz/responses` - الحصول على إجابات سابقة

### Blueprint
- `POST /api/blueprint` - إنشاء/تحديث الخريطة الشخصية
- `GET /api/blueprint` - الحصول على الخريطة الشخصية
- `GET /api/blueprint/:id` - الحصول على خريطة عامة

### Library
- `GET /api/library` - الحصول على محتوى المكتبة (مع تصفية وترقيم)
- `GET /api/library/:id` - الحصول على محتوى واحد
- `POST /api/library/:id/interact` - تحديد كمقروء/مرجعي
- `GET /api/library/bookmarks` - الحصول على المحفوظات

### Subscription
- `GET /api/subscription` - الحصول على الاشتراك الحالي
- `POST /api/subscription/upgrade` - ترقية الاشتراك
- `POST /api/subscription/cancel` - إلغاء الاشتراك
- `GET /api/subscription/transactions` - سجل العمليات

## 🔐 Authentication

جميع الطلبات المحمية تحتاج على رأس `Authorization`:

```
Authorization: Bearer <jwt_token>
```

## 🏗️ بنية المشروع

```
src/
├── config/
│   ├── database.ts       # تكوين قاعدة البيانات
│   └── schema.ts         # مخطط قاعدة البيانات
├── controllers/
│   ├── authController.ts
│   ├── quizController.ts
│   ├── blueprintController.ts
│   ├── libraryController.ts
│   └── subscriptionController.ts
├── middleware/
│   └── auth.ts           # middleware المصادقة
├── routes/
│   └── index.ts          # تعريف المسارات
└── index.ts              # نقطة الدخول الرئيسية
```

## 🧪 Testing

استخدم Postman أو curl لاختبار الـ API:

```bash
# Registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "fullName": "User Name"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## 📝 ملاحظات الأمان

- قم بتغيير `JWT_SECRET` في الإنتاج
- استخدم HTTPS في الإنتاج
- لا تضع معلومات حساسة في `.env` على GitHub
- فعّل CORS بشكل صحيح حسب المتطلبات

## 🤝 المساهمة

اتبع معايير الكود:
- استخدم TypeScript بـ strict mode
- أضف JSDoc comments للـ functions
- اكتب رسائل commits واضحة

## 📄 الترخيص

MIT
