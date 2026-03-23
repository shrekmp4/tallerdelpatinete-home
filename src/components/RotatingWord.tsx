"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function RotatingWord({
  words,
  intervalMs = 2400,
  durationMs = 420,
  respectReducedMotion = true,
  className,
}: {
  words: string[];
  intervalMs?: number;
  durationMs?: number;
  respectReducedMotion?: boolean;
  className?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const motionDisabled = respectReducedMotion && prefersReducedMotion;

  const [index, setIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const itemHeightEm = 1.12;
  const maxCh = Math.max(1, ...words.map((w) => w.length));

  const loop = words.length > 0 ? [...words, words[0] ?? ""] : [""];
  const wordsKey = words.join("\u0000");

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setIndex(0);
      setTransitionEnabled(true);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [wordsKey]);

  useEffect(() => {
    if (motionDisabled || words.length < 2) return;
    const t = window.setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, intervalMs);
    return () => window.clearTimeout(t);
  }, [motionDisabled, words.length, intervalMs, index]);

  const onTransitionEnd = () => {
    if (words.length < 2) return;
    if (index !== words.length) return;

    setTransitionEnabled(false);
    setIndex(0);
    window.requestAnimationFrame(() => setTransitionEnabled(true));
  };

  if (motionDisabled || words.length < 2) {
    return <span className={className}>{words[0] ?? ""}</span>;
  }

  return (
    <span className={className}>
      <span
        className="relative inline-block h-[1.12em] overflow-hidden align-[-0.15em]"
        style={{ minWidth: `${maxCh}ch` }}
      >
        <span
          className="flex flex-col"
          style={{
            transform: `translateY(-${index * itemHeightEm}em)`,
            transitionProperty: "transform",
            transitionDuration: transitionEnabled ? `${durationMs}ms` : "0ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {loop.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-flex h-[1.12em] items-center">
              {w}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
