# 🔑 Stripe Test Keys Nasıl Alınır?

## Adım Adım Rehber

### 1. Stripe Hesabı Oluştur

1. **https://stripe.com** adresine git
2. Sağ üst köşede **"Sign in"** butonuna tıkla
3. Yeni hesap oluştur (ücretsiz)
4. Email ve şifre gir
5. Şirket bilgilerini doldur

### 2. Test Mode'a Geç

1. Sağ üst köşede **"Test mode"** toggle'ını açık olduğundan emin ol
2. Bu modda hiç gerçek ödeme işlemeyeceksin

### 3. API Keys'leri Bul

**Yöntem 1: Hızlı Yol**
1. Dashboard'a giriş yaptığında sağ üst köşede **"API keys"** linkini görürsün
2. Tıkla

**Yöntem 2: Manual**
1. Sol menüden **"Developers"** → **"API keys"** seç
2. Burada key'lerini görürsün

### 4. Key'leri Kopyala

Göreceğin iki key var:

#### 1. **Publishable Key** (Public)
```
pk_test_51... (uzun string)
```
- Bu key client-side'da kullanılır
- `.env.local` dosyasına `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` olarak eklenecek
- **Güvenli**: Tarayıcıda görünebilir

#### 2. **Secret Key** (Private)
```
sk_test_51... (uzun string)
```
- Bu key sadece server-side'da kullanılır
- **Sakın kimseyle paylaşma!**
- `.env.local` dosyasına `STRIPE_SECRET_KEY` olarak eklenecek

### 5. Webhook Secret

**Webhook Secret Nasıl Alınır:**
1. **Developers** → **Webhooks** menüsüne git
2. **"Add endpoint"** butonuna tıkla
3. Endpoint URL: `http://localhost:3001/api/webhook`
4. **Send test webhook event** gönder
5. **Signing secret** kopyala (`whsec_...`)

### 6. .env.local Dosyasına Ekle

`memorie-digitala/.env.local` dosyasına ekle:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEf... (buraya yapıştır)
STRIPE_SECRET_KEY=sk_test_51AbCdEf... (buraya yapıştır)
STRIPE_WEBHOOK_SECRET=whsec_... (buraya yapıştır)
```

## ✅ Test Etmek İçin

### Test Kart Numaraları:

**Başarılı Ödeme:**
- Kart: `4242 4242 4242 4242`
- Tarih: Herhangi gelecek tarih
- CVC: Herhangi 3 haneli sayı

**Üç Boyutlu Doğrulama:**
- Kart: `4000 0025 0000 3155`
- Tarih: Herhangi gelecek tarih
- CVC: Herhangi 3 haneli sayı

**Geri Ödeme:**
- Kart: `4000 0000 0000 0002`
- Tarih: Herhangi gelecek tarih
- CVC: Herhangi 3 haneli sayı

## 🎯 Önemli Notlar

1. **Test Mode'da**: Gerçek para çekilmez
2. **Key'leri Git'e ekleme**: `.env.local` zaten `.gitignore`'da
3. **Her keyst mümkün**: Stripe dashboard'dan silebilir ve yeniden oluşturabilirsin
4. **Production**: Gerçek key'ler için **Live mode**'u kullan

## 🚀 Hazır!

Artık checkout akışını test edebilirsin!



