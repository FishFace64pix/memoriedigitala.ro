# 🪟 Windows Terminal Komutları

## ⚠️ PowerShell'de komut çalışmıyor mu?

---

## 🎯 YÖNTEM 1: VS Code Terminal

### Adım 1: VS Code'u Aç
```
D:\MemorieDigitala\memorie-digitala
```

### Adım 2: Terminal Aç
- `Ctrl + `` (backtick) 
- Veya: View → Terminal

### Adım 3: Komutları Çalıştır

```powershell
# 1. Node.js kontrol
node --version

# 2. Vercel CLI install
npm install -g vercel

# 3. Login
vercel login

# 4. Deploy
vercel
```

---

## 🎯 YÖNTEM 2: CMD (Command Prompt)

### Adım 1: Başlat → CMD

### Adım 2: Klasörü Aç

```cmd
cd D:\MemorieDigitala\memorie-digitala

# Node.js kontrol
node --version

# Vercel install
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

---

## 🎯 YÖNTEM 3: Windows PowerShell (Yönetici Olarak)

### Adım 1: PowerShell'i Yönetici Olarak Aç
- Başlat → PowerShell → Sağ tık → "Run as Administrator"

### Adım 2: Execution Policy
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Adım 3: Komutları Çalıştır
```powershell
cd D:\MemorieDigitala\memorie-digitala
node --version
npm install -g vercel
vercel login
vercel
```

---

## 🎯 YÖNTEM 4: Git Bash (Eğer Git kuruluysa)

1. Sağ tık (memorie-digitala klasöründe)
2. "Git Bash Here"
3. Komutları çalıştır:

```bash
node --version
npm install -g vercel
vercel login
vercel
```

---

## 🎯 YÖNTEM 5: Manuel Deployment (EN KOLAY!)

Komut çalışmıyorsa, Vercel Dashboard'dan yükle:

### 1. ZIP Oluştur
```
D:\MemorieDigitala\memorie-digitala klasörüne git
Sağ tık → Send to → Compressed (zipped) folder
memorie-digitala.zip oluştur
```

### 2. Vercel Dashboard'a Git
https://vercel.com/dashboard

### 3. "Add New..." → "Project"

### 4. "Import" veya "Upload" bul
- ZIP dosyasını upload et

⚠️ **Not:** Bu yöntem build edilmiş versiyon için.

---

## 🔧 Troubleshooting

### "npm not recognized"
Node.js kurulu değil!
- https://nodejs.org adresine git
- LTS versiyonunu indir ve kur

### "vercel: command not found"
CLI kurulu değil:
```bash
npm install -g vercel
```

### Permission denied
Yönetici olarak çalıştır:
- PowerShell sağ tık → "Run as Administrator"

---

## ✅ HANGİ TERMİNAL KULLANMALISIN?

Sırayla dene:
1. ✅ VS Code Terminal (en kolay)
2. ✅ Git Bash (eğer varsa)
3. ✅ CMD (Command Prompt)
4. ✅ PowerShell Yönetici
5. ✅ Manuel ZIP upload

---

**Hangi terminali kullanıyorsun? Detay ver!** 🤔

