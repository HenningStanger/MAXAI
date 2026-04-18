type Props = {
  label: string;
  title: string;
  text: string;
  trustPoints: string[];
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
};

export function HeroSection(props: Props) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-white shadow-sm md:p-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">{props.label}</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">{props.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">{props.text}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {props.trustPoints.map((point) => (
          <span
            key={point}
            className="rounded-full border border-blue-200/80 bg-blue-800/30 px-3 py-1 text-sm font-medium text-blue-50"
          >
            {point}
          </span>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={props.primaryHref}
          className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-900 transition hover:bg-blue-50"
        >
          {props.primaryCta}
        </a>
        <a
          href={props.secondaryHref}
          className="rounded-xl border border-blue-200 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          {props.secondaryCta}
        </a>
      </div>
    </section>
  );
}
