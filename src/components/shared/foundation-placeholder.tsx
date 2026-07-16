type FoundationPlaceholderProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export function FoundationPlaceholder({
  eyebrow,
  title,
  description,
}: FoundationPlaceholderProps) {
  return (
    <main className="viewport-app grid w-full place-items-center px-6 py-12">
      <section
        className="w-full max-w-xl rounded-2xl border bg-surface p-8 text-center shadow-subtle sm:p-10"
        aria-labelledby="foundation-title"
      >
        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
        <h1
          id="foundation-title"
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-secondary">
          {description}
        </p>
      </section>
    </main>
  );
}
