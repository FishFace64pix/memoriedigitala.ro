# MemorieDigitala.ro

Platformă digitală pentru colectarea centralizată a fotografiilor și videoclipurilor de la evenimente prin QR code.

## Caracteristici

- ✅ Landin page optimizată pentru conversie
- ✅ Procesare comenzi cu Stripe (RON)
- ✅ Generare automată QR code pentru evenimente
- ✅ Încărcare foto/video fără înregistrare
- ✅ Panel de administrare pentru gestionarea conținutului
- ✅ Descărcare în masă a conținutului
- ✅ GDPR compliant
- ✅ Carduri fizice cu QR (opțional)
- ✅ Mesaje vocale (opțional)
- ✅ Responsive design

## Tehnologii

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** PostgreSQL
- **Payment:** Stripe
- **Storage:** AWS S3 / Google Cloud Storage
- **Email:** Nodemailer (SMTP)

## Instalare

### 1. Clonează repository-ul

```bash
git clone https://github.com/tuusername/memorie-digitala.git
cd memorie-digitala
```

### 2. Instalează dependențele

```bash
npm install
```

### 3. Configurează variabilele de mediu

Creează un fișier `.env` în rădăcina proiectului:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/memoriedigitala

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_CURRENCY=ron
STRIPE_WEBHOOK_SECRET=whsec_...

# JWT
JWT_SECRET=your-super-secret-jwt-key

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=eu-central-1
AWS_S3_BUCKET_NAME=memorie-digitala-media

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@memoriedigitala.ro

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Creează baza de date

```bash
# Conectează-te la PostgreSQL și rulează schema
psql -U postgres -d memoriedigitala < database/schema.sql
```

### 5. Rulează aplicația

```bash
npm run dev
```

Aplicația va rula la `http://localhost:3000`

## Structura Proiectului

```
memorie-digitala/
├── app/
│   ├── api/              # API Routes
│   │   ├── create-order/
│   │   ├── webhook/       # Stripe webhook
│   │   ├── upload-media/
│   │   ├── get-media/
│   │   ├── delete-media/
│   │   └── get-event/
│   ├── admin/[event_id]/ # Panel de administrare
│   ├── e/[access_key]/   # Pagina pentru invitați
│   ├── siparis/          # Pagina de comandă
│   ├── contact/          # Pagina de contact
│   ├── sss/              # Întrebări frecvente
│   ├── politica-de-confidentialitate/
│   └── termeni-si-conditii/
├── database/
│   └── schema.sql        # Schema bazei de date
├── lib/
│   ├── db.ts             # Configurare PostgreSQL
│   ├── stripe.ts         # Configurare Stripe
│   ├── email.ts          # Funcții email
│   └── utils.ts          # Funcții utile
└── public/               # Fișiere statice
```

## API Endpoints

### POST `/api/create-order`
Creează o nouă comandă și sesiune Stripe checkout.

**Body:**
```json
{
  "hostEmail": "user@example.com",
  "hostName": "Ion Popescu",
  "eventName": "Nuntă",
  "eventDate": "2024-06-15",
  "qrPrintQuantity": 100,
  "voiceMessageEnabled": true,
  "basePrice": 950,
  "qrPrintPrice": 600,
  "voiceMessagePrice": 220,
  "totalPrice": 1770
}
```

### POST `/api/webhook`
Webhook pentru Stripe (processare plăți).

### POST `/api/upload-media`
Încarcă foto/video/audio pentru un eveniment.

**FormData:**
- `file`: File
- `accessKey`: string
- `type`: 'photo' | 'video' | 'audio'

### GET `/api/get-media?eventId=evt_xxx`
Obține toate media-uri pentru un eveniment.

### DELETE `/api/delete-media?id=xxx&eventId=evt_xxx`
Șterge un media.

### GET `/api/get-event?eventId=evt_xxx`
Obține detaliile unui eveniment.

## Dezvoltare

### Rularea în modul development

```bash
npm run dev
```

### Build pentru producție

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Deployment

### Vercel (Recomandat)

1. Conectează repository-ul la Vercel
2. Adaugă toate variabilele de mediu în setările proiectului
3. Configurează Stripe webhook URL-ul în Stripe Dashboard
4. Deploy!

### Alternative

Proiectul poate fi deployed pe orice platformă care suportă Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## Configurare Stripe

1. Creează un cont Stripe
2. Obține cheile API de pe Dashboard
3. Configurare webhook în Stripe Dashboard:
   - URL: `https://yourdomain.com/api/webhook`
   - Events: `checkout.session.completed`
4. Obține cheia secretă a webhook-ului și o adaugă în `.env`

## Configurare Cloud Storage

### AWS S3

1. Creează un bucket S3
2. Configurează CORS pentru bucket-ul tău
3. Adaugă cheile de acces în `.env`

### Google Cloud Storage

1. Creează un bucket în GCS
2. Configurează IAM permissions
3. Adaugă cheile de acces în `.env`

## Contribuții

Contribuțiile sunt binevenite! Te rugăm să:
1. Fork repository-ul
2. Creează un branch pentru feature (`git checkout -b feature/nume-feature`)
3. Commit modificările (`git commit -am 'Adaugă feature'`)
4. Push la branch (`git push origin feature/nume-feature`)
5. Deschide un Pull Request

## Licență

Acest proiect este proprietate intelectuală a MemorieDigitala.ro SRL.

## Suport

Pentru întrebări sau suport, contactează-ne la: contact@memoriedigitala.ro
