# 🎯 Stripe Webhook Kurulumu - Adım Adım

## 📸 Şu An Neredesin?

"Create an event destination" sayfasındasın.

---

## 🎯 YAPILACAKLAR

### 1. Events From (Üst Kısım)
- ✅ **"Your account"** seçili (mor border'la) - DOĞRU!
- "Connected and v2 accounts" seçili değil - Bu doğru

### 2. API Version (Dropdown)
- ✅ **"2025-09-30.clover"** (veya son versiyon) - DOĞRU!
- Hiçbir şey yapma, öyle kalsın

### 3. Events Seçimi (ÖNEMLİ!)
İki yolu var:

#### ✅ Yol 1: Sadece "checkout.session.completed" Seç (ÖNERİLEN)

1. **"Selected events 0" tab'ına tıkla** (üstte)
2. **Search bar'a yaz:**
   ```
   checkout.session.completed
   ```
3. **Bulunan event'i seç** (checkbox'ı işaretle)

#### ⚠️ Yol 2: Tüm Events (Gereksiz ama çalışır)

1. **"Select all" checkbox'ı işaretle**
2. Tüm event'leri seçer

---

### 4. Continue
"Continue →" (sağ alttaki mor buton) tıkla

---

## 📋 SONRAKI ADIMLAR

"Continue" sonrası 2 ekran daha var:

### Adım 2: Choose Destination Type
1. **"Webhook" seç**
2. "Continue"

### Adım 3: Configure Your Destination
1. **Webhook URL:**
   ```
   https://memoriedigitala.ro/api/webhook
   ```
   
2. **Description (opsiyonel):**
   ```
   MemorieDigitala.ro Production Webhook
   ```

3. **"Create destination"** tıkla

---

## 🔑 WEBHOOK SECRET AL

Webhook oluşturulduktan sonra:
1. Webhook detail sayfasına git
2. "Signing secret" bölümünü bul
3. "Reveal" butonuna tıkla
4. `whsec_...` ile başlayan string'i kopyala
5. **ENV_CPANEL.txt dosyasına ekle:**
   ```
   STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXX
   ```

---

## ✅ ÖZET - ŞU AN NE YAPACAKSIN?

1. **"Selected events" tab'ına tıkla**
2. **Search bar'a:** `checkout` yaz
3. **Bulunan "checkout.session.completed" seç**
4. **"Continue →" butonuna tıkla**
5. **Sonraki ekranda "Webhook" seç**
6. **URL: `https://memoriedigitala.ro/api/webhook` yaz**
7. **"Create destination" tıkla**
8. **Signing secret'i kopyala**

---

## ⚠️ DİKKAT!

- Domain henüz deploy edilmemiş, ama webhook oluşturabilirsin
- İlk test'te webhook çalışmaz, deployment sonrası test et
- Her adımda "Continue" butonuna tıkla

**DEVAM ET! 🚀**

