# Quick Installation Commands

## 📦 One-Line Setup (Recommended)

```bash
chmod +x setup.sh && ./setup.sh
```

## 🔧 Manual Setup

### Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend Setup (in new terminal)
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

## 🚀 Production Build

### Backend Production
```bash
cd backend
npm install
npm start
```

### Frontend Production
```bash
cd frontend
npm install
npm run build
npm start
```

## 📍 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 🧪 Test API

```bash
# Basic Calculator
curl -X POST http://localhost:5000/api/hesap-makinesi \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5, "operation": "add"}'

# Percentage Calculator
curl -X POST http://localhost:5000/api/yuzde-hesaplama \
  -H "Content-Type: application/json" \
  -d '{"value": 100, "percentage": 20, "operation": "find"}'

# Age Calculator
curl -X POST http://localhost:5000/api/yas-hesaplama \
  -H "Content-Type: application/json" \
  -d '{"birthDate": "1990-01-15"}'

# KDV Calculator
curl -X POST http://localhost:5000/api/kdv-hesaplama \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000, "vatRate": 18, "operation": "add"}'
```

## 🐳 Docker (Optional)

### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000/api
```

## 📦 PM2 Deployment

```bash
# Install PM2
npm install -g pm2

# Start Backend
cd backend
pm2 start server.js --name hesap-makinesi-api

# Start Frontend
cd frontend
npm run build
pm2 start npm --name hesap-makinesi-frontend -- start

# Save PM2 config
pm2 save

# Setup startup script
pm2 startup
```

## 🔄 Update Commands

```bash
# Pull latest changes
git pull origin main

# Update Backend
cd backend
npm install
pm2 restart hesap-makinesi-api

# Update Frontend
cd frontend
npm install
npm run build
pm2 restart hesap-makinesi-frontend
```

## 🧹 Cleanup Commands

```bash
# Remove node_modules
rm -rf backend/node_modules frontend/node_modules

# Remove build files
rm -rf frontend/.next

# Remove logs
rm -rf backend/logs frontend/logs

# Fresh install
cd backend && npm install
cd frontend && npm install
```

## 🔍 Troubleshooting Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check running processes
ps aux | grep node

# Check ports
lsof -i :3000
lsof -i :5000

# Kill process on port
kill -9 $(lsof -t -i:5000)

# Clear npm cache
npm cache clean --force

# Check PM2 status
pm2 status
pm2 logs
```

## 📊 Monitoring Commands

```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs hesap-makinesi-api
pm2 logs hesap-makinesi-frontend

# System resources
htop
df -h
free -h
```

## 🌐 Nginx Commands

```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔐 SSL Commands

```bash
# Install SSL certificate
sudo certbot --nginx -d hesap-makinesi.online

# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

## 📝 Git Commands

```bash
# Clone repository
git clone <repo-url>

# Create new branch
git checkout -b feature/new-calculator

# Commit changes
git add .
git commit -m "Add new calculator"

# Push changes
git push origin feature/new-calculator

# Pull latest
git pull origin main
```
