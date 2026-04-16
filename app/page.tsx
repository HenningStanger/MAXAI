import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regnskap for bygg i Stavanger | Fastpris og prosjektkontroll",
  description:
    "Spesialisert regnskap for bygg og entreprenor i Stavanger. Fa kontroll pa MVA, prosjektokonomi og marginer med en statsautorisert regnskapsforer.",
  keywords: [
    "regnskap bygg stavanger",
    "entreprenor regnskap stavanger",
    "prosjektregnskap bygg",
    "mva bygg",
    "statsautorisert regnskapsforer stavanger"
  ]
};

const faqItems = [
  {
    question: "Hva koster regnskap for en byggbedrift i Stavanger?",
    answer:
      "Pris avhenger av antall bilag, lonnskjoringer og prosjektkompleksitet. De fleste byggkunder velger fastpris med manedlig oppfolging for bedre kontroll."
  },
  {
    question: "Kan dere handtere prosjektregnskap per byggeplass?",
    answer:
      "Ja. Vi setter opp rapportering per prosjekt sa du ser dekning, kostnader og marginer fortlopende."
  },
  {
    question: "Hjelper dere med MVA i bygg og anlegg?",
    answer:
      "Ja. Vi kvalitetssikrer MVA-behandling, frister og dokumentasjon slik at risikoen for feil reduseres betydelig."
  },
  {
    question: "Hvor raskt kan vi komme i gang?",
    answer:
      "Vanligvis innen 3-7 arbeidsdager. Vi starter med et kort kartleggingsmote og setter opp en konkret plan for overforing."
  }
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "MAXAI Regnskap Stavanger",
  areaServed: "Stavanger",
  serviceType: "Regnskap for bygg og entreprenor",
  telephone: "+47 400 00 000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stavanger",
    addressCountry: "NO"
  }
};

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <section className="rounded-3xl bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-white shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
          Nettside 1 av 10 | Stavanger
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Regnskap for bygg og entreprenor i Stavanger
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
          Fa prosjektregnskap som gir kontroll pa MVA, fakturering og marginer i
          hvert oppdrag. Vi hjelper byggbedrifter med bedre kontantstrom,
          tryggere etterlevelse og hoyere lonnsomhet.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#kontakt"
            className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-900 transition hover:bg-blue-50"
          >
            Book gratis 15-min strategisamtale
          </a>
          <a
            href="tel:+4740000000"
            className="rounded-xl border border-blue-200 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Ring oss na: 40 00 00 00
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Prosjektregnskap per byggeplass", "MVA uten stress", "Fast rapportering hver maned"].map(
          (item) => (
            <article
              key={item}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <h2 className="text-base font-semibold text-slate-900">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Praktisk oppfolging for byggbedrifter som vil ta bedre beslutninger.
              </p>
            </article>
          )
        )}
      </section>

      <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Derfor velger byggbedrifter oss
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Bransjespesialisert team</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Vi jobber med bygg og entreprenor hver uke, og kjenner fallgruvene.
            </p>
          </article>
          <article className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Tydelig fastpris</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Du vet hva du betaler for, og hva du far levert hver maned.
            </p>
          </article>
          <article className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Rask respons pa frister</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Vi holder kontroll pa frister for MVA, lonn og arsoppgjor.
            </p>
          </article>
          <article className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Rapporter som gir handling</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Du far tall per prosjekt sa du kan styre kapasitet, pris og dekningsgrad.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Vanlige sporsmal</h2>
        <div className="mt-5 space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-semibold text-slate-900">
                {item.question}
              </summary>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="kontakt"
        className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8"
      >
        <h2 className="text-2xl font-bold text-slate-900">
          Book gratis strategisamtale
        </h2>
        <p className="mt-2 text-slate-600">
          Fyll ut skjemaet, sa kontakter vi deg innen 1 arbeidsdag.
        </p>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Navn
            <input
              type="text"
              name="name"
              required
              className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
              placeholder="Ola Nordmann"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Firmanavn
            <input
              type="text"
              name="company"
              required
              className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
              placeholder="Eksempel Bygg AS"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            E-post
            <input
              type="email"
              name="email"
              required
              className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
              placeholder="post@firma.no"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Telefon
            <input
              type="tel"
              name="phone"
              required
              className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
              placeholder="+47 400 00 000"
            />
          </label>
          <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-slate-700">
            Hva trenger du hjelp til?
            <textarea
              name="message"
              rows={5}
              className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
              placeholder="Kort beskrivelse av dagens utfordringer i regnskapet."
            />
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Send foresporsel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
