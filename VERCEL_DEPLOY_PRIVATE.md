# ✅ Vercel Deploy (Private Repo İçin)

## 🤔 GitHub Public Olmak Zorunda Değil!

İki yöntem var:

---

## 🎯 YÖNTEM 1: Vercel CLI (GitHub Public/Private Her İkisi de Çalışır)

### Adım 1: Vercel CLI Install
```bash
# Terminal'de
npm install -g vercel
```

### Adım 2: Login
```bash
vercel login
```
- Browser'da Vercel hesabına login ol

### Adım 3: Deploy
```bash
cd D:\MemorieDigitala\memorie-digitala
vercel
```

Önerilen ayarlar:
- **Set up and deploy?** → Y
- **Which scope?** → Vercel hesabını seç
- **Link to existing project?** → N (yeni proje)
- **Project name?** → memoriedigitala (veya istediğin isim)
- **Directory?** → ./

---

## 🎯 YÖNTEM 2: Private GitHub Repo

GitHub private repo da kullanabilirsin!

1. **GitHub'da private repo oluştur**
2. **Vercel'e bağla** (GitHub otorizasyon ile)
3. **Private repo seçilebilir** ✅

---

## 🎯 YÖNTEM 3: Manuel Dosya Upload (EN KOLAY!)

GitHub hiç kullanmadan:

### 1. Vercel Dashboard'a git
https://vercel.com/dashboard

### 2. "Add New..." → "Project"

### 3. "Import Git Repository" yerine
**"Deploy without Git"** veya **"Upload"** seç

⚠️ Not: Eğer bu seçenek görünmüyorsa, CLI kullan (Yöntem 1)

---

## 🎯 EN KOLAY: Vercel CLI

```bash
# 1. CLI install
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd D:\MemorieDigitala\memorie-digitala
vercel

# 4. Environment variables ekle (dashboard'dan)
# 5. Done! 🎉
```

---

## ⚙️ Environment Variables (Vercel Dashboard'dan)

Deploy sonrası:
1. Vercel Dashboard → Project
2. Settings → Environment Variables
3. Eklemelar:

```
DATABASE_URL=postgresql://neondb_owner:npg_IjlxbeKT20Aq@ep-quiet-river-agzmlihl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

STRIPE_SECRET_KEY=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

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51SMbpa1U8doB97AocszafpY5F1RWIi8olnIfgxoVWUhS0df8mDCG1Z00YcteUcWaNeaCx9hrupvvoUYUED8HMUe600vWPgEKas

STRIPE_WEBHOOK_SECRET=whsec_0p2gjq2RoqHVfClj7CTlKNq1MfvV01eH

JWT_SECRET=memorie-digitala-super-secret-jwt-key-2024-abcdefghijklmnopqrstuvwxyz

NEXT_PUBLIC_STRIPE_CURRENCY=ron

NEXT_PUBLIC_APP_URL=https://memoriedigitala.vercel.app
```

---

## 🚀 HIZLI KOMUTLAR

```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd D:\MemorieDigitala\memorie-digitala
vercel

# Production deploy
vercel --prod
```

---

## ✅ SONUÇ

**GitHub Public olmak zorunda DEĞİL!**

- ✅ Private repo kullanabilirsin
- ✅ Ya da CLI ile direkt deploy et
- ✅ GitHub hiç kullanmayabilirsin

**EN KOLAY:** Vercel CLI kullan! 3 komutla deploy ediliyor! 🚀

