# 🌟 Card Management System — Full Stack Application

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black&style=flat-square)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white&style=flat-square)]()
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white&style=flat-square)]()
[![Redux Toolkit Query](https://img.shields.io/badge/RTK_Query-Data_Fetching-764abc?logo=redux&logoColor=white&style=flat-square)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)]()
[![Cypress](https://img.shields.io/badge/Cypress-E2E_Testing-17202C?logo=cypress&logoColor=white&style=flat-square)]()

[![NestJS](https://img.shields.io/badge/NestJS-Framework-e0234e?logo=nestjs&logoColor=white&style=flat-square)]()
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white&style=flat-square)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-316192?logo=postgresql&logoColor=white&style=flat-square)]()
[![Zod](https://img.shields.io/badge/Zod-Validation-3068B7?style=flat-square)]()
[![Jest](https://img.shields.io/badge/Jest-Tests-C21325?logo=jest&logoColor=white&style=flat-square)]()

[![AWS ECS](https://img.shields.io/badge/AWS-ECS_Fargate-FF9900?logo=amazonaws&logoColor=white&style=flat-square)]()
[![AWS ECR](https://img.shields.io/badge/AWS-ECR-FF9900?logo=amazonaws&logoColor=white&style=flat-square)]()
[![AWS S3](https://img.shields.io/badge/AWS-S3-569A31?logo=amazonaws&logoColor=white&style=flat-square)]()
[![CloudFront](https://img.shields.io/badge/AWS-CloudFront-CD1848?logo=amazonaws&logoColor=white&style=flat-square)]()
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?logo=githubactions&logoColor=white&style=flat-square)]()

- Frontend: http://d3mvoqjh87t1nu.cloudfront.net/
- API Documentation: http://prod-backend-alb-585718974.eu-north-1.elb.amazonaws.com/api/docs

---

A complete full-stack system containing:

- **Backend API (NestJS + Prisma + PostgreSQL)**
- **Frontend Dashboard (React + Vite + TailwindCSS + RTK Query)**

The platform manages **companies**, **cards**, **transactions**, and **spending summaries**, designed for fast insights and scalable operations.

---

## 📁 Repository Structure

```
repo/
  backend/     # NestJS API (Prisma + PostgreSQL)
  frontend/    # React Dashboard (Vite + Tailwind + RTK Query)
```

Each project includes additional documentation:

- ▶️ Backend: `backend/README.md`
- 🎨 Frontend: `frontend/README.md`

---

## 🚀 Tech Stack Overview

### **Frontend**

- React + TypeScript
- Vite
- TailwindCSS
- Redux Toolkit Query
- React Router
- Cypress (E2E)

### **Backend**

- NestJS
- Prisma ORM
- PostgreSQL
- Zod Validation
- Swagger
- Jest Testing

### **Infrastructure**

- Docker
- AWS ECS Fargate (backend)
- AWS ECR (container registry)
- AWS S3 (frontend hosting)
- AWS CloudFront (CDN)
- GitHub Actions (CI/CD)

---

## 🧩 Key Features

### 💳 Card Management

- Retrieve card details
- Activate / deactivate cards

### 🔁 Transactions & Spending

- Paginated transaction list
- Search capabilities
- Spending summaries

### 🏢 Company API

- List companies & fetch details
- Retrieve associated cards

### 🎨 Frontend UI

- Responsive navbar
- Search with debounce
- Pagination
- Error + empty states

### 🧪 Automated Testing

- Backend unit tests (Jest)
- Frontend E2E tests (Cypress)

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/riaars/card-management.git
cd card-management
```

---

# ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/YOUR_DB"
PORT=3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
npm run seed # optional
```

Start backend:

```bash
npm run start:dev
```

Swagger docs →  
`http://localhost:3000/api/docs`

---

# 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

# 🧪 Testing

### Backend:

```bash
cd backend
npm test
```

### Frontend (Cypress):

```bash
cd frontend
npm run test:e2e:open
```

---

# ☁️ Deployment

## 🟧 Backend — AWS ECS Fargate

The backend is deployed via **GitHub Actions** → ECR → ECS Fargate.

### CI/CD Workflow Steps:

- Install deps
- Run Jest tests
- Apply Prisma migrations
- Build Docker image
- Push image to Amazon ECR
- Trigger ECS deployment:

```bash
aws ecs update-service   --cluster prod-backend-cluster   --service prod-backend-service   --force-new-deployment
```

### Required GitHub Secrets

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_ACCOUNT_ID`
- `ECR_REPOSITORY`
- `DATABASE_URL`

---

## 🟦 Frontend — AWS S3 + CloudFront

The frontend deploys through GitHub Actions:

- Build React app via Vite
- Upload `dist/` folder to S3
- Invalidate CloudFront cache for instant propagation

This enables zero-downtime UI updates.

---

# 🛠 Local Development Workflow

```
# Backend
cd backend
npm run start:dev

# Frontend
cd frontend
npm run dev
```

Run both services concurrently in two terminals.

---

# 📘 Further Documentation

See subfolder READMEs:

- `backend/README.md` — API routes, services, Prisma, testing
- `frontend/README.md` — components, hooks, Cypress tests

---

# 📄 License

MIT — open for use and improvement.
