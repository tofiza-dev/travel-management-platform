"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Click-to-copy coupon code. Falls back to a no-op if the clipboard is unavailable. */
export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure origin, permissions): the code is still on screen to read.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50 px-4 py-2.5 text-left transition-colors hover:border-brand-500 hover:bg-brand-100"
      aria-label={copied ? `Code ${code} copied` : `Copy code ${code}`}
    >
      <span className="font-mono text-base font-bold tracking-[0.18em] text-brand-700">{code}</span>
      <span className="flex items-center gap-1 text-xs font-semibold text-brand-600">
        {copied ? (
          <Check size={14} className="i-popin" aria-hidden="true" />
        ) : (
          <Copy size={14} className="ih-pop" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy"}
      </span>
      <span role="status" className="sr-only">
        {copied ? `Code ${code} copied to clipboard` : ""}
      </span>
    </button>
  );
}
