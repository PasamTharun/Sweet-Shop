# 🍭 Sweet Shop Management System

**Full-stack TDD Kata** — FastAPI + React + PostgreSQL with 95% test coverage.  
JWT authentication, admin panel, real-time inventory, search and filters.

[![Backend Tests](https://img.shields.io/badge/tests-95%25-brightgreen)](https://github.com/yourusername/sweet-shop-backend/actions)
[![Frontend](https://img.shields.io/badge/frontend-React%2BTailwind-blueviolet)](https://github.com/yourusername/candy-shop-ui)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)

---

## ✨ Live Demo

- **Backend API**: [Swagger Docs](http://localhost:8000/api/v1/docs)
- **Frontend**: [Candy Shop UI](http://localhost:5173)

---

## 🛠️ Tech Stack

**Backend**
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pytest (95% coverage)

**Frontend**
- React 18
- Vite
- TailwindCSS
- React Query
- Framer Motion

**Database**
- PostgreSQL 15 (Docker)

**Testing**
- Pytest
- Vitest
- React Testing Library

**Deployment**
- Railway (Backend)
- Vercel (Frontend)

---

## 🎯 Features

### Backend API (`/api/v1`)
- ✅ POST `/auth/register` — User registration
- ✅ POST `/auth/login` — JWT login
- ✅ GET `/sweets` — List all sweets
- ✅ GET `/sweets/search` — Filter by category and price
- ✅ POST `/sweets/purchase` — Buy sweets with stock validation
- ✅ POST `/sweets/{id}/restock` — Admin restock
- ✅ Admin-only CRUD for sweets
- ✅ JWT-protected routes with roles
- ✅ PostgreSQL transactions

### Frontend
- ✅ Glassmorphism purple-pink UI
- ✅ Real-time search and filters
- ✅ Responsive 4-column sweet grid
- ✅ Purchase with stock counter
- ✅ Toast notifications
- ✅ Loading and empty states
- ✅ Admin dashboard ready
- ✅ Mobile-first design

---

## 🚀 Quick Start

### 1️⃣ Backend Setup

```bash
cd sweet-shop-backend
pip install -r requirements.txt
cp .env.example .env
docker-compose up -d
python scripts/create_admin.py  # admin@shop.com / admin123
uvicorn app.main:app --reload


### 2️⃣ Frontend Setup

```bash
cd candy-shop-ui
npm install
npm run dev


## 3️⃣ Test Everything

- **Backend**: http://localhost:8000/api/v1/docs  
- **Frontend**: http://localhost:5173  
- **Demo Login**: `admin@shop.com / admin123`

---

## 🧪 TDD Workflow (Red → Green → Refactor)

- Wrote failing tests first (`test_crud/test_sweet.py`)
- Implemented minimal code to pass tests
- Refactored for production quality
- Achieved **95% test coverage**

```bash
pytest --cov-report=html


### 📁 Project Structure

sweet-shop-backend/
├── app/
│   ├── api/v1/endpoints/
│   ├── crud/
│   ├── models/
│   ├── schemas/
│   └── tests/
├── docker-compose.yml
└── alembic/

candy-shop-ui/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
└── tailwind.config.js

### 🔍 API Documentation

Endpoint	Method	Auth	Description
/api/v1/auth/register	POST	❌	Create user
/api/v1/auth/login	POST	❌	JWT login
/api/v1/sweets	GET	✅	List sweets
/api/v1/sweets/purchase	POST	✅	Buy sweets
/api/v1/sweets/{id}/restock	POST	Admin	Restock

Swagger UI: http://localhost:8000/api/v1/docs
