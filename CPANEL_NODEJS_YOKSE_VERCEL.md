# ✅ cPanel'de Node.js Yoksa - Vercel Kullan!

## 🎯 Durum
cPanel'de Node.js yok, ama API routes gerekli.

## ✅ EN İYİ ÇÖZÜM: Vercel'e Deploy

Vercel Next.js'i yerli olarak destekler ve ücretsizdir.

---

## 🚀 Vercel Deploy (10 Dakika)

### Adım 1: Vercel Hesabı Oluştur
1. https://vercel.com adresine git
2. "Sign Up" tıkla
3. GitHub ile login (veya email)

### Adım 2: Projeyi Bağla

#### Yöntem 1: GitHub ile (Kolay)
1. GitHub'da repository oluştur:
   - `memorie-digitala` adında public repo
2. Projenizi push edin:
```bash
cd D:\MemorieDigitala\memorie-digitala
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/memorie-digitala.git
git push -u origin main
```
3. Vercel'de:
   - "Import Project"
   - GitHub repo'yu seç
   - "Import"

#### Yöntem 2: Vercel CLI ile
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd D:\MemorieDigitala\memorie-digitala
vercel
```

---

### Adım 3: Environment Variables Ayarla

Vercel Dashboard'da:
1. Project Settings → Environment Variables
2. Şu variable'ları ekle:

```
DATABASE_URL=postgresql://neondb_owner:npg_IjlxbeKT20Aq@ep-quiet-river-agzmlihl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

STRIPE_SECRET_KEY=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

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51SMbpa1U8doB97AocszafpY5F1RWIi8olnIfgxoVWUhS0df8mDCG1Z00YcteUcWaNeaCx9hrupvvoUYUED8HMUe600vWPgEKas

STRIPE_WEBHOOK_SECRET=whsec_0p2gjq2RoqHVfClj7CTlKNq1MfvV01eH

JWT_SECRET=memorie-digitala-super-secret-jwt-key-2024-abcdefghijklmnopqrstuvwxyz

NEXT_PUBLIC_STRIPE_CURRENCY=ron

NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**⚠️ ÖNEMLİ:** Domain değiştirilecek!

---

### Adım 4: Domain'i Değiştir

Stripe Webhook'u güncelle:
1. Stripe Dashboard → Webhooks
2. Webhook'u aç
3. "Settings"
4. Webhook URL'yi değiştir:
   ```
   https://your-domain.vercel.app/api/webhook
   ```

---

### Adım 5: Custom Domain (Opsiyonel)

Eğer `memoriedigitala.ro` kullanmak istersen:

1. Vercel Dashboard → Domains
2. "Add Domain"
3. `memoriedigitala.ro` yaz
4. DNS ayarları verilecek
5. cPanel DNS'de ayarla

---

## ✅ Avantajlar

- ✅ 100% Next.js desteği
- ✅ API routes çalışır
- ✅ Server-side rendering
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Ücretsiz plan yeterli
- ✅ Otomatik deployments

---

## 📊 Vercel vs cPanel

| Özellik | Vercel | cPanel |
|---------|--------|---------|
| Next.js | ✅ | ❌ |
| API Routes | ✅ | ❌ |
| Node.js | ✅ | ❌ |
| SSL | ✅ Otomatik | ⚠️ Manuel |
| CDN | ✅ Global | ❌ |
| Ücretsiz | ✅ | ❌ |
| Deploy | ✅ 1 dakika | ⚠️ 30 dakika |

---

## 🎯 ÖNERİ

**Vercel kullan!**

Neden?
- ✅ Next.js için özel
- ✅ Daha kolay
- ✅ Daha hızlı
- ✅ Daha güvenilir
- ✅ Ücretsiz

cPanel'i sadece backup olarak kullan.

---

## 🚀 SONRAKI ADIM

1. Vercel hesabı oluştur
2. GitHub repo'ya push et
3. Vercel'de import et
4. Environment variables ekle
5. Deploy!

---

**Detaylar için:** https://vercel.com/docs

