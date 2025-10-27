# 🔧 Database Hatası Düzeltme

## ❌ Hata
```
ERROR: relation "users" already exists (SQLSTATE 42P07)
```

## 🎯 Çözüm

Tablolar zaten var, bu yüzden iki seçenek var:

### ✅ Seçenek 1: Sadece Eksik Tabloları Ekle (Önerilen)

Eğer tablolar varsa ama eksik tablolar varsa, sadece şunu çalıştır:

```sql
-- Sadece eksik tabloları kontrol et ve ekle

-- Eğer media_uploads yoksa ekle
CREATE TABLE IF NOT EXISTS media_uploads (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(255) NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
    upload_type VARCHAR(50) NOT NULL,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT true,
    guest_ip VARCHAR(45)
);

-- İndeksler ekle (eğer yoksa)
CREATE INDEX IF NOT EXISTS idx_media_event_id ON media_uploads(event_id);
CREATE INDEX IF NOT EXISTS idx_media_uploaded_at ON media_uploads(uploaded_at);
```

---

### ⚠️ Seçenek 2: Tüm Tabloları Sil ve Yeniden Oluştur

⚠️ **DİKKAT**: Bu tüm verileri silecek!

`database/DROP_AND_CREATE.sql` dosyasını çalıştır.

---

## 📊 Mevcut Tabloları Kontrol Et

Neon SQL Editor'de şunu çalıştır:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

Sonuç:
- `users` ✅
- `events` ✅
- `orders` ✅
- `media_uploads` ?
- `qr_templates` ?

---

## 🎯 Önerilen Adım

1. **İlk önce kontrol et:**
   ```sql
   SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
   ```

2. **Eksik tabloları ekle:**
   - Sadece eksik olanları CREATE IF NOT EXISTS ile ekle

3. **İndeksler ekle:**
   - CREATE INDEX IF NOT EXISTS ile

---

## ✅ Eğer Hepsi Varsa

Eğer 5 tablo da varsa (users, events, orders, media_uploads, qr_templates), database hazır!

**Sadece cPanel deploy'a geç:** → ADIM 2: Stripe Webhook

