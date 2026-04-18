type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  title: string;
  items: FaqItem[];
};

export function FaqSection({ title, items }: Props) {
  return (
    <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <details key={item.question} className="rounded-xl bg-slate-50 p-4">
            <summary className="cursor-pointer font-semibold text-slate-900">{item.question}</summary>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
