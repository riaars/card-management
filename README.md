# 🌟 Card Management System

This repository contains both the **backend API** and **frontend
dashboard** for the Card Management System.\
It provides company, card, transaction, and spending analytics used for
finance dashboards and internal management tools.

---

# 📁 Folder Structure

    repo/
      backend/    # NestJS + Prisma + PostgreSQL API
      frontend/   # ReactJS UI

Each project includes its own README with deeper documentation.

- 👉 **Backend README:** `backend/README.md`
- 👉 **Frontend README:** `frontend/README.md`

---

# 🚀 Tech Stack

### **Backend**

- NestJS
- Prisma ORM
- PostgreSQL
- Zod validation
- Swagger (OpenAPI docs)
- Jest unit tests

### **Frontend**

- React
- TailwindCSS
- RTK Query

---

# ▶️ Getting Started

## 1️⃣ Clone the repository

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

Create `.env` inside `backend/`:

    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/YOUR_DB"
    PORT=3000
    NODE_ENV=development

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
# optional
npm run seed
```

Run backend dev server:

```bash
npm run start:dev
```

Backend Swagger docs:

    http://localhost:3000/api/docs

---

# 🎨 Frontend Setup

```bash
cd ../frontend
npm install
```

Start the dev server:

```bash
npm run dev
```

Frontend available at:

    http://localhost:5174

(or whichever port your framework uses)

---

# 🧪 Testing

### Backend tests:

```bash
cd backend
npm test
```

### Frontend tests:

```bash
cd frontend
npm test
```

---

# 🛠 Development Workflow

Open **two terminals**:

    # Terminal 1 — Backend
    cd backend
    npm run start:dev

    # Terminal 2 — Frontend
    cd frontend
    npm run dev

---

# 📘 Documentation

Full documentation is available inside each project folder:

- **Backend docs:** API routes, Prisma usage, pipes, validation, and
  testing\
- **Frontend docs:** UI structure, components, hooks, and state
  management

---

# 📄 License

MIT
