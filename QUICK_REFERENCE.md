# 📋 QUICK REFERENCE CARD

## 🚀 INSTANT START (Copy-Paste)

```bash
# Extract
tar -xzf hesap-makinesi-online.tar.gz && cd hesap-makinesi-online

# Setup
chmod +x setup.sh && ./setup.sh

# Start Backend (Terminal 1)
cd backend && npm run dev

# Start Frontend (Terminal 2 - in new terminal)
cd frontend && npm run dev

# Open Browser
# http://localhost:3000
```

---

## 📁 IMPORTANT FILES

| File | Purpose |
|------|---------|
| `START_HERE.md` | 👈 **BEGIN HERE** - Complete setup guide |
| `README.md` | Full project documentation |
| `DEPLOYMENT.md` | VPS deployment instructions |
| `VSCODE_SETUP.md` | VS Code configuration |
| `INSTALL_COMMANDS.md` | All useful commands |
| `PROJECT_SUMMARY.md` | What's included |

---

## 🔢 CALCULATOR STATUS

✅ = Fully Complete | 🔧 = API Ready (Copy UI Pattern)

| # | Calculator | Backend | Frontend |
|---|------------|---------|----------|
| 1 | Hesap Makinesi | ✅ | ✅ |
| 2 | Yüzde Hesaplama | ✅ | ✅ |
| 3 | Yaş Hesaplama | ✅ | 🔧 |
| 4 | Yükselen Hesaplama | ✅ | 🔧 |
| 5 | KDV Hesaplama | ✅ | 🔧 |
| 6 | Gebelik Hesaplama | ✅ | 🔧 |
| 7 | İdeal Kilo | ✅ | 🔧 |
| 8 | LGS Puan | ✅ | 🔧 |
| 9 | KPSS Puan | ✅ | 🔧 |
| 10 | ALES Puan | ✅ | 🔧 |
| 11 | YKS Sayaç | ✅ | 🔧 |
| 12 | İşsizlik Maaşı | ✅ | 🔧 |
| 13 | Zekat | ✅ | 🔧 |
| 14 | Vize Final | ✅ | 🔧 |

---

## 🎯 TO COMPLETE A CALCULATOR

```bash
# 1. Create directory
mkdir frontend/app/calculator-name

# 2. Copy example
cp frontend/app/hesap-makinesi/page.js frontend/app/calculator-name/page.js

# 3. Edit page.js:
#    - Update form fields
#    - Update API endpoint call
#    - Update metadata
#    - Update content
```

---

## 🔌 API ENDPOINTS

All on: `http://localhost:5000/api/`

| Endpoint | Method | Example Body |
|----------|--------|--------------|
| `/hesap-makinesi` | POST | `{"num1": 10, "num2": 5, "operation": "add"}` |
| `/yuzde-hesaplama` | POST | `{"value": 100, "percentage": 20, "operation": "find"}` |
| `/yas-hesaplama` | POST | `{"birthDate": "1990-01-15"}` |
| `/kdv-hesaplama` | POST | `{"amount": 1000, "vatRate": 18, "operation": "add"}` |

Full list in `README.md`

---

## 🛠️ COMMANDS

### Development
```bash
cd backend && npm run dev     # Backend on :5000
cd frontend && npm run dev    # Frontend on :3000
```

### Production
```bash
cd backend && npm start       # Backend
cd frontend && npm run build && npm start  # Frontend
```

### PM2
```bash
pm2 start server.js --name api
pm2 start npm --name frontend -- start
pm2 status
pm2 logs
```

---

## 📊 PROJECT SIZE

- **Files**: ~27 files
- **Backend**: Express.js + 14 calculator APIs
- **Frontend**: Next.js + 2 complete calculator pages
- **Size**: ~31KB compressed
- **Lines of Code**: ~3,500+ lines

---

## ✨ FEATURES

- ✅ All 14 calculator APIs working
- ✅ 2 complete calculator pages (examples)
- ✅ SEO optimized (meta tags, schemas, sitemap)
- ✅ Dark mode support
- ✅ Mobile responsive
- ✅ Security (rate limiting, validation)
- ✅ Production ready
- ✅ Complete documentation

---

## 🎨 TECH STACK

### Backend
- Node.js 18+
- Express.js
- express-validator
- helmet, cors, rate-limit

### Frontend
- Next.js 14
- React 18
- Tailwind CSS 3.4
- Dark mode

---

## 📞 TROUBLESHOOTING

### Port in use?
```bash
kill -9 $(lsof -t -i:5000)
kill -9 $(lsof -t -i:3000)
```

### Dependencies issue?
```bash
rm -rf node_modules package-lock.json
npm install
```

### API not connecting?
Check `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 DEPLOYMENT

### Quick VPS Deploy
```bash
# 1. Upload to VPS
scp -r hesap-makinesi-online user@server:/var/www/

# 2. SSH to server
ssh user@server

# 3. Install & Start
cd /var/www/hesap-makinesi-online
./setup.sh
pm2 start backend/server.js
cd frontend && npm run build && pm2 start npm -- start

# 4. Configure Nginx (see DEPLOYMENT.md)
```

Full guide: `DEPLOYMENT.md`

---

## 📚 FILE LOCATIONS

### Example Calculator Pages
- `frontend/app/hesap-makinesi/page.js`
- `frontend/app/yuzde-hesaplama/page.js`

### Backend Logic
- `backend/controllers/calculatorController.js` (all 14)
- `backend/routes/calculatorRoutes.js` (all endpoints)

### Configuration
- `backend/.env` (backend config)
- `frontend/.env.local` (frontend config)

---

## 🎯 NEXT STEPS

1. ✅ Run the setup
2. ✅ Test both complete calculators
3. ✅ Copy pattern to create remaining pages
4. ✅ Customize as needed
5. ✅ Deploy to production

---

## 💡 PRO TIPS

1. **Use VS Code workspace**: `code hesap-makinesi.code-workspace`
2. **Test APIs first**: Use curl commands from `INSTALL_COMMANDS.md`
3. **Copy-paste pattern**: Both examples are production-ready
4. **Dark mode works**: Toggle in header
5. **SEO ready**: Just deploy and submit sitemap

---

**🎉 Everything is ready! Start with START_HERE.md**

**Total Time to Complete**: ~2-4 hours to finish all remaining calculator pages

**Questions?** Check the documentation files!
