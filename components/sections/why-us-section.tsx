type Item = {
  title: string;
  text: string;
};

type Props = {
  title: string;
  items: Item[];
};

export function WhyUsSection({ title, items }: Props) {
  return (
    <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
