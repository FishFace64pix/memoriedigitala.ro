# 🚀 MemorieDigitala.ro - Setup Guide

## ✅ Proje Hazır!

Site çalışıyor: **http://localhost:3001**

## 🎯 Şimdi Yapılacaklar

### 1️⃣ Frontend Test (Şimdi Yapılabilir)
✅ Ana sayfa: http://localhost:3001
✅ Sipariş sayfası: http://localhost:3001/siparis
✅ Contact: http://localhost:3001/contact
✅ FAQ: http://localhost:3001/sss

### 2️⃣ Stripe Setup (Ödemeler için)

**A. Hesap Oluştur:**
1. https://stripe.com → Sign up (ücretsiz)
2. Test mode'da başla

**B. Test Key'leri Al:**
1. Dashboard → Developers → API keys
2. Test key'leri kopyala

**C. .env Dosyası Oluştur:**

`memorie-digitala` klasöründe `.env` dosyası oluştur:

```env
# Stripe Test Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database (Test için şimdilik boş)
DATABASE_URL=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3001
JWT_SECRET=test-secret-key-123
```

### 3️⃣ Database Setup (İsteğe Bağlı)

**A. PostgreSQL Kur:**
```bash
# Windows: https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt install postgresql
```

**B. Database Oluştur:**
```bash
createdb memoriedigitala
psql memoriedigitala < database/schema.sql
```

**C. .env'de Düzelt:**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/memoriedigitala
```

## 🎨 Customize Et

### Renkleri Değiştir:
`app/page.tsx` dosyasında:
- `blue-600` → İstediğin renk
- `purple-600` → İstediğin renk

### Logo Ekle:
`public/` klasörüne logo ekle
`app/layout.tsx`'te logo URL'ini değiştir

### Metinleri Değiştir:
Tüm metinler `app/page.tsx` ve diğer sayfalarda

## 📦 Deploy Et

### Vercel (Önerilen):
1. GitHub'a push et
2. vercel.com'a bağla
3. Environment variables ekle
4. Deploy!

Alternatif: Netlify, Railway, Render

## ✅ Checklist

- [x] Frontend tamamlandı
- [x] Modern UI tasarımı
- [x] İngilizce dil
- [x] Stripe entegrasyonu (kod hazır)
- [ ] Stripe test key'leri ekle
- [ ] PostgreSQL kur (opsiyonel)
- [ ] .env dosyası oluştur
- [ ] Deploy et

## 🎉 Hazır!

Şu an site %90 ready. Sadece:
1. Stripe key'leri ekle (.env dosyası)
2. İstersen PostgreSQL kur
3. Deploy et!



