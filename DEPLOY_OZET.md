# 🚀 MemorieDigitala.ro - Deploy Özeti

## ✅ Build Başarılı!

Proje başarıyla build edildi. Şimdi deploy edebilirsiniz.

---

## 📦 Deploy Dosyaları

### Yüklenecek Dosyalar:
1. ✅ `.next/` - Build output (Kritik!)
2. ✅ `app/` - Application code
3. ✅ `public/` - Static files
4. ✅ `node_modules/` - Dependencies
5. ✅ `package.json` - Dependencies list
6. ✅ `next.config.ts` - Next.js config
7. ✅ `tsconfig.json` - TypeScript config
8. ✅ `server.js` - Server script (YENİ!)
9. ✅ `.htaccess` - Apache config (YENİ!)
10. ✅ `ecosystem.config.js` - PM2 config (YENİ!)

---

## 🎯 Deploy Adımları (Özet)

### 1. Database Setup
```bash
✅ Neon PostgreSQL'e bağlan
✅ Schema SQL'i çalıştır (database/schema.sql)
✅ Connection string'i kopyala
```

### 2. Environment Variables
```bash
# cPanel'de Node.js App oluştur
# Environment Variables ekle:

DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
JWT_SECRET=...
NEXT_PUBLIC_APP_URL=https://memoriedigitala.ro
```

### 3. Build & Upload
```bash
# Lokal'de build (Tamamlandı ✅)
npm run build

# Dosyaları cPanel'e yükle
# File Manager veya FTP ile upload
```

### 4. Server.js & Node.js Setup
```bash
# cPanel → Node.js
# Application root ayarla
# Node.js version: 20.x
# Environment variables ekle
# Create App
```

### 5. PM2 Start (Opsiyonel)
```bash
cd public_html
pm2 start ecosystem.config.js
pm2 save
```

### 6. HTTPS & SSL
```bash
# cPanel → SSL/TLS
# Let's Encrypt certificate
# AutoSSL çalıştır
```

---

## 🔗 Gerekli URL'ler

### 1. Neon PostgreSQL
```
URL: https://console.neon.tech
Connection String: postgresql://username:password@ep-xxx.neon.tech/db?sslmode=require
```

### 2. Stripe Dashboard
```
URL: https://dashboard.stripe.com
API Keys: Developers → API keys
Webhooks: Developers → Webhooks
```

### 3. AWS S3 (Opsiyonel)
```
Bucket: memoriedigitala-media
Region: eu-central-1
```

---

## 📝 Adım Adım (Detaylı)

Detaylı deploy guide için:
👉 **DEPLOY_GUIDE_CPANEL.md** dosyasını oku

---

## ⚠️ ÖNEMLİ

### 1. Database Schema
```sql
-- Şu SQL'i Neon'da çalıştır:
database/schema.sql içeriği
```

### 2. Stripe Webhook
```
Webhook URL: https://memoriedigitala.ro/api/webhook
Events: checkout.session.completed
Secret: whsec_... (cPanel'e ekle)
```

### 3. Environment Variables
- ❌ `.env` dosyasını public'e yükleme!
- ✅ cPanel Node.js environment'a ekle

---

## 🎯 Test Edilecekler

### 1. Health Check
```bash
curl https://memoriedigitala.ro/api/health
```

Beklenen:
```json
{
  "status": "healthy",
  "services": {
    "database": "connected",
    "storage": "configured"
  }
}
```

### 2. Ana Sayfa
```
https://memoriedigitala.ro
```

### 3. Test Order
```
https://memoriedigitala.ro/siparis
```

### 4. Stripe Test
```
- Test card: 4242 4242 4242 4242
- Date: 12/25
- CVC: 123
```

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
pm2 delete all
pm2 start ecosystem.config.js
```

### Module Not Found
```bash
cd public_html
npm install
```

### Database Connection Failed
- Connection string kontrol
- Neon database aktif mi?
- Firewall ayarları

---

## ✅ Deploy Checklist

### Pre-Deploy
- [x] Build başarılı
- [ ] Database schema çalıştırıldı
- [ ] Stripe keys hazır
- [ ] Stripe webhook kuruldu
- [ ] Domain DNS ayarlandı

### Deploy
- [ ] Dosyalar yüklendi
- [ ] Node.js app kuruldu
- [ ] Environment variables eklendi
- [ ] PM2 start edildi
- [ ] SSL certificate aktif

### Post-Deploy
- [ ] Health check başarılı
- [ ] Ana sayfa yükleniyor
- [ ] Sipariş formu çalışıyor
- [ ] Stripe checkout çalışıyor

---

## 📞 Destek

Sorun yaşarsan:
- cPanel logs kontrol et
- Node.js logs kontrol et
- Database connection test et

**BAŞARILAR! 🎉**

