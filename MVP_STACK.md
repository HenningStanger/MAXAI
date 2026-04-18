# MVP Stack-beslutning (Fase 1)

## Mål
Velge en enkel, robust og rask stack for auth, database og datatilgang i første versjon av adminpanel + leadmaskin.

## Besluttet stack

### 1) Auth (superadmin)
- **Løsning:** Egen credentials-baserte innlogging med signert JWT i `httpOnly` cookie.
- **Teknologi:** `bcryptjs` (passord-hash) + `jose` (JWT-signering/verifisering) i Next.js API-ruter.
- **Hvorfor denne nå:** Få bevegelige deler, rask implementering, lav driftskost, og tilstrekkelig sikkerhet for én eier i MVP.

### 2) Database
- **Løsning:** PostgreSQL (hosted, f.eks. Neon eller Vercel Postgres), styrt via Prisma.
- **Teknologi:** `prisma`, `@prisma/client`, `pg`, `@prisma/adapter-pg` (Prisma 7 krever driver-adapter).
- **Hvorfor denne nå:** Støtter varig lagring og deploy på Vercel; SQLite-fil er ikke egnet i serverless.

### 3) Datatilgang
- **Løsning:** Prisma Client som eneste datatilgangslag, kapslet i `lib/*`-repository.
- **Teknologi:** Prisma-schema + migreringer, samt domene-filer i `lib/leads/*`.
- **Hvorfor denne nå:** Type-sikker datatilgang, enklere endringer i datamodell, og tydelig separasjon mellom API-ruter og forretningslogikk.

## Miljøvariabler (MVP)
- `AUTH_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- `DATABASE_URL` (PostgreSQL-URL, typisk med `?sslmode=require` for sky)

## Avgrensning i MVP
- Ingen tredjeparts auth-leverandør (Auth0/Clerk/Supabase Auth) i fase 1.
- Ingen rollehierarki utover superadmin.
- Ingen ekstra DB-leverandør utover én PostgreSQL-instans i fase 1.

## Trigger for fase 2-oppgradering
Vi evaluerer oppgradering når minst ett av disse er sant:
- Flere interne brukere trenger separate roller/tilgangsstyring.
- Vi trenger read replicas, sterkere backup-SLA eller multi-region.
- Lead-volum og rapportbehov tilsier utvidet drift (pooling, overvåkning, dedikert DBA).
