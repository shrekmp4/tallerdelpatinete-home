"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Stage = "idle" | "prepare" | "animate";

export function ToplineRotator({
  messages,
  intervalMs = 2400,
  durationMs = 420,
  respectReducedMotion = true,
}: {
  messages: string[];
  intervalMs?: number;
  durationMs?: number;
  respectReducedMotion?: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const motionDisabled = respectReducedMotion && prefersReducedMotion;
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (motionDisabled || messages.length < 2) return;
    if (isPaused) return;
    if (stage !== "idle") return;

    const t = window.setTimeout(() => {
      setNextIndex((activeIndex + 1) % messages.length);
      setStage("prepare");
    }, intervalMs);

    return () => window.clearTimeout(t);
  }, [motionDisabled, messages.length, stage, intervalMs, activeIndex, isPaused]);

  useEffect(() => {
    if (stage !== "prepare") return;
    const raf = window.requestAnimationFrame(() => setStage("animate"));
    return () => window.cancelAnimationFrame(raf);
  }, [stage]);

  useEffect(() => {
    if (stage !== "animate") return;
    const t = window.setTimeout(() => {
      if (nextIndex !== null) setActiveIndex(nextIndex);
      setNextIndex(null);
      setStage("idle");
    }, durationMs);

    return () => window.clearTimeout(t);
  }, [stage, durationMs, nextIndex]);

  const activeMessage = messages[activeIndex] ?? "";
  const incomingMessage = nextIndex !== null ? messages[nextIndex] ?? "" : "";

  const pill = (text: string) => (
    <span className="inline-flex h-7 items-center rounded-full bg-white/60 px-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-900 shadow-sm ring-1 ring-white/50 backdrop-blur-sm">
      <span className="mr-2 inline-flex h-1.5 w-1.5 rounded-full bg-zinc-900/70 ring-2 ring-white/60" />
      {text}
    </span>
  );

  return (
    <div
      className="min-w-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="sr-only">{messages.join(". ")}</span>
      <div className="relative h-7 overflow-hidden" aria-hidden="true">
        {motionDisabled || messages.length < 2 ? (
          <div className="flex h-7 items-center">
            {pill(activeMessage)}
          </div>
        ) : stage === "idle" ? (
          <div className="flex h-7 items-center">
            {pill(activeMessage)}
          </div>
        ) : (
          <>
            <div
              className={`absolute inset-0 flex items-center transition-all duration-[420ms] ease-out ${
                stage === "prepare"
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0"
              }`}
              style={{ transitionDuration: `${durationMs}ms` }}
            >
              {pill(activeMessage)}
            </div>
            <div
              className={`absolute inset-0 flex items-center transition-all duration-[420ms] ease-out ${
                stage === "prepare"
                  ? "translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
              style={{ transitionDuration: `${durationMs}ms` }}
            >
              {pill(incomingMessage)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
