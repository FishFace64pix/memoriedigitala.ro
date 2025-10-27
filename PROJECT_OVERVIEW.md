# MemorieDigitala.ro - Overview Proiect

## 🎯 Scop

MemorieDigitala.ro este o platformă digitală care permite organizatorilor de evenimente să colecteze centralizat toate fotografiile și videoclipurile de la invitați prin intermediul unui QR cod unic, fără a necesita aplicații mobile sau înregistrări.

## 🏗️ Arhitectură

### Stack Tehnologic

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4.0
- Responsive Design (Mobile-First)

**Backend:**
- Next.js API Routes
- Node.js
- PostgreSQL
- AWS S3 / Google Cloud Storage

**Servicii Externe:**
- Stripe (plăți cu card)
- Nodemailer (email SMTP)
- QR Code generation

**Limbaj & Monedă:**
- Română
- RON (Leu românesc)

## 📁 Structura Proiectului

```
memorie-digitala/
├── app/                          # Next.js App Router
│   ├── api/                      # API Endpoints
│   │   ├── create-order/         # Creează comandă + Stripe session
│   │   ├── webhook/              # Stripe webhook handler
│   │   ├── upload-media/         # Încărcare foto/video
│   │   ├── get-media/            # Fetch media pentru event
│   │   ├── delete-media/         # Ștergere media (moderare)
│   │   ├── get-event/            # Detalii event
│   │   ├── qr-template/         # Generează QR code
│   │   └── download-all/         # Descărcare ZIP cu toate media
│   ├── admin/[event_id]/         # Panel administrare HOST
│   ├── e/[access_key]/           # Pagină upload pentru INVITAȚI
│   ├── siparis/                  # Pagină comandă (selecție add-ons)
│   ├── contact/                  # Formular contact
│   ├── sss/                      # Întrebări frecvente
│   ├── politica-de-confidentialitate/  # GDPR Privacy Policy
│   ├── termeni-si-conditii/      # Terms of Service
│   ├── page.tsx                  # Landing page (HOME)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── lib/                          # Utilities & configurations
│   ├── db.ts                     # PostgreSQL client
│   ├── stripe.ts                 # Stripe client
│   ├── email.ts                  # Email functions
│   ├── utils.ts                  # Helper functions
│   ├── qrcode.ts                # QR code generation
│   └── storage.ts                # S3 storage functions
├── database/
│   └── schema.sql                # Database schema
├── README.md                     # Documentație principală
├── DEPLOYMENT.md                 # Ghid deployment
├── QUICK_START.md                # Start rapid
└── package.json                  # Dependencies
```

## 🔄 Flow-uri Principale

### 1. Flow Comandă (Host/Măturam)

```
HOME (/) 
  → Buton "Creează Comanda"
  → SIPARIS (/siparis)
    → Completează formular
    → Selectează add-ons (QR cards, voice messages)
    → "Mergi la Plată"
    → Stripe Checkout
    → Plată finalizată
    → Webhook Stripe
    → Email confirmare
    → ADMIN PANEL (/admin/[event_id])
```

### 2. Flow Upload (Invitați)

```
Scanare QR / Accesare Link
  → Pagină upload (/e/[access_key])
    → Selectează tip: Foto / Video / Audio
    → Selectează fișier
    → Upload
    → Confirmare success
    → (Opțional) Upload alt fișier
```

### 3. Flow Administrare (Host)

```
ADMIN PANEL (/admin/[event_id])
  → Vizualizează galerie media
  → Vezi QR code + link
  → Download șabloane QR cards
  → Moderează conținut (șterge)
  → Download toate media (ZIP)
```

## 💾 Database Schema

### Tabele Principale

1. **users**: Utilizatori (host-uri)
2. **events**: Evenimente
   - `event_id` (unic)
   - `access_key` (pentru invitați)
   - `host_email`, `host_name`
   - Configurații (QR print, voice messages)
   - `expires_at` (12 luni)
3. **orders**: Comenzi + plăți
   - Stripe session ID
   - Detalii preț
   - Payment status
4. **media_uploads**: Fotografii/videoclipuri
   - Link către fișier în S3
   - Tip (`photo`, `video`, `audio`)
   - Moderat (`is_approved`)
5. **qr_templates**: Șabloane pentru carduri QR

## 💰 Prețuri

### Pachet Standard: 950 RON
- Acces 12 luni
- Încărcări nelimitate
- 8 șabloane QR design
- Descărcare în masă
- Suport tehnic

### Add-ons
- **Carduri QR Fizice**: 6 RON/card (50-250 buc)
- **Mesaje Vocale**: 220 RON (one-time)

### Livrare
- Carduri fizice: 5-7 zile lucrătoare
- Recomandare: comandă minim 10 zile înainte de eveniment

## 🔐 Securitate & Compliance

### GDPR Compliance
- Date stocate în UE
- Politică confidențialitate completă
- Drept de ștergere a datelor
- Consent explicite

### Securitate
- HTTPS obligatoriu
- Criptare la rest (S3)
- Criptare în tranzit (TLS/SSL)
- Auth tokens pentru admin panel
- Rate limiting pe API
- File type validation
- File size limits

## 🎨 Design & UX

### Principii
- **Satis-Driven Design**: Call-to-action clar pe fiecare pagină
- **Mobile-First**: Optimizat pentru telefon
- **Fără Fricțiuni**: Upload simplu pentru invitați
- **Transparent**: Prețuri clare, informații despre livrare

### Culori
- Primar: `#2563EB` (Blue 600)
- Secundar: Gradiente azuriu
- Succes: `#10B981` (Green 500)
- Avertizare: `#F59E0B` (Yellow 500)
- Error: `#EF4444` (Red 500)

## 📊 Metrici de Success

- Conversion rate: Homepage → Comandă
- Upload success rate pentru invitați
- Adoption rate: % comenzi cu carduri QR
- Customer satisfaction: Feedback email

## 🚀 Roadmap

### Phase 1: MVP (Actual)
✅ Landing page
✅ Checkout flow
✅ Stripe integration
✅ Upload system
✅ Admin panel
✅ GDPR compliance

### Phase 2: Enhancement
- [ ] Dashboard analytics pentru host-uri
- [ ] Șabloane QR cards personalizabile
- [ ] Integrare Instagram/Google Photos
- [ ] Mobile app pentru gazde
- [ ] AI photo organization

### Phase 3: Scale
- [ ] Multi-user collaborations (nuntă)
- [ ] Live preview gallery
- [ ] Video livestream pentru evenimente
- [ ] Print ordering direct din app
- [ ] White-label pentru afaceri mari

## 📞 Contact

**Dezvoltare:**
- Email: dev@memoriedigitala.ro

**Suport Client:**
- Email: contact@memoriedigitala.ro

---

Construit cu ❤️ pentru evenimentele românești.



