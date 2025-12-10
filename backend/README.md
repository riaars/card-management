# 📌 Card Management Service — Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)]()
[![NestJS](https://img.shields.io/badge/NestJS-Framework-red?style=flat-square)]()
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?style=flat-square)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square)]()
[![Tests](https://img.shields.io/badge/Tests-Jest-yellow?style=flat-square)]()

A backend service for managing **companies**, **cards**, **transactions**, and **spending summaries**.  
Built with **NestJS**, **Prisma**, and **PostgreSQL**, designed for clarity, type-safety, and production readiness.

API Documentation: http://prod-backend-alb-585718974.eu-north-1.elb.amazonaws.com/api/docs

---

## ✨ Features

### 💳 Card Management

- Retrieve card details
- Activate / deactivate cards
- List cards belonging to a company

### 💰 Spending Summaries

- Monthly spend per company
- Monthly spend per card
- Credit limit, remaining limit, and total spent calculations

### 🔁 Transaction Management

- Paginated transactions
- Search by description, category, and other metadata
- Fetch latest transactions by card

### 🏢 Company Management

- List companies
- Get company details
- Retrieve a company's cards

### 🧪 Testing

- Unit tests for controllers and services
- Prisma client mocked in tests
- Validation logic covered via controller tests

---

## 🛠 Tech Stack

**Backend**

- NestJS (Node.js framework)
- Prisma ORM
- PostgreSQL
- Zod for validation
- Swagger for API documentation

**Testing**

- Jest

**Deployment**

- Docker
- AWS ECS Fargate
- Amazon ECR
- GitHub Actions CI/CD

---

## 📁 Project Structure

```text
src/
  app.module.ts

  cards/
    cards.controller.ts
    cards.service.ts
    cards.module.ts
    cards.pipe.ts
    cards.zod.ts
    cards.controller.spec.ts
    cards.service.spec.ts

  companies/
    companies.controller.ts
    companies.service.ts
    companies.module.ts
    companies.pipe.ts
    companies.zod.ts
    companies.controller.spec.ts
    companies.service.spec.ts

  transactions/
    transactions.controller.ts
    transactions.service.ts
    transactions.module.ts
    transactions.pipe.ts
    transactions.zod.ts
    transactions.controller.spec.ts
    transactions.service.spec.ts

  spends/
    spends.controller.ts
    spends.service.ts
    spends.module.ts
    spends.pipe.ts
    spends.zod.ts
    spends.service.spec.ts

  database/
    database.module.ts
    database.service.ts
```

---

## 🧰 Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/riaars/cardmanagement.git
cd cardmanagement/backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env`

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/YOUR_DB"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 5️⃣ Run migrations

```bash
npx prisma migrate dev
```

### 6️⃣ (Optional) Seed database

```bash
npm run seed
```

---

## ▶️ Running the Project

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

API base URL (local):

```text
http://localhost:3000
```

Swagger docs:

```text
http://localhost:3000/api/docs
```

---

## 🧪 Running Tests

Run all tests:

```bash
npm test
```

Watch mode:

```bash
npm test --watch
```

Specific test file:

```bash
npm test -- src/cards/cards.service.spec.ts
```

---

## 🗄️ Prisma & Database

Apply migrations:

```bash
npx prisma migrate dev
```

Reset database:

```bash
npx prisma migrate reset
```

Prisma Studio:

```bash
npx prisma studio
```

Seed database:

```bash
npm run seed
```

---

## ☁️ Deployment — AWS ECS Fargate + GitHub Actions

This service is deployed as a **Dockerized NestJS app** running on **AWS ECS Fargate**, with images stored in **Amazon ECR**, and deployments automated via **GitHub Actions**.

### 🔁 CI/CD Workflow

Workflow file: `.github/workflows/backend-ci-cd.yml`

Triggered on:

- Push to `main` (backend changes)
- Pull requests targeting `main` (backend changes)

### 🔧 What the workflow does

1. **Checkout & Install**
   - Checks out the repo
   - Uses Node.js 20
   - Installs dependencies with `npm ci`

2. **Test & Migrate**
   - Runs unit tests: `npm run test`
   - Runs Prisma migrations against the production database:
     ```yaml
     npx prisma migrate deploy
     ```

3. **Build Docker Image**
   - Logs into Amazon ECR
   - Builds a Docker image from the `backend/` directory
   - Tags the image with:
     - Repository: `${{ secrets.ECR_REPOSITORY }}`
     - Tag: `latest`

4. **Push to ECR**
   - Pushes the image to:
     ```text
     $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest
     ```

5. **Deploy to ECS Fargate**
   - Forces a new deployment on ECS:
     ```bash
     aws ecs update-service        --cluster prod-backend-cluster        --service prod-backend-service        --force-new-deployment        --region $AWS_REGION
     ```

### 🔐 Required GitHub Secrets

In your GitHub repo settings → **Secrets and variables → Actions**, define:

- `AWS_REGION`
- `AWS_ACCOUNT_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `ECR_REPOSITORY` (ECR repo name, e.g. `cardmanagement-backend`)
- `DATABASE_URL` (production Postgres URL)

The workflow also sets:

- `ECS_CLUSTER=prod-backend-cluster`
- `ECS_SERVICE=prod-backend-service`
- `IMAGE_TAG=latest`

You can adjust these in the workflow file as your infra grows.

---

## 🔐 Environment Variables

| Variable       | Description                         |
| -------------- | ----------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string        |
| `FRONTEND_URL` | Allowed CORS origin(s)              |
| `PORT`         | App port (default: 3000)            |
| `NODE_ENV`     | Environment: `development` / `prod` |

---

## 📄 License

MIT
