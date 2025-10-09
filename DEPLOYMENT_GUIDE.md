# NXTLVL Deployment Guide 🚀

## Quick Start Commands

### Local Development
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend  
cd frontend
yarn install
yarn start
```

### Admin Access
- **Email**: admin@nxtlvl.gg
- **Password**: admin123
- **Login URL**: http://localhost:3000 (then use API endpoints)

## Environment Variables

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=nxtlvl_gaming
JWT_SECRET_KEY=nxtlvl-secret-key-2025
CORS_ORIGINS=*
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=443
```

## Production Deployment

### Vercel (Frontend)
```bash
npm install -g vercel
cd frontend
vercel --prod
```

### Railway (Backend)
```bash
npm install -g @railway/cli
cd backend  
railway login
railway init
railway up
```

### Environment Variables for Production
Update REACT_APP_BACKEND_URL to your deployed backend URL.

## Database Setup

The app automatically seeds the database with:
- 6 gaming products (GPUs, CPU, RAM, peripherals)
- 7 product categories
- 10 gaming brands
- 1 admin user

## API Testing
```bash
# Test products endpoint
curl https://your-backend-url/api/products

# Test admin login
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nxtlvl.gg","password":"admin123"}'
```