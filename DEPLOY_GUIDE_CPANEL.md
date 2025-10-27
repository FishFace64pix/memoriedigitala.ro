# 🚀 MemorieDigitala.ro - cPanel Deploy Guide

## 📋 Gerekenler

### 1. Domain & Hosting
- ✅ Domain adresi (örn: memoriedigitala.ro)
- ✅ cPanel erişimi
- ✅ FTP/SSH erişimi
- ✅ Node.js versiyonu kontrolü

### 2. Database
- ✅ PostgreSQL database (Neon veya başka)
- ✅ Connection string
- ✅ Database credentials

### 3. Stripe
- ✅ Live API keys
- ✅ Production webhook secret
- ✅ Webhook URL

### 4. AWS S3 (Opsiyonel)
- ✅ S3 bucket
- ✅ Access keys

---

## 🎯 Adım Adım Deploy

### ADIM 1: Database Hazırlığı

#### Neon PostgreSQL Setup
1. https://console.neon.tech adresine git
2. Login ol
3. Existing project'i seç veya yeni oluştur
4. **Database schema'yı çalıştır**
   - SQL Editor'e git
   - `database/schema.sql` dosyasını aç
   - İçeriği kopyala-yapıştır
   - "Run" butonuna tıkla

#### Connection String
```
postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/memorie-digitala?sslmode=require
```

**⚠️ NOT**: Bu connection string'i `.env` dosyasına ekle.

---

### ADIM 2: Environment Variables

#### `.env.local` Dosyası Oluştur
```bash
# Database
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/memorie-digitala?sslmode=require

# Stripe (LIVE KEYS!)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_CURRENCY=ron

# JWT
JWT_SECRET=super-secret-random-key-min-32-chars-12345

# AWS S3 (Opsiyonel)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=eu-central-1
AWS_S3_BUCKET_NAME=memorie-digitala-media

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@memoriedigitala.ro

# App URL (DOMAINI BURAYA YAZ!)
NEXT_PUBLIC_APP_URL=https://memoriedigitala.ro
```

---

### ADIM 3: Stripe Webhook Kurulumu

1. **Stripe Dashboard'a git**
   - https://dashboard.stripe.com
   - Developers → Webhooks

2. **Webhook ekle**
   - Endpoint URL: `https://memoriedigitala.ro/api/webhook`
   - Events to send: `checkout.session.completed`

3. **Webhook secret'i al**
   - Webhook'a tıkla
   - "Signing secret" kopyala
   - `.env` dosyasına ekle

---

### ADIM 4: Build & Export

#### Yerel Olarak Build Et
```bash
cd memorie-digitala
npm install
npm run build
```

#### .next Klasörünü Kontrol Et
```bash
ls -la .next/
```

✅ `.next` klasörü oluşturuldu mu?

---

### ADIM 5: cPanel'e Upload

