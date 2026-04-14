import { type ReactNode } from "react";
import { SectionContainer } from "@/app/_components/primitives/section-container";

type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageShellProps = {
  title: string;
  effectiveDate: string;
  subtitle: string;
  sections: LegalSection[];
};

function slugToAnchor(id: string) {
  return id;
}

export function LegalPageShell({
  title,
  effectiveDate,
  subtitle,
  sections,
}: LegalPageShellProps) {
  return (
    <>
      <SectionContainer className="pt-12 pb-0">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: {effectiveDate}
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            {subtitle}
          </p>

          <nav className="mt-8 rounded-[var(--radius-lg)] border border-border bg-muted/50 p-6">
            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Table of Contents
            </h2>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${slugToAnchor(section.id)}`}
                    className="font-medium text-primary-500 underline decoration-primary-300 underline-offset-2 transition-colors hover:text-primary-600 hover:decoration-primary-500"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-8">
        <article className="mx-auto max-w-3xl">
          {sections.map((section) => (
            <section key={section.id} id={slugToAnchor(section.id)}>
              <h2 className="mt-12 mb-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </article>
      </SectionContainer>
    </>
  );
}
