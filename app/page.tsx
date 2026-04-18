import type { Metadata } from "next";
import Link from "next/link";
import { getAllSites } from "@/content/sites";

export const metadata: Metadata = {
  title: "MAXAI | Leadsmaskin for markedsføring",
  description:
    "Bygg landingsside-seksjoner, driv organisk synlighet og annonsering, og skaler en komplett leadsmaskin i ett system.",
  keywords: ["MAXAI", "leadsmaskin", "landingsside", "annonsering", "organisk vekst", "markedsføring"]
};

export default function Home() {
  const sites = getAllSites();
  const primaryExample = sites[0]?.slug ?? "regnskap-bygg-stavanger";

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900">
      {/* Tynn topplinje — inspirert av produktnavigasjon */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fafafa]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-[15px] font-semibold tracking-tight text-neutral-900">
            MAXAI
          </Link>
          <nav className="hidden items-center gap-8 text-[14px] text-neutral-600 md:flex">
            <a href="#produkt" className="transition hover:text-neutral-900">
              Produkt
            </a>
            <a href="#nisjer" className="transition hover:text-neutral-900">
              Eksempler
            </a>
            <Link href="/login" className="transition hover:text-neutral-900">
              Logg inn
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/ny-bruker"
              className="hidden rounded-full border border-neutral-200 bg-white px-4 py-2 text-[13px] font-medium text-neutral-800 shadow-sm transition hover:border-neutral-300 sm:inline-flex"
            >
              Kom i gang
            </Link>
            <Link
              href="/admin"
              className="rounded-full bg-neutral-900 px-4 py-2 text-[13px] font-medium text-white transition hover:bg-neutral-800"
            >
              Åpne admin
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero — myk mesh, stor typografi, luft */}
        <section className="relative overflow-hidden border-b border-black/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 85, 255, 0.12), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(147, 51, 234, 0.08), transparent), radial-gradient(ellipse 50% 30% at 0% 50%, rgba(0, 85, 255, 0.06), transparent)"
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
            <p className="mb-6 inline-flex rounded-full border border-black/[0.08] bg-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-600">
              Leadsmaskin for markedsføring
            </p>
            <h1 className="max-w-[14ch] text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-neutral-900 md:text-[3.5rem] md:leading-[1.05]">
              Bygg. Distribuer. Konverter.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-neutral-600 md:text-[19px]">
              Én flyt for landingssider, organisk vekst og annonsering — med oppfølging og KPI som faktisk brukes i
              hverdagen.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/ny-bruker"
                className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 text-[15px] font-medium text-white transition hover:bg-neutral-800"
              >
                Start gratis
              </Link>
              <Link
                href={`/${primaryExample}`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-300 bg-white px-8 text-[15px] font-medium text-neutral-900 transition hover:border-neutral-400 hover:bg-neutral-50"
              >
                Se live eksempel
              </Link>
            </div>
            <p className="mt-8 text-[13px] text-neutral-500">
              Allerede bruker?{" "}
              <Link href="/login" className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900">
                Logg inn
              </Link>
              {" · "}
              <Link href="/min-konto" className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900">
                Min konto
              </Link>
            </p>
          </div>
        </section>

        {/* Bento — tre pilarer */}
        <section id="produkt" className="border-b border-black/[0.06] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Alt du trenger for å fylle pipeline
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-600">
              Modulbasert som et byggeverktøy — men med leadmotor og admin innebygd.
            </p>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Landingsside-seksjoner",
                  body: "Hero, proof, prosess, FAQ og CTA — gjenbruk og tilpass uten ny kodebase for hver lansering."
                },
                {
                  step: "02",
                  title: "Organisk + annonsering",
                  body: "Samme struktur for SEO og kampanjer. Én sannhet per målgruppe og geografi."
                },
                {
                  step: "03",
                  title: "Oppfølging med KPI",
                  body: "Se hvem som venter, hva som konverterer, og hvor du bør skru på neste uke."
                }
              ].map((item) => (
                <article
                  key={item.step}
                  className="group rounded-[20px] border border-black/[0.06] bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:border-black/[0.1] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{item.step}</p>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tall / proof strip */}
        <section className="border-b border-black/[0.06] py-14 md:py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4 md:gap-8">
            {[
              { label: "Fokus", value: "Lead-kvalitet" },
              { label: "SLA", value: "24t oppfølging" },
              { label: "Motor", value: "SEO + Ads" },
              { label: "Resultat", value: "Pipeline" }
            ].map((row) => (
              <div key={row.label} className="text-center md:text-left">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">{row.label}</p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-900 md:text-xl">{row.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nisjer */}
        <section id="nisjer" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Eksempler i porteføljen
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-neutral-600">
              Hver underside deler samme leadmotor. Skaler fra én nisje til mange.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {sites.map((site) => (
                <Link
                  key={site.slug}
                  href={`/${site.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:border-black/[0.1] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
                >
                  <div>
                    <p className="text-[15px] font-medium text-neutral-900">
                      {site.industry} · {site.city}
                    </p>
                    <p className="mt-0.5 font-mono text-[12px] text-neutral-400">/{site.slug}</p>
                  </div>
                  <span className="text-neutral-400 transition group-hover:text-neutral-900" aria-hidden>
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA-bånd */}
        <section className="border-t border-black/[0.06] bg-neutral-900 py-16 text-white md:py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Klar til å skru på leadsmaskinen?</h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] text-neutral-400">
              Book demo eller åpne admin — samme plattform.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/admin"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[15px] font-medium text-neutral-900 transition hover:bg-neutral-100"
              >
                Book demo / Åpne admin
              </Link>
              <Link
                href="/ny-bruker"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-[15px] font-medium text-white transition hover:bg-white/10"
              >
                Opprett bruker
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-black/[0.06] py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-[13px] text-neutral-500 md:flex-row">
            <span className="font-semibold text-neutral-900">MAXAI</span>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/login" className="hover:text-neutral-900">
                Logg inn
              </Link>
              <Link href="/ny-bruker" className="hover:text-neutral-900">
                Ny bruker
              </Link>
              <Link href="/admin" className="hover:text-neutral-900">
                Admin
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