#### File Manager ile Upload
1. cPanel'e login ol
2. **File Manager**'ı aç
3. **public_html** veya domain klasörünü aç
4. Tüm dosyaları yükle:
   - `.next` klasörü
   - `app` klasörü
   - `public` klasörü
   - `node_modules` klasörü (opsiyonel - daha iyi: server'de install)
   - `package.json`
   - `next.config.ts`
   - `tsconfig.json`
   - `tailwind.config.js` (varsa)
   - `.env` dosyası (Kritik! Herkese açık yapma!)

#### SSH ile Upload (Tercih Edilen)
```bash
# Terminal'den
cd memorie-digitala
tar -czf deploy.tar.gz .next/ app/ public/ package.json next.config.ts tsconfig.json

# SCP ile upload
scp deploy.tar.gz username@memoriedigitala.ro:/home/username/public_html/

# SSH ile bağlan
ssh username@memoriedigitala.ro
cd public_html
tar -xzf deploy.tar.gz
```

---

### ADIM 6: Node.js Setup (cPanel)

#### Node.js Version Seç
1. cPanel → **Node.js** sekmesi
2. Application root: `/home/username/public_html`
3. Node.js version: `20.x` seç
4. Application URL: `/` veya boş bırak
5. Application startup file: `server.js` (oluşturacağız)

---

### ADIM 7: Server.js Dosyası Oluştur

cPanel File Manager'da `server.js` oluştur:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

---

### ADIM 8: Environment Variables (cPanel)

#### Node.js Environment Variables Ayarla
cPanel → Node.js → Environment Variables

```bash
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
JWT_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_APP_URL=https://memoriedigitala.ro
# ... diğer tüm env vars
```

---

### ADIM 9: Node.js Dependencies Install

cPanel'de Terminal aç veya SSH ile:

```bash
cd public_html
npm install --production
```

---

### ADIM 10: PM2 Setup (Opsiyonel Ama Önerilen)

#### PM2 ile Process Management
```bash
npm install -g pm2
pm2 start server.js --name memoriedigitala
pm2 save
pm2 startup
```

---

### ADIM 11: Reverse Proxy (Apache/Nginx)

#### .htaccess Dosyası Oluştur
File Manager'da `.htaccess` oluştur:

```apache
RewriteEngine On
RewriteBase /

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Reverse Proxy to Node.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

### ADIM 12: DNS Ayarları

#### A Record
```
Name: @ (veya blank)
Type: A
Value: [server IP]
TTL: 14400
```

#### CNAME (www subdomain)
```
Name: www
Type: CNAME
Value: memoriedigitala.ro
TTL: 14400
```

---

### ADIM 13: SSL Certificate (Let's Encrypt)

cPanel → SSL/TLS → Let's Encrypt:
1. Domain'i seç
2. "Run AutoSSL" tıkla
3. Wait for completion

✅ HTTPS aktif olmalı!

---

### ADIM 14: Test Edelim

#### 1. Database Connection Test
```bash
curl https://memoriedigitala.ro/api/health
```

**Beklenen Response:**
```json
{
  "status": "healthy",
  "services": {
    "database": "connected",
    "storage": "configured"
  }
}
```

#### 2. Stripe Webhook Test
1. Stripe Dashboard → Webhooks
2. Test gönder
3. Webhook log'ları kontrol et

#### 3. Ana Sayfa Test
https://memoriedigitala.ro

---

## 🔧 Troubleshooting

### Problem: "Module not found"
**Çözüm:**
```bash
cd public_html
npm install
```

### Problem: "Database connection failed"
**Çözüm:**
- `.env` dosyasını kontrol et
- Neon dashboard'da connection string'i kontrol et
- Firewall ayarlarını kontrol et

### Problem: "Port already in use"
**Çözüm:**
```bash
pm2 delete all
pm2 start server.js --name memoriedigitala
```

### Problem: "SSL not working"
**Çözüm:**
1. cPanel → SSL/TLS
2. AutoSSL'i tekrar çalıştır
3. DNS propagation wait (24 saat)

---

## 📊 Deploy Checklist

### Pre-Deploy
- [ ] Database schema çalıştırıldı
- [ ] Stripe live keys hazır
- [ ] Stripe webhook kuruldu
- [ ] Environment variables hazır
- [ ] `.env` dosyası oluşturuldu

### Deploy
- [ ] `npm run build` başarılı
- [ ] Dosyalar cPanel'e yüklendi
- [ ] Node.js app kuruldu
- [ ] Environment variables ayarlandı
- [ ] `npm install` çalıştırıldı
- [ ] Server.js oluşturuldu
- [ ] PM2/process manager kuruldu

### Post-Deploy
- [ ] HTTPS çalışıyor
- [ ] Domain DNS ayarlandı
- [ ] Health check başarılı
- [ ] Ana sayfa yükleniyor
- [ ] Stripe webhook test edildi

---

## 🎯 Son Adımlar

### 1. Google Analytics (Opsiyonel)
```tsx
// app/layout.tsx'e ekle
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXX"></script>
```

### 2. Google Search Console
- https://search.google.com/search-console
- Domain ekle
- SSL/HTTPS doğrula

### 3. Monitor Setup
- UptimeRobot
- Error tracking (Sentry)

---

## ✅ Deploy Tamamlandı!

**Live URL:** https://memoriedigitala.ro

### Test Et
1. ✅ Ana sayfa açılıyor mu?
2. ✅ Sipariş formu çalışıyor mu?
3. ✅ Stripe checkout açılıyor mu?
4. ✅ Admin panel çalışıyor mu?
5. ✅ Upload çalışıyor mu?

---

## 📞 Destek

Sorun yaşarsan:
- cPanel logs kontrol et
- Node.js logs kontrol et
- Database connection test et
- Stripe webhook test et

**BAŞARILAR! 🎉**

