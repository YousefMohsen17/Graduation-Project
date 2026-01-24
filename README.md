# Engipedia - Engineering Education Platform

A comprehensive full-stack web application for engineering students to access courses, track progress, and engage with a learning community.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd gradProject
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Add your MongoDB URI and JWT secret to .env
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

## 🛠️ Tech Stack

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Recharts

**Backend:**
- Node.js
- Express
- MongoDB/Mongoose
- JWT Authentication
- Passport.js

## 📝 License

MIT
