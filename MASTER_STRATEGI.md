# MASTER STRATEGI 2026

## Mål
Bygge 10 høyintente nettsider for regnskapstjenester i Norge, der hver side kombinerer:
- En bransje med høy betalingsvillighet (komplekst regelverk, høy transaksjonsverdi eller tydelig risiko).
- Et geografisk marked der lokal SEO er mulig å vinne raskere enn i de mest overopphetede søkene.

## Researchgrunnlag (kort)
- Norske prisnivå for regnskapstjenester ligger typisk høyt, spesielt ved kompleksitet og rådgivning.
- Bransjer som bygg/anlegg, eiendom, helse og juridiske miljøer har høy verdi per kunde.
- Google Ads-data peker på høy konkurranse i brede regnskapssøk, som gjør nisje + geografi-strategi viktig.
- Offentlige tall (SSB/Brønnøysund) viser fortsatt høy etableringsaktivitet og løpende behov for regnskap.

## Våre 10 prioriterte nettsider

1) **Regnskap for bygg og entreprenør i Stavanger**
- **Domeneidé:** `regnskapbyggstavanger.no`
- **Vinkel:** "Prosjektregnskap som stopper marginlekkasje i hvert prosjekt."
- **Hvorfor:** Bygg har kompleks MVA, prosjektøkonomi og høy feilkostnad. Stavanger-markedet har betalingsevne.

2) **Regnskap for eiendomsselskaper i Oslo**
- **Domeneidé:** `eiendomsregnskaposlo.no`
- **Vinkel:** "Fra utleie til årsoppgjør: full kontroll på eiendomstall."
- **Hvorfor:** Eiendom har høy livstidsverdi per kunde og behov for spesialisert rådgivning.

3) **Regnskap for leger og klinikker i Bergen**
- **Domeneidé:** `regnskaplegebergen.no`
- **Vinkel:** "Mer tid til pasienter, mindre tid på økonomi og rapportering."
- **Hvorfor:** Helseaktører har stabil økonomi, høy betalingsvillighet og behov for trygg compliance.

4) **Regnskap for advokatkontor i Trondheim**
- **Domeneidé:** `advokatregnskaptrondheim.no`
- **Vinkel:** "Regnskap med revisjonsspor og null stress før frister."
- **Hvorfor:** Juridiske miljøer verdsetter kvalitet, sporbarhet og høy faglig standard.

5) **Regnskap for IT-konsulenter i Tromsø**
- **Domeneidé:** `itregnskaptromso.no`
- **Vinkel:** "Skalerbar økonomifunksjon for konsulentselskaper i vekst."
- **Hvorfor:** IKT har høy etableringstakt og digitale kjøpere; lokal konkurranse er ofte lavere enn i storbyene.

6) **Regnskap for netthandel i Kristiansand**
- **Domeneidé:** `ehandelsregnskapkristiansand.no`
- **Vinkel:** "Kontroll på MVA, lager og marginer i nettbutikk."
- **Hvorfor:** E-handel har hyppige transaksjoner og stort behov for løpende økonomistyring.

7) **Regnskap for restaurant og servering i Drammen**
- **Domeneidé:** `restaurantregnskapdrammen.no`
- **Vinkel:** "Daglig kontroll på lønn, varekost og kontantstrøm."
- **Hvorfor:** Servering har høy operasjonell kompleksitet og høy verdi av tett oppfølging.

8) **Regnskap for håndverkere i Fredrikstad**
- **Domeneidé:** `handverkerregnskapfredrikstad.no`
- **Vinkel:** "Fastpris på regnskap som følger ordre, timer og faktura."
- **Hvorfor:** Håndverkersegmentet er stort, tydelig problemdrevet og ofte underdekket med nisjeinnhold lokalt.

9) **Regnskap for transport og logistikk i Ålesund**
- **Domeneidé:** `transportregnskapaalesund.no`
- **Vinkel:** "Regnskap som håndterer kjøretøy, diett og drift i bevegelse."
- **Hvorfor:** Transportbedrifter har mange bilagstyper og løpende behov for kontroll på kostnader.

10) **Regnskap for frisør og skjønnhet i Sandnes**
- **Domeneidé:** `salongregnskapsandnes.no`
- **Vinkel:** "Enkelt regnskap for salonger med fokus på lønnsom drift."
- **Hvorfor:** Mange små aktører, tydelige behov og relativt god mulighet for lokal SEO-posisjonering.

