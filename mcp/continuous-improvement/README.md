# MCP: Continuous Improvement Worker

Dette er et skjelett for en MCP-prosess som jobber kontinuerlig med forbedringer av leadmaskinen.

## Formål
- Overvåke lead-KPI-er i admin/data.
- Oppdage flaskehalser i trakten.
- Foreslå og prioritere forbedringer.
- Drive en stabil test-og-lær loop.

## Foreslått kjørefrekvens
- Hver 6. time: rask helse-/KPI-sjekk.
- Daglig: forslag til forbedringstiltak.
- Ukentlig: større gjennomgang med prioriteringsliste.

## Inputs
- Leads med statuser (`ny`, `kontaktet`, `møte booket`, `kunde`, `tapt`).
- Konverteringsmetrikker per side.
- Endringslogg fra siste deploy.

## Outputs
- Prioritert tiltaksliste (høy/middels/lav effekt).
- Forslag til A/B-tester.
- Oppfølging av tidligere tiltak med effektmåling.

## Implementert i prosjektet
- API-endepunkt: `/api/mcp/daily-improvements`
- Lokal rapportjobb: `npm run mcp:daily-report` (krever `DATABASE_URL` mot PostgreSQL i `.env`)
- Rapporter skrives til `reports/continuous-improvement/`
- Vercel cron trigges daglig kl. 08:00 via `vercel.json`
- Endepunkt kan beskyttes med `MCP_CRON_SECRET` (Bearer token)

## Minimumsregler
- Ingen automatiske produksjonsendringer uten godkjenning.
- Ett tydelig eksperiment av gangen per side.
- Alle tiltak skal ha forventet KPI-effekt og måleperiode.
