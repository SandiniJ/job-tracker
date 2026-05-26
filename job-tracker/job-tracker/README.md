# ◈ Job Application Tracker

> A full-stack web app to manage and track job applications — from applied to offer.

![Tech](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Tech](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![Tech](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Tech](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens)

## 🚀 Live Demo
[View Live App](https://your-live-link.com) · [API Health](https://your-api.com/api/health)

## 📸 Screenshots
<!-- Add screenshots here after deployment -->

## ✨ Features

- 🔐 **Auth** — Register & login with JWT-based authentication
- ➕ **CRUD** — Add, edit, and delete job applications
- 📊 **Stats Dashboard** — Live counts by status (Applied, Interview, Offer, Rejected)
- 🔍 **Search & Filter** — Filter by status, search by company or role
- 📅 **Application Details** — Track company, role, location, salary, URL, notes, and date
- 📱 **Responsive** — Works on desktop and mobile

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, React Router, Axios, CSS Modules |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |
| Deployment | Vercel (frontend) + Railway (backend) |

## 📁 Project Structure

```
job-tracker/
├── client/               # React frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route-level pages
│       ├── context/      # Auth context (global state)
│       └── styles/       # Global CSS
└── server/               # Express backend
    ├── controllers/      # Route handlers
    ├── routes/           # API routes
    ├── middleware/        # JWT auth middleware
    └── db/               # PostgreSQL connection & schema
```

## 🏃 Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL

### Backend
```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173`

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT |

### Jobs (requires Authorization header)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | Get all jobs for user |
| POST | /api/jobs | Create a job application |
| PUT | /api/jobs/:id | Update an application |
| DELETE | /api/jobs/:id | Delete an application |

## 🌍 Deployment

- **Frontend** → [Vercel](https://vercel.com) (connect repo, set root to `/client`)
- **Backend** → [Railway](https://railway.app) or [Render](https://render.com)
- **Database** → Railway PostgreSQL or Supabase (free tier)

Set environment variables on your hosting platform from `.env.example`.

## 📌 Status
> ✅ Core features complete and deployed
