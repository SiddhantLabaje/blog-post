# Blog Post Management System

A full-stack production-ready Blog Post Management System built with React 18 + Vite (frontend) and Node.js + Express + MongoDB Atlas (backend).

## Features

- ✅ Create, Read, Update, Delete blog posts
- ✅ Search posts by title, author, category
- ✅ Filter by category and status
- ✅ Paginated post listing
- ✅ Export posts to CSV
- ✅ View detailed post page
- ✅ Fully responsive (mobile-first)
- ✅ Form validation (client & server)
- ✅ Toast notifications
- ✅ Loading, empty, and error states

## Tech Stack

**Frontend:** React 18, Vite, Material UI v5, React Router v6, React Hook Form, Axios, React Toastify

**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, express-validator, json2csv

## Project Structure

```
BlogPostManager/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── routes/
│       ├── services/
│       ├── hooks/
│       ├── utils/
│       └── constants/
└── server/          # Express.js backend
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    ├── utils/
    └── validators/
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB Atlas account (free tier works)

### Backend Setup

1. Navigate to server directory:
   ```bash
   cd BlogPostManager/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/blogdb
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd BlogPostManager/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```
   App runs at `http://localhost:5173`

## API Reference

| Method | Endpoint                     | Description                  |
|--------|------------------------------|------------------------------|
| POST   | `/api/posts`                 | Create a new post            |
| GET    | `/api/posts`                 | Get all posts (paginated)    |
| GET    | `/api/posts/:id`             | Get a single post            |
| PUT    | `/api/posts/:id`             | Update a post                |
| DELETE | `/api/posts/:id`             | Delete a post                |
| GET    | `/api/posts/search?keyword=` | Search posts                 |
| GET    | `/api/posts/export`          | Export posts as CSV          |

### Pagination Query Params

`GET /api/posts?page=1&limit=10&category=Tech&status=Published`

**Response:**
```json
{
  "success": true,
  "posts": [],
  "currentPage": 1,
  "totalPages": 5,
  "totalPosts": 50
}
```

## Deployment

### Backend → Render

1. Push your code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables:
   - `PORT=5000`
   - `MONGO_URI=<your-atlas-uri>`
   - `CLIENT_URL=<your-vercel-url>`
   - `NODE_ENV=production`

### Frontend → Vercel

1. Push your code to GitHub
2. Create a new project on [Vercel](https://vercel.com)
3. Set:
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   - `VITE_API_URL=<your-render-backend-url>/api`

### Database → MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user
3. Whitelist IP: `0.0.0.0/0` (all IPs) for Render compatibility
4. Copy the connection string to `MONGO_URI`

## Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://...
CLIENT_URL=https://your-app.vercel.app
NODE_ENV=production
```

### Frontend (`client/.env`)

```env
VITE_API_URL=https://your-api.onrender.com/api
```

## License

MIT
"# blog-post" 
"# blog-post" 
