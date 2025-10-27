# Quick Start Guide - MemorieDigitala.ro

Acest ghid te ajută să pornești proiectul într-un timp minim.

## 🚀 Start Rapid (5 minute)

### 1. Clonează și Instalează

```bash
cd memorie-digitala
npm install
```

### 2. Setup Minimal (.env)

Creează un fișier `.env` cu configurația minimă:

```env
# Database (folosește un PostgreSQL local sau cloud)
DATABASE_URL=postgresql://user:password@localhost:5432/memoriedigitala

# Stripe (temporar, test keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_CURRENCY=ron
STRIPE_WEBHOOK_SECRET=whsec_...

# JWT
JWT_SECRET=temporary-jwt-secret-key-change-me

# App URL (pentru test local)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (opțional pentru test)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@memoriedigitala.ro

# Storage (poți să ignori pentru teste locale)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=eu-central-1
AWS_S3_BUCKET_NAME=
```

**Pentru test rapid, poți omite:** Email, S3 Storage

### 3. Creează Baza de Date

```bash
# Crează baza de date
createdb memoriedigitala

# Importă schema
psql memoriedigitala < database/schema.sql
```

**Sau folosește o instanță cloud:**
- [Supabase](https://supabase.com) - gratuit până la 500MB
- [Neon](https://neon.tech) - gratuit până la 1GB
- [Railway](https://railway.app) - plan gratuit

### 4. Rulează Aplicația

```bash
npm run dev
```

Deschide browserul la: http://localhost:3000

## 📋 Testare Funcționalități

### Test Flow Complet:

1. **Acasă (/)**: Vezi landing page-ul
2. **Sipariș (/siparis)**: Testează formularul de comandă
3. **Stripe Checkout**: (folosește card-uri test)
   - Card valid: 4242 4242 4242 4242
   - Data expirare: orice dată viitoare
   - CVC: orice 3 cifre
4. **Admin Panel**: După checkout, vei fi redirecționat
5. **Guest Upload**: Folosește link-ul generat pentru invitați

## 🧪 Test Cards pentru Stripe

**Succeș:**
- Număr: `4242 4242 4242 4242`
- Data: `12/25` (sau orice dată viitoare)
- CVC: `123`

**Eșec:**
- Număr: `4000 0000 0000 0002`

**3D Secure:**
- Număr: `4000 0025 0000 3155`

Mai multe: https://stripe.com/docs/testing

## 🐛 Debugging

### Probleme Comune

**1. Eroare la conexiunea cu baza de date**
```bash
# Verifică că PostgreSQL rulează
pg_isready

# Testează conexiunea
psql $DATABASE_URL
```

**2. Stripe Webhook nu funcționează local**
- Instalează Stripe CLI: https://stripe.com/docs/stripe-cli
- Rulează forward: `stripe listen --forward-to localhost:3000/api/webhook`

**3. Fișierele nu se încarcă**
- Pentru test local, poți folosi un storage temporar în DB sau filesystem
- Pentru producție, configurează AWS S3

## 📱 Testare pe Mobil

1. Găsește IP-ul local: `ipconfig` (Windows) sau `ifconfig` (Mac/Linux)
2. Pe telefon, merge la: `http://192.168.1.XXX:3000`
3. Testează guest upload flow pe dispozitiv mobil

## 🎨 Customizare

### Schimbă Culorile

Editează `app/globals.css` sau clasele Tailwind în componente:
- Culoare primară: `blue-600` (schimbă în orice culoare vrei)
- Background: `from-blue-50 to-white`

### Schimbă Prețurile

Editează în `app/siparis/page.tsx`:
```typescript
const basePrice = 950;        // Preț pachet bază
const qrPrintPrice = 6;       // Preț per card QR
const voiceMessagePrice = 220; // Preț mesaje vocale
```

### Schimbă Mesajele

Toate mesajele sunt în limba română în componentele React.
Caută textele în fișierele `.tsx` și modifică-le.

## 🚢 Deploy pentru Producție

Vezi [DEPLOYMENT.md](./DEPLOYMENT.md) pentru ghid complet.

**Deploy rapid pe Vercel:**
1. Push pe GitHub
2. Conectează cu Vercel
3. Adaugă environment variables
4. Deploy!

## 📞 Suport

Dacă întâmpini probleme:
- Email: dev@memoriedigitala.ro
- GitHub Issues: [creați un issue](https://github.com/yourrepo/issues)

## 🎯 Sfaturi pentru Dezvoltare

1. **Folosește PostgreSQL local** pentru dezvoltare rapidă
2. **Test Stripe în mod test** până ești gata pentru live
3. **Simulează email-urile** în console pentru iterare rapidă
4. **Folosește Storage local** pentru dev (poți switch la S3 în producție)
5. **Database migrations**: Creează noi migrații pentru modificări schema

## ✅ Checklist pentru Lansare

- [ ] Toate variabilele .env configurate
- [ ] Database populată și migrată
- [ ] Stripe configurat (live keys)
- [ ] S3/AWS configurat
- [ ] Email SMTP funcționează
- [ ] Testezi flow-ul complet (comandă → plată → upload → download)
- [ ] Verifici GDPR compliance
- [ ] Testezi pe dispozitive reale (mobile, tabletă)
- [ ] SEO configurat (meta tags)
- [ ] Analytics configurat (opțional)
- [ ] Backup-uri configurate
- [ ] Monitoring configurat

## 🎉 Gata!

Proiectul este pregătit pentru dezvoltare și testare. Succes cu MemorieDigitala.ro!