## Felles konverteringsoppsett for alle 10 sider
- Tydelig CTA over folden: "Book gratis 15-min strategisamtale."
- Bransjespesifikke caser med tall før/etter.
- Lokal tillit: referanser, kart, responstid og tydelig ansvarlig rådgiver.
- Lead magnet per nisje (f.eks. "MVA-sjekkliste for bygg", "Årsoppgjør-guide for klinikker").

## Prioritert lanseringsrekkefølge
1. Bygg + Stavanger  
2. Eiendom + Oslo  
3. Lege/Klinikk + Bergen  
4. IT-konsulent + Tromsø  
5. Håndverker + Fredrikstad  
6. Advokat + Trondheim  
7. E-handel + Kristiansand  
8. Restaurant + Drammen  
9. Transport + Ålesund  
10. Frisør/Skjønnhet + Sandnes

## Suksessmål (første 90 dager)
- Minst 10 publiserte landingssider (1 per nisje).
- Minst 3 søkeord i topp 10 per side.
- Minst 30 kvalifiserte leads totalt.
- Konverteringsrate fra sidebesøk til lead: minimum 3 %.

## Multi-site arkitektur (MVP)
- `app/page.tsx` bruker nå delt innhold + delte seksjonskomponenter for høy gjenbruk.
- `content/sites/*` holder side-spesifikk tekst, USP og metadata per nisje/geografi.
- `components/sections/*` holder gjenbrukbare blokker (hero, kort, prosess, FAQ, leadskjema).
- `app/admin/*` er adminpanel for leads og oppfølging.
- `app/api/leads/*` er API-lag for innsamling/oppdatering av leads.
- `lib/leads/*` samler validering og datatilgang.
- `prisma/*` + `generated/prisma/*` håndterer datamodell og klient.

## Drift KPI i adminpanel
- Lead-volum per uke.
- Antall nye leads (`ny`).
- Møtegrad (`møte booket` / leads).
- Kundegrad (`kunde` / møter).
- KPI-visning har enkel filtrering på periode (`7d`, `30d`, `all`) og lead-status for rask operativ oppfølging.

## Besluttet MVP-stack (fase 1)
- Auth: credentials-basert superadmin med signert JWT-cookie.
- Database: PostgreSQL via Prisma (hosted DB, egnet for Vercel og varig lead-lagring).
- Datatilgang: Prisma Client kapslet i `lib/*`-lag for tydelig domeneansvar.
- Beslutningsgrunnlag og oppgraderingskriterier er dokumentert i `MVP_STACK.md`.

## Multi-site klargjøring for 10 sider
- `content/sites/site-catalog.ts` er etablert med 10 prioriterte nisje-/geo-slugs fra strategi.
- `app/[site]/page.tsx` genererer statiske sider per slug og bruker felles landingsside-mal.
- `components/sites/site-landing-page.tsx` er felles rendrer for innhold + leadskjema.
- Nye sider kan aktiveres med eget innhold per `contentKey` uten å bygge ny layout.

## Deploy-klargjoring (MVP fase 1)
- Runtime-variabler som ma settes i deploymiljo:
  - `DATABASE_URL`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD_HASH`
  - `AUTH_SECRET`
  - `MCP_CRON_SECRET` (valgfri, men anbefalt)
- Verifisert kvalitetssperre for release:
  - `npm run lint` ma besta.
  - `npm run build` ma besta.
- Verifisert leadflyt for MVP:
  - Innsending av lead via `POST /api/leads` lagrer lead i database.
  - Admin-autoriserte kall kan lese leadliste og oppdatere status/notater via API.
  - Aktivitetshistorikk opprettes ved statusendring og notatoppdatering.
- Drift etter deploy:
  - Daglig kontroll av KPI i admin (`ny`, `kontaktet`, `mote booket`, `kunde`, `tapt`).
  - Daglig MCP-rapport fra `npm run mcp:daily-report` / Vercel cron for forbedringsloop.

## Hovedside-strategi (domene)
- `www.maxai.no` skal representere hovedsystemet (plattform + admin + operativ oversikt).
- Nisje- og geografiinnhold publiseres som undersider under samme system (f.eks. `/{slug}`).
- Forsiden skal kommunisere produkt/operasjonell verdi, ikke opptre som en enkelt nisje-side.
- Eksisterende bygg-stavanger-innhold beholdes som eksempel/nisjeside i multi-site-portefoljen.
