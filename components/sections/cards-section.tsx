type Props = {
  items: string[];
  text: string;
};

export function CardsSection({ items, text }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article key={item} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-base font-semibold text-slate-900">{item}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
        </article>
      ))}
    </section>
  );
}
