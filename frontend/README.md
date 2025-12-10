# 🌐 Card Management - Frontend

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white&style=flat-square)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white&style=flat-square)]()
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white&style=flat-square)]()
[![Redux Toolkit Query](https://img.shields.io/badge/RTK_Query-Data_Fetching-764abc?logo=redux&logoColor=white&style=flat-square)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)]()
[![Cypress](https://img.shields.io/badge/Cypress-E2E_Testing-17202C?logo=cypress&logoColor=white&style=flat-square)]()
[![AWS S3](https://img.shields.io/badge/AWS-S3_Deployment-FF9900?logo=amazonaws&logoColor=white&style=flat-square)]()
[![CloudFront](https://img.shields.io/badge/AWS-CloudFront-CD1848?logo=amazonaws&logoColor=white&style=flat-square)]()
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?logo=githubactions&logoColor=white&style=flat-square)]()

A React + TypeScript web application for viewing company card details and their associated transactions.  
Built for speed, clean UI, and smooth data browsing — deployed automatically to **AWS S3 + CloudFront** using GitHub Actions.

Access via: https://d3mvoqjh87t1nu.cloudfront.net/

---

## ✨ Features

- **Dashboard & Transactions View**  
  View card information and paginated transactions, including search and filtering.

- **Search with Debounce**  
  Fast, efficient filtering of transactions as the user types.

- **Responsive UI + Mobile Menu**  
  Sticky navbar with a mobile-friendly dropdown menu.

- **Real-time Data Fetching** (RTK Query)  
  Loading states, error handling (including rate-limit 429), and caching built-in.

- **404 – Not Found Page**  
  Friendly fallback screen for invalid routes.

- **E2E Tests with Cypress**  
  Includes tests for the homepage, transaction page, and not-found route.

- **Automated Deployment to S3 + CloudFront**  
  GitHub Actions workflow builds and deploys the app automatically on push.

---

## 🛠 Tech Stack

**Frontend**

- React (TypeScript)
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit Query (RTK Query)
- React Compiler
- ESLint

**Testing**

- Cypress (E2E)

**Deployment**

- AWS S3
- AWS CloudFront
- GitHub Actions (CI/CD)

---

## 🚀 Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Run development server

```
npm run dev
```

Visit: http://localhost:5173

### 3. Build for production

```
npm run build
```

### 4. Preview production build

```
npm run preview
```

---

## 🧪 Running E2E Tests (Cypress)

Open Cypress UI:

```
npm run test:e2e:open
```

Run tests headless:

```
npm run test:e2e
```

---

## ☁️ Deployment (S3 + CloudFront)

This project is deployed automatically using **GitHub Actions**:

- Builds the Vite project
- Uploads the `dist/` folder to S3
- Invalidates CloudFront cache for updated assets

---

## 📁 Project Structure (Short Overview)

```
src/
  app/
  assets/
  features/
    transactions/
    cards/
    spends/
    companies/
  shared/
    components/
    utils/
  pages/
  layout/
  routes/
```

# 📄 License

MIT
