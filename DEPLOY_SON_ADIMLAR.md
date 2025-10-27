# 🚀 MemorieDigitala.ro - Son Adımlar

## ✅ Sahip Olduğunuz Bilgiler

### Neon Database
```
Connection String: postgresql://neondb_owner:npg_IjlxbeKT20Aq@ep-quiet-river-agzmlihl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Stripe (Live)
```
Publishable Key: pk_live_51SMbpa1U8doB97AocszafpY5F1RWIi8olnIfgxoVWUhS0df8mDCG1Z00YcteUcWaNeaCx9hrupvvoUYUED8HMUe600vWPgEKas
Secret Key: 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
```

---

## 🎯 ŞİMDİ YAPILACAKLAR

### ADIM 1: Database Schema (Kritik!)

1. Neon Console'a git:
   https://console.neon.tech

2. SQL Editor'ü aç

3. Bu SQL'i çalıştır:
   - `database/schema.sql` dosyasını aç
   - İçeriği kopyala
   - Neon SQL Editor'e yapıştır
   - "Run" butonuna tıkla

⚠️ **Bu adım olmadan site çalışmaz!**

---

### ADIM 2: Stripe Webhook Kurulumu

1. Stripe Dashboard'a git:
   https://dashboard.stripe.com

2. Developers → Webhooks

3. "Add endpoint" tıkla

4. Endpoint URL:
   ```
   https://memoriedigitala.ro/api/webhook
   ```

5. Events to listen for:
   - `checkout.session.completed`

6. "Add endpoint" tıkla

7. Webhook signing secret'i kopyala:
   - `whsec_...` ile başlayan string
   - Bu string'i `.env` dosyasına ekle

⚠️ **Webhook secret'i ENV_CPANEL.txt dosyasına ekle**

---

### ADIM 3: cPanel'e Dosya Yükleme

#### Yöntem 1: File Manager (Kolay)
1. cPanel'e login ol
2. File Manager'ı aç
3. `public_html` klasörüne git
4. Upload butonuna tıkla
5. Şu klasörleri yükle:
   - `.next/`
   - `app/`
   - `public/`
   - `node_modules/` (opsiyonel - server'de install daha iyi)
   - Diğer tüm dosyalar

#### Yöntem 2: FTP (Hızlı)
```bash
# FileZilla veya benzeri FTP client
Host: ftp.memoriedigitala.ro
Username: cpanel_username
Password: cpanel_password
```

---

### ADIM 4: cPanel Node.js App Kurulumu

1. cPanel'de "Node.js" sekmesine git

2. Yeni app oluştur:
   - **Application root**: `/home/username/public_html`
   - **Node.js version**: `20.x` (en son)
   - **Application URL**: `/` (veya boş bırak)
   - **Application startup file**: `server.js`

3. Environment Variables ekle:
   - "Environment Variables" kısmına git
   - `ENV_CPANEL.txt` dosyasındaki tüm variable'ları ekle

4. "Create" butonuna tıkla

---

### ADIM 5: Dependencies Install

cPanel Terminal veya SSH ile:

```bash
cd public_html
npm install
```

---

### ADIM 6: PM2 ile Process Management (Opsiyonel Ama Önerilen)

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

### ADIM 7: Apache Reverse Proxy (.htaccess)

`.htaccess` dosyası zaten oluşturuldu, kontrol et:
- File Manager'da `public_html/.htaccess` var mı?

Yoksa oluştur:
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

### ADIM 8: SSL Certificate

1. cPanel → SSL/TLS
2. Let's Encrypt
3. Domain'i seç
4. "Run AutoSSL" tıkla
5. Wait...

---

### ADIM 9: DNS Ayarları (Gerekirse)

Domain sağlayıcıdan:
```
A Record: @ → [server IP]
CNAME: www → memoriedigitala.ro
```

---

## 🧪 Test Et

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
    "storage": "not configured"
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

Stripe test kartı:
- Card: 4242 4242 4242 4242
- Date: 12/25
- CVC: 123

---

## 📊 Deployment Checklist

### Pre-Deploy
- [ ] Neon database schema çalıştırıldı
- [ ] Stripe webhook kuruldu
- [ ] Webhook secret kopyalandı
- [ ] ENV_CPANEL.txt hazır

### Deploy
- [ ] Dosyalar cPanel'e yüklendi
- [ ] Node.js app kuruldu
- [ ] Environment variables eklendi
- [ ] `npm install` çalıştırıldı
- [ ] PM2 başlatıldı (opsiyonel)
- [ ] SSL certificate aktif

### Post-Deploy
- [ ] Health check başarılı
- [ ] Ana sayfa açılıyor
- [ ] Sipariş formu çalışıyor
- [ ] Stripe test ödemesi yapıldı

---

## ⚠️ Troubleshooting

### "Database connection failed"
- Neon dashboard'da database aktif mi?
- Connection string doğru mu?
- Firewall settings kontrol et

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

### "SSL not working"
- Let's Encrypt certificate'ı yeniden oluştur
- DNS propagation bekle (24 saat)

---

## 🎉 TAMAMLANDI!

Site artık canlıda! 

**Live URL:** https://memoriedigitala.ro

Başarılar! 🚀

