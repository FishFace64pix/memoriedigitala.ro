# 🚀 MemorieDigitala - Setup Guide

## ✅ Şu Ana Kadar Tamamlananlar

1. ✅ Next.js projesi oluşturuldu
2. ✅ Tüm sayfalar tasarlandı (modern UI)
3. ✅ Stripe entegrasyonu hazırlandı
4. ✅ PostgreSQL schema oluşturuldu
5. ✅ API routes yazıldı
6. ✅ Site İngilizce'ye çevrildi
7. ✅ Modern UI/UX tasarımı tamamlandı

## ⚠️ Şimdi Yapılması Gerekenler

### Seçenek 1: Test için Mock Data (Hızlı)

Database olmadan test etmek için:
1. `.env` dosyası oluştur
2. Stripe test key'leri ekle
3. Frontend'i test et

### Seçenek 2: Tam Setup (Production-Ready)

1. PostgreSQL kurulumu
2. Database oluşturma
3. Stripe key'leri
4. AWS S3 (opsiyonel)

## 🎯 Önerilen: Hızlı Test Setup

### Adım 1: .env Dosyası Oluştur

```bash
cd memorie-digitala
```

`.env` dosyası oluştur:

```env
# Database (Test için şimdilik boş bırak)
DATABASE_URL=postgresql://test:test@localhost:5432/test

# Stripe Test Keys (Stripe Dashboard'dan al)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001

# JWT (Rastgele değer)
JWT_SECRET=test-secret-key-change-in-production
```

### Adım 2: Stripe Test Keys Al

1. https://stripe.com hesabı oluştur (ücretsiz)
2. Dashboard → Developers → API keys
3. Test mode'da key'leri kopyala
4. `.env` dosyasına yapıştır

### Adım 3: Frontend'i Test Et

Şu an database olmadan bile frontend'i test edebilirsin:
- Ana sayfa: http://localhost:3001
- Sipariş sayfası: http://localhost:3001/siparis
- Contact: http://localhost:3001/contact
- FAQ: http://localhost:3001/sss

Database olmadan checkout çalışmayacak ama UI'ı görebilirsin.

## 📦 Tam Setup (PostgreSQL ile)

### Adım 1: PostgreSQL Kur

```bash
# Windows (chocolatey ile)
choco install postgresql

# veya PostgreSQL'i resmi site'den indir
# https://www.postgresql.org/download/windows/
```

### Adım 2: Database Oluştur

```bash
# PostgreSQL'i başlat
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start

# Database oluştur
createdb memoriedigitala

# Schema import et
psql memoriedigitala < database/schema.sql
```

### Adım 3: .env Ayarla

DATABASE_URL'i düzelt:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/memoriedigitala
```

## 🎨 Şu An Durum

Site şu an **tamamen functional**:
- ✅ Modern UI (gradients, animations)
- ✅ İngilizce dil desteği
- ✅ Responsive design
- ✅ Tüm sayfalar hazır
- ⚠️ Database bağlantısı eksik (checkout için gerekli)

## 🚀 Hemen Test Et!

1. Tarayıcıda aç: http://localhost:3001
2. Tüm sayfaları gez
3. UI'ı kontrol et
4. İstediğin değişiklikleri yap

Database setup'ı sonra yapabiliriz!



