/**
 * A seamless, slowly drifting wave used as the seam between sections. Colour
 * comes from `text-*` on the wrapper (it fills with currentColor), so the same
 * divider works against any background.
 *
 * Each layer is a 200%-wide strip holding two identical periods; sliding it by
 * half its own width lands exactly on the start, so the loop has no seam.
 */
const PATH =
  "M0,60 C240,10 480,110 720,60 C960,10 1200,110 1440,60 C1680,10 1920,110 2160,60 C2400,10 2640,110 2880,60 L2880,121 L0,121 Z";

function Layer({ className }: { className: string }) {
  return (
    <div className={`absolute -inset-y-px left-0 w-[200%] ${className}`}>
      <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="block h-full w-full">
        <path d={PATH} fill="currentColor" />
      </svg>
    </div>
  );
}

export default function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-10 sm:h-14 lg:h-20 w-full overflow-x-clip pointer-events-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
    >
      <Layer className="animate-wave-slow opacity-40" />
      <Layer className="animate-wave" />
    </div>
  );
}
