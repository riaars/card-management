# 📌 **Card Management Service -- Backend API**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)]()
[![NestJS](https://img.shields.io/badge/NestJS-Framework-red?style=flat-square)]()
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?style=flat-square)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square)]()
[![Tests](https://img.shields.io/badge/Tests-Jest-yellow?style=flat-square)]()

A backend service for managing **companies**, **cards**,
**transactions**, and **spending summaries**.\
Built with **NestJS**, **Prisma**, and **PostgreSQL** --- designed for
scalability, clarity, and strong type safety.

---

# 🚀 Features

### 🧾 **Card Management**

- Retrieve card details\
- Activate / deactivate cards\
- List cards belonging to a company

### 💰 **Spending Summaries**

- Monthly spend by company\
- Monthly spend by individual card\
- Calculates credit limit, remaining limit & total spent\
- Handles Prisma `Decimal` gracefully

### 💳 **Transaction Management**

- Paginated transactions\
- Search support (`description`, `category`, `data points`)\
- Fetch latest transactions by card

### 🏢 **Company Management**

- List companies\
- Get company details\
- Retrieve company's cards

### 🧪 **Robust Unit Tests**

- Controllers\
- Services\
- Prisma mocks\
- Validation pipes indirectly through controller tests

---

# 📁 Project Structure

    src/
      app.module.ts

      cards/
        cards.controller.spec.ts
        cards.controller.ts
        cards.module.ts
        cards.pipe.ts
        cards.service.spec.ts
        cards.service.ts
        cards.zod.ts

      companies/
        companies.controller.spec.ts
        companies.controller.ts
        companies.module.ts
        companies.pipe.ts
        companies.service.ts
        companies.service.spec.ts
        companies.zod.ts

      transactions/
        transactions.controller.spec.ts
        transactions.controller.ts
        transactions.module.ts
        transactions.pipe.ts
        transactions.service.spec.ts
        transactions.service.ts
        transactions.zod.ts

      spends/
       spends.controller.spec.ts
        spends.controller.ts
        spends.module.ts
        spends.pipe.ts
        spends.service.spec.ts
        spends.service.ts
        spends.types.ts
        spends.zod.ts

      database/
        database.module.ts
        database.service.ts

---

# ⚙️ Tech Stack

- **NestJS** -- Modular Node.js framework\
- **Prisma ORM** -- Type-safe database queries\
- **PostgreSQL** -- Relational database\
- **Zod Validation** -- Param & query schema validation\
- **Swagger** -- Auto-generated API docs\
- **Jest** -- Unit testing

---

# 🧰 Local Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/riaars/cardmanagement.git
cd card-management
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Create `.env` file

    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/YOUR_DB"
    PORT=3000
    NODE_ENV=development

## 4️⃣ Generate Prisma Client

```bash
npx prisma generate
```

## 5️⃣ Run migrations

```bash
npx prisma migrate dev
```

## 6️⃣ Seed database (optional)

```bash
npm run seed
```

---

# ▶️ Running the Project

### Development mode

```bash
npm run start:dev
```

### Production mode

```bash
npm run build
npm run start:prod
```

---

# 📚 API Documentation (Swagger)

Swagger UI is available at:

    http://localhost:3000/api/docs

Automatically updated based on your controllers & DTOs.

---

# 🧪 Running Tests

### Run entire test suite

```bash
npm test
```

### Run in watch mode

```bash
npm test --watch
```

### Run a specific test file

```bash
npm test -- src/cards/cards.service.spec.ts
```

---

# 🗄️ Prisma & Database Commands

### Apply migrations

```bash
npx prisma migrate dev
```

### Reset the database

```bash
npx prisma migrate reset
```

### Open Prisma Studio

```bash
npx prisma studio
```

### Seed database

```bash
npm run seed
```

---

# 🔐 Environment Variables

Variable Description

---

- `DATABASE_URL` PostgreSQL connection string
- `FRONTEND_URL` Allowed origin
- `PORT` App port (default 3000)
- `NODE_ENV` Environment (development/production)

---

# 📄 License

MIT
