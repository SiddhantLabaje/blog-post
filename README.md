# Blog Post Management System

A full-stack Blog Post Management System built with React 18 + Vite (frontend) and Node.js + Express + MongoDB Atlas (backend).

## 🚀 Live Demo

| | URL |
|---|---|
| **Frontend** | https://blog-post-one-eta.vercel.app |
| **Backend API** | https://blog-post-2141.onrender.com/api/posts |
| **GitHub** | https://github.com/SiddhantLabaje/blog-post |

## Features

- ✅ Create, Read, Update, Delete blog posts
- ✅ Search posts by title, author, category
- ✅ Filter by category and status
- ✅ Paginated post listing
- ✅ Export posts to CSV
- ✅ View detailed post page
- ✅ Fully responsive design (mobile + desktop)
- ✅ Form validation (client-side + server-side)
- ✅ Toast notifications for success/error
- ✅ Loading, empty, and error states

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Material UI v5, React Router v6, React Hook Form, Axios, React Toastify |
| **Backend** | Node.js, Express.js, express-validator, json2csv, Morgan |
| **Database** | MongoDB Atlas (Mongoose) |
| **Deployment** | Vercel (frontend), Render (backend) |

## Project Structure

```
BlogPostManager/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level page components
│       ├── layouts/         # App shell / layout wrappers
│       ├── services/        # Axios API service layer
│       ├── hooks/           # Custom React hooks
│       ├── utils/           # Helper functions
│       └── constants/       # Shared constants
└── server/                  # Express.js backend
    ├── config/              # Database connection
    ├── controllers/         # Route handler logic
    ├── middleware/          # Error handler
    ├── models/              # Mongoose schemas
    ├── routes/              # Express route definitions
    ├── services/            # Business logic layer
    ├── utils/               # Response helpers
    └── validators/          # express-validator rules
```

## Getting Started (Local Development)

### Prerequisites

- Node.js >= 18
- MongoDB installed locally **or** a MongoDB Atlas account

### Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/blogdb
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
npm run dev
```
Runs at `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:
```bash
npm run dev
```
Runs at `http://localhost:5173`

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/posts` | Create a new post |
| `GET` | `/api/posts` | Get all posts (paginated) |
| `GET` | `/api/posts/:id` | Get a single post |
| `PUT` | `/api/posts/:id` | Update a post |
| `DELETE` | `/api/posts/:id` | Delete a post |
| `GET` | `/api/posts/search?keyword=` | Search posts by title, author, category |
| `GET` | `/api/posts/export` | Export posts as CSV |

### Pagination & Filter Params

```
GET /api/posts?page=1&limit=10&category=Technology&status=Published
```

### Search Params

```
GET /api/posts/search?keyword=react&category=Technology&status=Published&page=1&limit=10
```

### Export with Filters

```
GET /api/posts/export?category=Technology&status=Published
```

## Environment Variables

### Backend (`server/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `production` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `CLIENT_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |

### Frontend (`client/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `https://your-api.onrender.com/api` |

## Deployment

### Backend → Render

1. Push code to GitHub
2. New **Web Service** on [Render](https://render.com)
3. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Environment variables: `PORT`, `NODE_ENV`, `MONGO_URI`, `CLIENT_URL`

### Frontend → Vercel

1. New project on [Vercel](https://vercel.com)
2. Settings:
   - Root Directory: `client`
   - Framework: `Vite`
   - Output Directory: `dist`
3. Environment variable: `VITE_API_URL=https://your-api.onrender.com/api`

### Database → MongoDB Atlas

1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create database user with read/write permissions
3. Network Access: allow `0.0.0.0/0`
4. Use the SRV connection string as `MONGO_URI`

## License

MIT
