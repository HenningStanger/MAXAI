# MAX KUNNSKAP

## 2026-04-16: Arbeidsmodell for autonom leadmaskin

### 1) Hva fungerer best i praksis
- Små, verifiserbare leveranser gir raskere fremdrift enn store redesign.
- Hver endring bør kobles til én konkret KPI (lead-volum, møtegrad, kundegrad).
- Ett robust system for leadflyt først, deretter skalering til flere nisje-/geo-sider.

### 2) Teknisk læring fra MVP
- Prisma 7 krever driver-adapter i `PrismaClient` (her: `@prisma/adapter-pg` mot PostgreSQL).
- Separasjon av sideinnhold (`content/sites/*`) og seksjonskomponenter (`components/sections/*`) gjør multi-site skalering enklere.
- Server-side validering med `zod` reduserer støy-leads og feil i pipeline.
- Enkel superadmin-auth (cookie + signatur + hash) gir rask MVP uten overkompleksitet.
- En kort "stack-ADR" i eget dokument (`MVP_STACK.md`) gjør det enklere å vite når vi skal oppgradere fra MVP-valg.

### 3) Kontinuerlig forbedringsloop (MCP-fokus)
- Vi bør bygge en egen MCP-modul som kjører i fast loop:
  1. Leser KPI-data (leads, status, konvertering).
  2. Oppdager avvik/svakheter (f.eks. lav møtegrad).
  3. Foreslår prioriterte tiltak (kopi, CTA, skjema, oppfølging).
  4. Oppretter konkrete forbedringsoppgaver.
  5. Måler effekt etter deploy.
- Målet er en “alltid på” optimalisering av hele trakten, ikke kun enkeltsider.

### 4) Prioriterte forbedringer etter MVP
- Integrere oppfølging via e-post/SMS for raskere kontakt innen 24 timer.
- Lage side-spesifikk dashboardvisning per nisje/geografi.
- Etablere A/B testprotokoll med faste beslutningsregler.
- Automatisere ukentlig rapport som oppsummerer hva som bør forbedres.

### 5) Ny læring fra implementasjon av 10-side struktur
- En tydelig katalog (`site-catalog`) + felles innholdsoppslag reduserer risiko for duplisert sidekode.
- Én felles landingsside-komponent gjør at vi kan teste CTA/seksjonsrekkefølge på tvers av alle nisjer raskere.
- Enkle dashboard-filtre (status + periode) gir bedre daglig drift enn flere separate dashboards i tidlig fase.

### 6) Ny laering fra document-and-verify
- End-to-end-verifisering blir mer robust nar vi verifiserer hele leadkjeden: opprettelse, lesing, oppdatering og aktivitetsspor.
- API-kontrakt ma sjekkes mot faktiske feltnavn i schema (`sourcePage`, `notes`) for a unnga falske testfeil.
- Deploy-klargjoring bor alltid inneholde en fast minimumsgate:
  - `npm run lint`
  - `npm run build`
  - kontroll av kritiske ruter i build-output
- Midlertidig test-autentisering med signert cookie er nyttig for rask backend-validering av adminflyt.
