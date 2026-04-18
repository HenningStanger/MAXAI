# PRE-DEPLOY RUNBOOK (MVP)

Bruk denne sjekklisten hver gang før produksjonsdeploy.

## Lokal utvikling med Postgres (Docker)
- Installer [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Mac).
- I prosjektmappen: `docker compose up -d`
- `.env` skal peke på `127.0.0.1:5433` (se `docker-compose.yml` og `.env.example`).
- Kjor `npx prisma migrate deploy`, deretter `npm run dev`.

## 1) Miljo og hemmeligheter
- `DATABASE_URL` skal være en **PostgreSQL**-URL (f.eks. Neon). Bruk gjerne **pooled** connection string på Vercel og `?sslmode=require` der leverandøren krever det.
- Bekreft at disse variablene er satt i deploymiljo:
  - `DATABASE_URL`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD_HASH`
  - `AUTH_SECRET`
  - `MCP_CRON_SECRET` (anbefalt)
- Verifiser at `AUTH_SECRET` er lang og tilfeldig.
- Verifiser at `ADMIN_PASSWORD_HASH` er bcrypt-hash (ikke klartekst).

## 1b) Vercel (første gang)
- Koble Git-repo og sett alle miljøvariabler i Vercel-prosjektet (Production + Preview om nødvendig).
- **`DATABASE_URL` må være tilgjengelig under build** (samme verdi som i runtime). I Vercel: Settings → Environment Variables → velg miljø og bekreft at variabelen ikke er «Runtime only» hvis du får feil ved `prisma migrate deploy`.
- **Neon:** legg inn **`DIRECT_URL`** (direkte tilkobling uten pooler) i Vercel for **build** og migrering. `prisma migrate deploy` bruker `DIRECT_URL` hvis den finnes, ellers `DATABASE_URL`. Uten direkte URL feiler migrering ofte med exit code 1.
- `vercel.json` bruker `buildCommand`: `npx prisma migrate deploy && npm run build` slik at migrering kjører før `next build`.
- Neon: bruk connection string med `?sslmode=require` (eller leverandørens anbefalte parametere).
- Etter første vellykkede deploy: verifiser tabeller i Neon/Postgres (eller kjør `npx prisma migrate status` med samme `DATABASE_URL` lokalt).

## 2) Kodekvalitet (lokalt)
- Kjor `npm run lint` og bekreft null feil.
- Kjor `npm run build` og bekreft vellykket bygg.
- Sjekk at kritiske ruter finnes i build-output:
  - `/admin`
  - `/admin/login`
  - `/api/leads`
  - `/api/leads/[id]`
  - `/api/admin/login`
  - `/api/admin/logout`

## 3) Funksjonell minimumstest (lokalt)
- Ha `DATABASE_URL` mot en Postgres-instans i `.env` (samme modell som produksjon).
- Opprett test-lead via `POST /api/leads`.
- Verifiser lead vises i admin-flyt (`GET /api/leads` med gyldig session).
- Oppdater lead med status og notat via `PATCH /api/leads/:id`.
- Verifiser aktivitetshistorikk via `GET /api/leads/:id`.

## 4) Drift og observabilitet
- Bekreft at daglig forbedringsjobb er konfigurert (`vercel.json` cron).
- Test at MCP-rapport kan genereres:
  - `npm run mcp:daily-report`
- Bekreft at rapportskriving fungerer i `reports/continuous-improvement/`.

## 5) Deploy-beslutning
- Deploy kun hvis alle punkter over er godkjent.
- Ved avvik: stopp deploy, rett feil, og kjor hele runbooken pa nytt.

## 6) Etter deploy (5 min kontroll)
- Aapne forsiden og bekreft at leadskjema laster.
- Send inn en test-lead og bekreft at den havner i admin.
- Logg inn/ut av admin for a verifisere auth-flyt.
- Fra admin-dashboard: trykk "Send testvarsel" og bekreft mottatt e-post.
- Bekreft at API svarer uten 5xx-feil pa kjerneendepunktene.
