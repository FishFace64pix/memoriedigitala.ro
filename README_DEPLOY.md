# 🚀 MemorieDigitala.ro - Hızlı Deploy Rehberi

## ✅ HAZIRLIKLAR TAMAM!

### Sahip olduğunuz:
- ✅ Neon Database connection string
- ✅ Stripe Live API keys
- ✅ cPanel hosting
- ✅ Domain (memoriedigitala.ro)
- ✅ Build edilmiş proje

---

## 🎯 3 ADIMLA DEPLOY!

### ADIM 1: Database Schema (5 dakika)

1. **Neon Console'a git:**
   https://console.neon.tech

2. **SQL Editor** aç

3. **database/schema.sql** dosyasını aç ve içeriği kopyala

4. **Neon SQL Editor'e yapıştır ve "Run" tıkla**

✅ 5 tablo oluşturulmalı (users, events, orders, media_uploads, qr_templates)

---

### ADIM 2: Stripe Webhook (5 dakika)

1. **Stripe Dashboard:**
   https://dashboard.stripe.com → Developers → Webhooks

2. **"Add endpoint" tıkla**

3. **Endpoint URL:**
   ```
   https://memoriedigitala.ro/api/webhook
   ```

4. **Events:**
   - `checkout.session.completed` seç

5. **"Add endpoint" tıkla**

6. **Webhook Secret kopyala** (whsec_... ile başlayan)

7. **ENV_CPANEL.txt dosyasını aç**
   - `STRIPE_WEBHOOK_SECRET=` satırını bul
   - İçine webhook secret'i yapıştır

---

### ADIM 3: cPanel Deploy (15 dakika)

#### 3.1. Dosyaları Yükle
- cPanel → File Manager
- `public_html` klasörüne git
- Tüm dosyaları upload et (.next, app, public, vb.)

#### 3.2. Node.js App Oluştur
- cPanel → Node.js sekmesi
- Yeni app oluştur:
  - **Root**: `/home/username/public_html`
  - **Node version**: 20.x
  - **Startup file**: `server.js`

#### 3.3. Environment Variables Ekle
- `ENV_CPANEL.txt` dosyasını aç
- Her satırı kopyala-yapıştır
- **Webhook secret'i ekle!**

#### 3.4. Dependencies Install
- Terminal veya SSH:
```bash
cd public_html
npm install
```

#### 3.5. SSL Certificate
- cPanel → SSL/TLS → Let's Encrypt
- "Run AutoSSL" tıkla

---

## 🧪 TEST ET

### 1. Health Check
```bash
https://memoriedigitala.ro/api/health
```

Cevap:
```json
{
  "status": "healthy",
  "services": {
    "database": "connected"
  }
}
```

### 2. Ana Sayfa
```
https://memoriedigitala.ro
```

### 3. Test Sipariş
```
https://memoriedigitala.ro/siparis
```

Test Card:
- **4242 4242 4242 4242**
- **12/25**
- **123**

---

## 📁 GEREKLİ DOSYALAR

Deploy için hazır dosyalar:

1. ✅ `server.js` - Node.js server script
2. ✅ `.htaccess` - Apache reverse proxy
3. ✅ `ecosystem.config.js` - PM2 config
4. ✅ `ENV_CPANEL.txt` - Environment variables
5. ✅ `DEPLOY_SON_ADIMLAR.md` - Detaylı rehber
6. ✅ `.next/` - Build edilmiş output

---

## ⚡ HIZLI KOMUT SET

```bash
# 1. Terminal'den bağlan
ssh username@memoriedigitala.ro

# 2. Project klasörüne git
cd public_html

# 3. Dependencies install
npm install

# 4. PM2 ile start (opsiyonel)
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save

# 5. Logs kontrol
pm2 logs memoriedigitala
```

---

## 🔧 SORUN ÇÖZME

### "Database connection failed"
```bash
# Connection string kontrol et
# Neon dashboard'da database aktif mi?
```

### "Module not found"
```bash
cd public_html
npm install
```

### "Port already in use"
```bash
pm2 delete all
pm2 start ecosystem.config.js
```

---

## 📊 CHECKLIST

### Pre-Deploy
- [x] Database connection string
- [x] Stripe keys
- [x] Build completed
- [ ] Database schema çalıştırıldı
- [ ] Stripe webhook kuruldu
- [ ] Webhook secret alındı

### Deploy
- [ ] Dosyalar yüklendi
- [ ] Node.js app kuruldu
- [ ] Environment variables eklendi
- [ ] npm install çalıştırıldı
- [ ] SSL aktif

### Post-Deploy
- [ ] Health check ok
- [ ] Ana sayfa açılıyor
- [ ] Test sipariş yapıldı

---

## 🎉 BAŞARILAR!

Site canlıda! 🚀

**Live URL:** https://memoriedigitala.ro

Herhangi bir sorun yaşarsan:
1. Health check yap: `/api/health`
2. cPanel logs kontrol et
3. Node.js app log'ları bak

**GO LIVE! 🌟**

