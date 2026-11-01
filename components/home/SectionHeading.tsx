import { Reveal } from "@/components/motion/Reveal";

/**
 * The eyebrow / headline / lede stack every homepage section opens with, so the
 * rhythm down the page is identical. `tone` flips the colours for dark bands.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  action,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`mb-10 lg:mb-14 flex flex-wrap items-end justify-between gap-6 ${
        align === "center" ? "justify-center text-center" : ""
      }`}
    >
      <Reveal className={align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] mb-3 flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          } ${dark ? "text-secondary-300" : "text-secondary-600"}`}
        >
          <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-secondary-300/60" : "bg-secondary-500/60"}`} />
          {eyebrow}
        </p>
        <h2
          className={`font-display text-4xl lg:text-5xl font-semibold leading-[1.05] text-balance ${
            dark ? "text-white" : "text-brand-900"
          }`}
        >
          {title}
        </h2>
        {lede && (
          <p className={`mt-4 text-base lg:text-lg leading-relaxed ${dark ? "text-brand-200" : "text-slate-600"}`}>
            {lede}
          </p>
        )}
      </Reveal>
      {action}
    </div>
  );
}
