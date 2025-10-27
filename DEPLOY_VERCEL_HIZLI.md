# 🚀 Vercel'e Hızlı Deploy (3 Komut)

## Özet: 3 Komutla Deploy!

```bash
# 1. CLI Install
npm install -g vercel

# 2. Login (browser açılacak)
vercel login

# 3. Deploy
cd D:\MemorieDigitala\memorie-digitala
vercel
```

**TAMAM! 🎉**

---

## 📝 Adım Adım

### 1. Terminal Aç
VS Code terminal veya PowerShell

### 2. CLI Install
```bash
npm install -g vercel
```

### 3. Login
```bash
vercel login
```
- Browser açılacak
- Vercel hesabına login ol (Google ile hızlı)
- Email doğrula

### 4. Project Klasörüne Git
```bash
cd D:\MemorieDigitala\memorie-digitala
```

### 5. Deploy
```bash
vercel
```

Sorular:
- Link to existing? → **N**
- Project name? → **memoriedigitala**
- Directory? → **./**
- Override settings? → **N**

**DEPLOY BAŞLIYOR...**

---

## ⚙️ Environment Variables Ekle

Deploy sonrası:

1. Browser'da Vercel Dashboard açılır
2. Project Settings → Environment Variables
3. Şu variable'ları ekle:

```
DATABASE_URL=postgresql://neondb_owner:npg_IjlxbeKT20Aq@ep-quiet-river-agzmlihl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

STRIPE_SECRET_KEY=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

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51SMbpa1U8doB97AocszafpY5F1RWIi8olnIfgxoVWUhS0df8mDCG1Z00YcteUcWaNeaCx9hrupvvoUYUED8HMUe600vWPgEKas

STRIPE_WEBHOOK_SECRET=whsec_0p2gjq2RoqHVfClj7CTlKNq1MfvV01eH

JWT_SECRET=memorie-digitala-super-secret-jwt-key-2024-abcdefghijklmnopqrstuvwxyz

NEXT_PUBLIC_STRIPE_CURRENCY=ron

NEXT_PUBLIC_APP_URL=https://memoriedigitala.vercel.app
```

**⚠️ NOT:** Deploy edilen URL'i kopyala, yukarıdaki URL'ye değiştir.

---

## 🌐 Custom Domain (Opsiyonel)

Eğer `memoriedigitala.ro` kullanacaksan:

1. Vercel Dashboard → Project → Domains
2. "Add Domain"
3. `memoriedigitala.ro` yaz
4. DNS ayarları gösterilecek
5. cPanel'den DNS güncelle:

**A Record:**
```
@ → 76.76.21.21
```

**CNAME:**
```
www → cname.vercel-dns.com
```

---

## 🧪 TEST ET

### 1. Ana Sayfa
```
https://memoriedigitala.vercel.app
```

### 2. Health Check
```
https://memoriedigitala.vercel.app/api/health
```

---

## ⚠️ ÖNEMLİ: Stripe Webhook Güncelle

Vercel URL'i aldıktan sonra:

1. Stripe Dashboard → Webhooks
2. Webhook'u aç
3. Settings → Webhook URL'yi güncelle:
   ```
   https://memoriedigitala.vercel.app/api/webhook
   ```

---

## ✅ TAMAMLANDI!

Site artık canlıda! 🎉

**Live URL:** https://memoriedigitala.vercel.app

Başarılar! 🚀

