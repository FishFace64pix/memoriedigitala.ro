# Ghid de Deployment pentru MemorieDigitala.ro

## Pregătirea Mediului

### 1. Configurare PostgreSQL

Instalează PostgreSQL local sau folosește un serviciu cloud:
- AWS RDS
- Heroku Postgres
- Supabase
- Railway

```bash
# Local PostgreSQL
createdb memoriedigitala
psql memoriedigitala < database/schema.sql
```

### 2. Configurare Stripe

1. Creează cont pe https://stripe.com
2. Obține cheile API din Dashboard
3. Configurează webhook:
   - URL: `https://yourdomain.com/api/webhook`
   - Events: `checkout.session.completed`
   - Obține cheia secretă webhook

### 3. Configurare AWS S3 (sau alternativă)

#### AWS S3:
1. Creează un bucket S3
2. Configurează CORS:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```
3. Creează IAM user cu permisiuni S3
4. Obține cheile de acces

#### Alternativă: Google Cloud Storage
Similar cu S3, creează un bucket și configurează permisiuni.

### 4. Configurare Email SMTP

Pentru Gmail:
1. Activează "app password" în cont
2. Folosește SMTP_USER = email-ul tău
3. Folosește SMTP_PASS = app password-ul generat

Alternativ, folosește:
- SendGrid
- Mailgun
- AWS SES

## Deployment pe Vercel (Recomandat)

### 1. Conectează GitHub Repository

1. Push codul pe GitHub
2. Mergi pe vercel.com
3. Import project → Selectează repository-ul
4. Configurează:
   - Framework Preset: Next.js
   - Root Directory: ./ (sau `memorie-digitala` dacă e într-un subfolder)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 2. Configurează Environment Variables

În Vercel Dashboard → Settings → Environment Variables, adaugă:

```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
JWT_SECRET=your-random-secret-key
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=eu-central-1
AWS_S3_BUCKET_NAME=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
FROM_EMAIL=noreply@memoriedigitala.ro
NEXT_PUBLIC_APP_URL=https://memoriedigitala.ro
```

### 3. Deploy

1. Click "Deploy"
2. Așteaptă build-ul
3. Testează site-ul

### 4. Configurare Domeniu Custom

1. În Vercel → Settings → Domains
2. Adaugă `memoriedigitala.ro`
3. Configurează DNS pe provider-ul de domeniu:
   - A record → 76.76.21.21
   - CNAME www → cname.vercel-dns.com

## Deployment pe Railway

### 1. Push pe Railway

```bash
# Instalează Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inițializează proiect
railway init

# Deploy
railway up
```

### 2. Configurează Services

- **Web Service**: Next.js app
- **PostgreSQL**: Database
- Configurare environment variables

## Deployment pe Netlify

1. Conectează repository-ul GitHub
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Configurează environment variables
4. Deploy!

## Post-Deployment Checklist

- [ ] Testează homepage-ul
- [ ] Testează crearea comenzii
- [ ] Testează Stripe checkout
- [ ] Verifică webhook-ul Stripe (Dashboard → Events)
- [ ] Testează încărcarea de foto de la invitați
- [ ] Testează panel-ul de administrare
- [ ] Verifică email-urile de confirmare
- [ ] Testează linkurile QR
- [ ] Verifică descărcarea ZIP-urilor
- [ ] Testează GDPR compliance (politicile de confidențialitate)

## Monitoring

### Vercel Analytics
- Includează Vercel Analytics pentru tracking
- Configurează custom events pentru conversii

### Error Tracking
Consideră integrarea cu:
- Sentry (pentru error tracking)
- LogRocket (pentru session replay)

## Backup-uri

### Database Backup
```bash
# Automated backup script
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup_20241201.sql
```

Configurare backup automat:
- AWS S3 automated backups
- Cloudflare R2
- Scheduled cron jobs

## Security Checklist

- [ ] HTTPS activat (automatic pe Vercel)
- [ ] Environment variables protejate
- [ ] Database cu SSL
- [ ] Rate limiting pe API endpoints
- [ ] File upload size limits
- [ ] CSRF protection
- [ ] XSS protection
- [ ] Secure headers configurate

## Performance Optimization

- [ ] Image optimization (Next.js Image component)
- [ ] CDN pentru fișiere statice
- [ ] Database indexes (deja configurate în schema)
- [ ] Caching (Redis pentru sesiuni)
- [ ] Compression (gzip/brotli)

## Suport și Mentenanță

- Configurare monitoring pentru uptime
- Alert-uri pentru erori
- Regular backups
- Update dependencies lunar
- Security patches aplicați prompt

## Contact

Pentru suport tehnic: dev@memoriedigitala.ro



