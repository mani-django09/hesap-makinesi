# Deployment Guide - Hesap Makinesi Online

## 🚀 VPS Deployment (Ubuntu/Debian)

### Prerequisites
- VPS with Ubuntu 20.04+ or Debian 10+
- Domain name (hesap-makinesi.online)
- Root or sudo access

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

### Step 2: Clone Project

```bash
# Create project directory
sudo mkdir -p /var/www/hesap-makinesi-online
sudo chown -R $USER:$USER /var/www/hesap-makinesi-online

# Clone or upload your project
cd /var/www/hesap-makinesi-online
git clone <your-repo-url> .

# Or upload via SCP
# scp -r hesap-makinesi-online/* user@your-server:/var/www/hesap-makinesi-online/
```

### Step 3: Backend Setup

```bash
cd /var/www/hesap-makinesi-online/backend

# Install dependencies
npm install

# Create .env file
nano .env
```

Add to `.env`:
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://hesap-makinesi.online
ALLOWED_ORIGINS=https://hesap-makinesi.online,https://www.hesap-makinesi.online
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

```bash
# Start with PM2
pm2 start server.js --name hesap-makinesi-api
pm2 save
pm2 startup
```

### Step 4: Frontend Setup

```bash
cd /var/www/hesap-makinesi-online/frontend

# Install dependencies
npm install

# Create .env.local
nano .env.local
```

Add to `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://hesap-makinesi.online/api
NEXT_PUBLIC_SITE_URL=https://hesap-makinesi.online
```

```bash
# Build for production
npm run build

# Start with PM2
pm2 start npm --name hesap-makinesi-frontend -- start
pm2 save
```

### Step 5: Nginx Configuration

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/hesap-makinesi
```

Add configuration:
```nginx
# Redirect www to non-www
server {
    listen 80;
    server_name www.hesap-makinesi.online;
    return 301 https://hesap-makinesi.online$request_uri;
}

# Main server block
server {
    listen 80;
    server_name hesap-makinesi.online;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # API proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
    gzip_disable "MSIE [1-6]\.";
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/hesap-makinesi /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 6: SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d hesap-makinesi.online -d www.hesap-makinesi.online

# Auto-renewal (certbot sets this up automatically, but verify)
sudo certbot renew --dry-run
```

### Step 7: Firewall Setup

```bash
# Enable UFW
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

## 📊 Monitoring

### PM2 Monitoring

```bash
# Check status
pm2 status

# View logs
pm2 logs hesap-makinesi-api
pm2 logs hesap-makinesi-frontend

# Monitor resources
pm2 monit

# Restart services
pm2 restart hesap-makinesi-api
pm2 restart hesap-makinesi-frontend

# Reload services (zero downtime)
pm2 reload all
```

### System Monitoring

```bash
# Check disk space
df -h

# Check memory
free -h

# Check CPU
htop

# Check Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔄 Updates & Maintenance

### Updating Code

```bash
cd /var/www/hesap-makinesi-online

# Pull latest changes
git pull origin main

# Update backend
cd backend
npm install
pm2 restart hesap-makinesi-api

# Update frontend
cd ../frontend
npm install
npm run build
pm2 restart hesap-makinesi-frontend
```

### Database Backups (if using a database later)

```bash
# Create backup script
nano /home/user/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/user/backups"
mkdir -p $BACKUP_DIR

# Backup files
tar -czf $BACKUP_DIR/hesap-makinesi-$DATE.tar.gz /var/www/hesap-makinesi-online

# Keep only last 7 days
find $BACKUP_DIR -name "hesap-makinesi-*.tar.gz" -mtime +7 -delete
```

```bash
# Make executable
chmod +x /home/user/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /home/user/backup.sh
```

## 🔍 Troubleshooting

### Backend not responding
```bash
pm2 logs hesap-makinesi-api
pm2 restart hesap-makinesi-api
```

### Frontend not loading
```bash
pm2 logs hesap-makinesi-frontend
pm2 restart hesap-makinesi-frontend
```

### Nginx errors
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### Port already in use
```bash
# Find process using port 5000
sudo lsof -i :5000
# Kill process
sudo kill -9 <PID>
```

## 🌐 DNS Configuration

Point your domain to your VPS IP:

```
A Record: hesap-makinesi.online → YOUR_VPS_IP
A Record: www.hesap-makinesi.online → YOUR_VPS_IP
```

## 📈 Performance Optimization

### Enable Redis (Optional)

```bash
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

### Configure PM2 Cluster Mode

```bash
# Edit ecosystem file
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'hesap-makinesi-api',
      script: './backend/server.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'hesap-makinesi-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      instances: 1,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
```

```bash
pm2 start ecosystem.config.js
```

## 🛡️ Security Checklist

- [x] SSL certificate installed
- [x] Firewall configured (UFW)
- [x] Rate limiting enabled in API
- [x] CORS properly configured
- [x] Environment variables secured
- [x] Nginx security headers configured
- [x] Regular system updates scheduled
- [x] PM2 process monitoring
- [x] Log rotation configured
- [x] Backups automated

## 📞 Support

For deployment issues:
- Check logs: `pm2 logs`
- Check Nginx: `sudo nginx -t`
- Check system: `systemctl status`

## 🎉 Post-Deployment

After successful deployment:
1. Test all calculator pages
2. Check SEO (Google Search Console)
3. Test mobile responsiveness
4. Monitor error logs for 24 hours
5. Set up uptime monitoring (UptimeRobot, Pingdom)
6. Add to Google Analytics
7. Submit sitemap to Google Search Console
