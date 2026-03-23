"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { usePrefersReducedMotion } from "../components/usePrefersReducedMotion";

const navItems = [
  { label: "CATÁLOGO", href: "#catalogo" },
  { label: "CHOLLOS", href: "#" },
  { label: "INFANTIL", href: "#" },
  { label: "PATINETES", href: "#" },
  { label: "VINILOS", href: "#" },
  { label: "TUNEA TU PATINETE", href: "#" },
  { label: "RECAMBIOS MARCAS", href: "#" },
  { label: "RUEDAS", href: "#" },
  { label: "REPUESTOS", href: "#" },
  { label: "MANILLARES MTB", href: "#" },
];

const topMessages = [
  "ENVÍO 24H GRATIS DESDE 50€",
  "RECAMBIOS Y TALLER EXPRESS",
  "SOPORTE POR WHATSAPP",
];

const heroWords = ["Productos", "Vinilos", "Patinetes", "Servicios"];
const topCenterMessage = "TIENDA #1 EN ESPAÑA";

type HeroOffer = {
  id: string;
  kicker: string;
  title: string;
  accent: string;
  price: string;
  note: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  theme: {
    accentTextClass: string;
    kickerBgClass: string;
    kickerTextClass: string;
    primaryCtaClass: string;
    backgroundGradient: string;
    glowLeft: string;
    glowRight: string;
  };
};

type Tile = {
  title: string;
  subtitle: string;
  href: string;
  backgroundImage: string;
  featured?: boolean;
  size?: "hero" | "wide" | "normal";
  badge?: string;
  icon?: "truck" | "bolt" | "sparkles" | "palette" | "tag";
  highlights?: string[];
  cta?: string;
};

function TileIcon({ name }: { name: NonNullable<Tile["icon"]> }) {
  const common = "h-5 w-5";
  if (name === "truck") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path
          d="M3 6.5h11v10H3v-10Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M14 9.5h4.2l2.8 3.2V16.5H14V9.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M7 18.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M18 18.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    );
  }
  if (name === "bolt") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path
          d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "palette") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path
          d="M12 3a9 9 0 1 0 0 18h2.2a2.8 2.8 0 0 0 0-5.6H13"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M8.3 10.2h.01M12 8.5h.01M15.7 10.2h.01M10 14.7h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "tag") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path
          d="M3.5 12.2V4.5h7.7l9.3 9.3a2 2 0 0 1 0 2.8l-3 3a2 2 0 0 1-2.8 0L3.5 12.2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M7.8 7.8h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
      <path
        d="M12 2l1.7 6.1 6.3.1-5.1 3.7 1.9 6-4.8-3.2-4.8 3.2 1.9-6L4 8.2l6.3-.1L12 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const heroOffers: HeroOffer[] = [
  {
    id: "ecoxtrem-m41",
    kicker: "Patinete destacado",
    title: "Ecoxtrem",
    accent: "M41",
    price: "895€",
    note: "Envío 24h · Stock limitado",
    primaryCta: { label: "Ver categorías", href: "#categorias" },
    secondaryCta: { label: "Ver patinetes", href: "#" },
    theme: {
      accentTextClass: "text-lime-400",
      kickerBgClass: "bg-lime-400",
      kickerTextClass: "text-zinc-950",
      primaryCtaClass: "bg-lime-400 text-zinc-950 hover:bg-lime-300",
      backgroundGradient:
        "linear-gradient(110deg,rgba(163,230,53,.26),rgba(0,0,0,0),rgba(163,230,53,.18))",
      glowLeft: "rgba(163,230,53,.20)",
      glowRight: "rgba(255,255,255,.10)",
    },
  },
  {
    id: "matricula-dgt",
    kicker: "Servicio destacado",
    title: "Matrícula",
    accent: "DGT",
    price: "24,99€",
    note: "Gestión online · Legal y rápido",
    primaryCta: { label: "Ver servicio", href: "#" },
    secondaryCta: { label: "Ver categorías", href: "#categorias" },
    theme: {
      accentTextClass: "text-sky-300",
      kickerBgClass: "bg-sky-400",
      kickerTextClass: "text-zinc-950",
      primaryCtaClass: "bg-sky-400 text-zinc-950 hover:bg-sky-300",
      backgroundGradient:
        "linear-gradient(110deg,rgba(59,130,246,.26),rgba(0,0,0,0),rgba(56,189,248,.16))",
      glowLeft: "rgba(59,130,246,.22)",
      glowRight: "rgba(56,189,248,.14)",
    },
  },
];

function HeroOfferCarousel({
  offers,
  intervalMs = 5200,
  respectReducedMotion = true,
  after,
}: {
  offers: HeroOffer[];
  intervalMs?: number;
  respectReducedMotion?: boolean;
  after?: React.ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const motionDisabled = respectReducedMotion && prefersReducedMotion;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (motionDisabled || offers.length < 2) return;
    const t = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % offers.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [motionDisabled, offers.length, intervalMs]);

  const offer = offers[activeIndex] ?? offers[0];
  if (!offer) return null;

  return (
    <div className="relative">
      <span className="sr-only">
        {offers.map((o) => `${o.kicker}: ${o.title} ${o.accent}, ${o.price}.`).join(" ")}
      </span>

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`bg-${offer.id}`}
            className="absolute inset-0"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundImage: offer.theme.backgroundGradient }}
            />
            <div
              className="absolute -left-32 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: offer.theme.glowLeft }}
            />
            <div
              className="absolute -right-40 top-10 h-[26rem] w-[26rem] rounded-full blur-3xl"
              style={{ backgroundColor: offer.theme.glowRight }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-16 sm:py-20">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`content-${offer.id}`}
              aria-hidden="true"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.9 }}
              layout
            >
              <div
                className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ${offer.theme.kickerBgClass} ${offer.theme.kickerTextClass}`}
              >
                {offer.kicker}
              </div>

              <h1 className="mt-4 text-balance text-5xl font-extrabold uppercase tracking-tight text-white sm:text-7xl">
                {offer.title}{" "}
                <span className={offer.theme.accentTextClass}>{offer.accent}</span>
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <span className="rounded-md bg-white px-3 py-2 text-lg font-extrabold text-zinc-950 sm:text-2xl">
                  {offer.price}
                </span>
                <span className="text-sm font-semibold text-zinc-200">{offer.note}</span>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={offer.primaryCta.href}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-wide transition ${offer.theme.primaryCtaClass}`}
                >
                  {offer.primaryCta.label}
                </Link>
                <Link
                  href={offer.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-white/10"
                >
                  {offer.secondaryCta.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {after}
        </div>
      </div>
    </div>
  );
}

function InlineRotatingText({
  texts,
  intervalMs = 2400,
  respectReducedMotion = true,
  className,
  containerClassName,
}: {
  texts: string[];
  intervalMs?: number;
  respectReducedMotion?: boolean;
  className?: string;
  containerClassName?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const motionDisabled = respectReducedMotion && prefersReducedMotion;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (motionDisabled || texts.length < 2) return;
    const t = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % texts.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [motionDisabled, texts.length, intervalMs]);

  const text = texts[activeIndex] ?? texts[0] ?? "";
  const maxCh = Math.max(1, ...texts.map((t) => t.length));

  if (motionDisabled || texts.length < 2) {
    return (
      <span
        className={`inline-block text-left ${containerClassName ?? ""} ${className ?? ""}`}
        style={{ minWidth: `${maxCh}ch` }}
      >
        {text}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block align-baseline text-left ${containerClassName ?? ""}`}
      style={{ minWidth: `${maxCh}ch` }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={text}
          className={`inline-block ${className ?? ""}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function stableStringHash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const mockupPalettes = [
  [
    "linear-gradient(135deg, rgba(163,230,53,.95), rgba(16,185,129,.85), rgba(14,165,233,.75))",
    "linear-gradient(135deg, rgba(34,211,238,.92), rgba(99,102,241,.85), rgba(236,72,153,.70))",
    "linear-gradient(135deg, rgba(250,204,21,.92), rgba(251,113,133,.78), rgba(99,102,241,.72))",
  ],
  [
    "linear-gradient(135deg, rgba(56,189,248,.92), rgba(59,130,246,.86), rgba(99,102,241,.74))",
    "linear-gradient(135deg, rgba(163,230,53,.92), rgba(250,204,21,.82), rgba(251,113,133,.70))",
    "linear-gradient(135deg, rgba(52,211,153,.92), rgba(34,211,238,.80), rgba(59,130,246,.70))",
  ],
  [
    "linear-gradient(135deg, rgba(148,163,184,.92), rgba(99,102,241,.82), rgba(15,23,42,.85))",
    "linear-gradient(135deg, rgba(163,230,53,.90), rgba(101,163,13,.88), rgba(20,83,45,.88))",
    "linear-gradient(135deg, rgba(244,63,94,.84), rgba(250,204,21,.78), rgba(163,230,53,.82))",
  ],
] as const;

type Testimonial = {
  quote: string;
  name: string;
  meta: string;
  rating: 4 | 5;
  productId: string;
  productLabel: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Recogida en casa y al día siguiente lo tenía listo. Rápidos, claros y con buen precio.",
    name: "Laura M.",
    meta: "Servicio de taller",
    rating: 5,
    productId: "guardabarros-trasero",
    productLabel: "Guardabarros trasero",
  },
  {
    quote:
      "Pedí varios recambios y llegó perfecto. Me asesoraron por WhatsApp y acertaron.",
    name: "Sergio R.",
    meta: "Recambios y accesorios",
    rating: 5,
    productId: "pastillas-freno-pack",
    productLabel: "Pastillas de freno (pack)",
  },
  {
    quote:
      "El vinilo quedó brutal. Se nota que cuidan el detalle y el acabado final.",
    name: "Álvaro G.",
    meta: "Vinilos",
    rating: 5,
    productId: "vinilo-protector-set",
    productLabel: "Vinilo protector (set)",
  },
  {
    quote:
      "Me ayudaron a elegir ruedas y frenos compatibles. Atención de 10, sin líos.",
    name: "Marta P.",
    meta: "Asesoramiento",
    rating: 5,
    productId: "neumatico-10-tubeless",
    productLabel: "Neumático 10” tubeless",
  },
  {
    quote:
      "Todo correcto y rápido. La web se ve limpia y el catálogo es fácil de navegar.",
    name: "David S.",
    meta: "Compra online",
    rating: 4,
    productId: "cargador-42v-rapido",
    productLabel: "Cargador 42V rápido",
  },
  {
    quote:
      "Muy buena comunicación y entrega puntual. Repetiré seguro.",
    name: "Javi C.",
    meta: "Envíos",
    rating: 5,
    productId: "kit-luces-led",
    productLabel: "Kit luces LED",
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${filled ? "text-lime-400" : "text-zinc-300"}`}
      aria-hidden="true"
    >
      <path
        d="M12 2l2.9 6.2 6.8.6-5.1 4.4 1.6 6.6L12 16.4 5.8 19.8l1.6-6.6L2.3 8.8l6.8-.6L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TestimonialsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const motionDisabled = prefersReducedMotion;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (motionDisabled || testimonials.length < 2) return;
    const t = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(t);
  }, [motionDisabled]);

  return (
    <section
      aria-label="Qué dicen nuestros clientes"
      className="border-t border-zinc-200 bg-zinc-50"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-balance text-3xl font-extrabold uppercase tracking-tight text-zinc-950">
              Qué dicen nuestros clientes
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold text-zinc-700">
              Opiniones reales, servicio rápido y asesoramiento claro.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-zinc-900 ring-1 ring-zinc-200">
            <span className="text-zinc-950">4.9</span>
            <span className="text-zinc-500">/ 5</span>
            <span className="mx-2 h-4 w-px bg-zinc-200" />
            <span className="text-zinc-700">+1.000 reseñas</span>
          </div>
        </div>

        <div className="mt-8 hidden gap-4 md:grid md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => {
            const idx = (activeIndex + i) % testimonials.length;
            const current = testimonials[idx] ?? testimonials[0];
            if (!current) return null;
            const isActive = i === 1 && !motionDisabled;

            return (
              <motion.div
                key={`${current.name}-${idx}`}
                className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                animate={{
                  y: isActive ? -2 : 0,
                  boxShadow: isActive
                    ? "0 18px 45px rgba(0,0,0,0.10)"
                    : "0 1px 2px rgba(0,0,0,0.04)",
                }}
                transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.9 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <StarIcon key={s} filled={s < current.rating} />
                    ))}
                  </div>
                  <span className="rounded-full bg-lime-400/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-zinc-950 ring-1 ring-lime-400/30">
                    {current.meta}
                  </span>
                </div>

                <div className="mt-4 text-sm font-semibold leading-6 text-zinc-800">
                  “{current.quote}”
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="text-xs font-extrabold uppercase tracking-wide text-zinc-950">
                    {current.name}
                  </div>
                  <Link
                    href={`#product-${current.productId}`}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-zinc-900 hover:bg-zinc-50"
                  >
                    Producto <span className="text-zinc-600">→</span>
                    <span className="sr-only">{current.productLabel}</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 md:hidden">
          {testimonials.slice(0, 6).map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="w-[86%] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} filled={s < t.rating} />
                  ))}
                </div>
                <span className="rounded-full bg-lime-400/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-zinc-950 ring-1 ring-lime-400/30">
                  {t.meta}
                </span>
              </div>
              <div className="mt-4 text-sm font-semibold leading-6 text-zinc-800">
                “{t.quote}”
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="text-xs font-extrabold uppercase tracking-wide text-zinc-950">
                  {t.name}
                </div>
                <Link
                  href={`#product-${t.productId}`}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-zinc-900 hover:bg-zinc-50"
                >
                  Producto <span className="text-zinc-600">→</span>
                  <span className="sr-only">{t.productLabel}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductMockupSlider({
  id,
  title,
  intervalMs = 3200,
  respectReducedMotion = true,
}: {
  id: string;
  title: string;
  intervalMs?: number;
  respectReducedMotion?: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const motionDisabled = respectReducedMotion && prefersReducedMotion;
  const palettes = mockupPalettes[stableStringHash(id) % mockupPalettes.length] ?? mockupPalettes[0];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (motionDisabled || palettes.length < 2) return;
    if (isPaused) return;
    const t = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % palettes.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [motionDisabled, palettes.length, intervalMs, isPaused]);

  const gradient = palettes[activeIndex] ?? palettes[0] ?? "linear-gradient(135deg,#e4e4e7,#d4d4d8)";

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-black/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="sr-only">Vista previa de colores para {title}</span>

      <div className="pointer-events-none absolute inset-0 opacity-80">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${id}-${activeIndex}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundImage: gradient }}
            aria-hidden="true"
          />
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-white blur-3xl" />
        <div className="absolute -right-28 top-10 h-60 w-60 rounded-full bg-black/30 blur-3xl" />
      </div>

      <div className="relative flex h-40 items-end p-3">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-zinc-950 ring-1 ring-white/70 backdrop-blur-sm">
            Colores
            <span className="text-zinc-950/70">{activeIndex + 1}/{palettes.length}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {palettes.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ring-1 ring-white/70 ${
                  i === activeIndex ? "bg-zinc-950/80" : "bg-white/60"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const tiles = [
  {
    title: "RECOGIDA Y ENTREGA",
    subtitle: "de patinetes",
    href: "#",
    backgroundImage: "linear-gradient(135deg,#A3E635 0%, #65A30D 55%, #16A34A 110%)",
    featured: true,
    size: "hero",
    badge: "A domicilio",
    icon: "truck",
    highlights: ["Recogida en tu casa", "Entrega 24/48h", "Soporte por WhatsApp"],
    cta: "Pedir recogida",
  },
  {
    title: "PATINETES ELÉCTRICOS",
    subtitle: "nuevos y reacondicionados",
    href: "#",
    backgroundImage: "linear-gradient(135deg,#A3E635 0%, #10B981 58%, #0EA5E9 110%)",
    size: "wide",
    badge: "Stock",
    icon: "bolt",
    cta: "Ver modelos",
  },
  {
    title: "TUNEA TU PATINETE",
    subtitle: "upgrades y potencia",
    href: "#",
    backgroundImage: "linear-gradient(135deg,#A3E635 0%, #06B6D4 55%, #2563EB 115%)",
    size: "normal",
    badge: "Taller",
    icon: "sparkles",
    cta: "Ver upgrades",
  },
  {
    title: "ACCESORIOS COMPETICIÓN",
    subtitle: "alto rendimiento",
    href: "#",
    backgroundImage: "linear-gradient(135deg,#A3E635 0%, #6366F1 60%, #0F172A 140%)",
    size: "normal",
    badge: "Pro",
    icon: "tag",
    cta: "Ver accesorios",
  },
  {
    title: "VINILOS",
    subtitle: "personaliza tu estilo",
    href: "#",
    backgroundImage: "linear-gradient(135deg,#A3E635 0%, #FACC15 52%, #FB7185 110%)",
    size: "normal",
    badge: "Custom",
    icon: "palette",
    cta: "Ver vinilos",
  },
] satisfies Tile[];

const catalog = [
  {
    id: "neumatico-10-tubeless",
    imageSrc: "/mockups/camera.svg",
    title: "Neumático 10” tubeless",
    meta: "Ruedas",
    price: "19,90 €",
    badge: "Top ventas",
    href: "#",
  },
  {
    id: "pastillas-freno-pack",
    imageSrc: "/mockups/camera.svg",
    title: "Pastillas freno (pack)",
    meta: "Frenos",
    price: "9,90 €",
    badge: "Oferta",
    href: "#",
  },
  {
    id: "camara-10-reforzada",
    imageSrc: "/mockups/camera.svg",
    title: "Cámara 10” reforzada",
    meta: "Ruedas",
    price: "7,90 €",
    badge: "Nuevo",
    href: "#",
  },
  {
    id: "cargador-42v-rapido",
    imageSrc: "/mockups/camera.svg",
    title: "Cargador 42V rápido",
    meta: "Electricidad",
    price: "34,90 €",
    badge: "24h",
    href: "#",
  },
  {
    id: "disco-freno-140mm",
    imageSrc: "/mockups/camera.svg",
    title: "Disco freno 140mm",
    meta: "Frenos",
    price: "12,50 €",
    badge: "Compatible",
    href: "#",
  },
  {
    id: "kit-luces-led",
    imageSrc: "/mockups/camera.svg",
    title: "Kit luces LED",
    meta: "Accesorios",
    price: "14,90 €",
    badge: "Visible",
    href: "#",
  },
  {
    id: "guardabarros-trasero",
    imageSrc: "/mockups/camera.svg",
    title: "Guardabarros trasero",
    meta: "Carrocería",
    price: "11,90 €",
    badge: "Repuesto",
    href: "#",
  },
  {
    id: "vinilo-protector-set",
    imageSrc: "/mockups/camera.svg",
    title: "Vinilo protector (set)",
    meta: "Vinilos",
    price: "16,90 €",
    badge: "Personaliza",
    href: "#",
  },
];

function HeaderIcon({
  name,
  className,
}: {
  name: "search" | "user" | "cart";
  className?: string;
}) {
  const common = className ?? "h-5 w-5";
  if (name === "search") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path
          d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M16.2 16.2 21 21"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path
          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M4.5 21a7.5 7.5 0 0 1 15 0"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
      <path
        d="M6.5 8.5h14l-1.5 12h-11L6.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 10V7.75a3 3 0 0 1 6 0V10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = useMemo(() => normalizeText(searchQuery), [searchQuery]);

  const filteredCatalog = useMemo(() => {
    if (normalizedQuery.length === 0) return catalog;
    return catalog.filter((item) => {
      const hay = normalizeText(`${item.title} ${item.meta} ${item.badge}`);
      return hay.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const suggestions = useMemo(() => {
    if (normalizedQuery.length === 0) return [];
    return filteredCatalog.map((i) => ({
      id: i.id,
      title: i.title,
      meta: i.meta,
      price: i.price,
    }));
  }, [filteredCatalog, normalizedQuery]);

  const scrollToCatalog = () => {
    const el = document.querySelector("#catalogo");
    if (el instanceof HTMLElement) el.scrollIntoView({ behavior: "smooth" });
  };

  const onSelectSuggestion = (suggestionId: string) => {
    const productEl = document.getElementById(`product-${suggestionId}`);
    if (productEl) {
      productEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    scrollToCatalog();
  };

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-950">
      <SiteHeader
        topCenterMessage={topCenterMessage}
        topMessages={topMessages}
        navItems={navItems}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={scrollToCatalog}
        searchSuggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
      />

      <main>
        <section aria-label="Banner principal" className="bg-zinc-950">
          <HeroOfferCarousel
            offers={heroOffers}
            intervalMs={4200}
            respectReducedMotion={false}
            after={
              <div className="mt-8 md:hidden">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <HeaderIcon name="search" className="h-5 w-5 text-white/70" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") scrollToCatalog();
                    }}
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
                    placeholder="Buscar..."
                    aria-label="Buscar"
                  />
                </div>
              </div>
            }
          />
        </section>

        <section id="categorias" className="mx-auto w-full max-w-6xl px-4 py-14">
          <div className="text-center">
            <h2 className="text-balance text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
              Tenemos los{" "}
              <span className="bg-lime-400 px-2 text-zinc-950">mejores</span>{" "}
              <span className="sr-only">
                {heroWords.map((w) => ` ${w}`).join(",").toLowerCase()}
              </span>
              <span aria-hidden="true" className="inline-flex items-center">
                <InlineRotatingText
                  texts={heroWords}
                  intervalMs={2200}
                  respectReducedMotion={false}
                  containerClassName="ml-2"
                  className="text-zinc-950 underline decoration-lime-400 decoration-2 underline-offset-4"
                />
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-700 sm:text-base">
              Patinetes, accesorios y recambios. Grande, simple y directo.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
            {tiles.map((tile) => {
              const size = tile.size ?? "normal";
              const spanClass =
                size === "hero"
                  ? "sm:col-span-2 md:col-span-6 lg:col-span-3"
                  : size === "wide"
                    ? "md:col-span-3 lg:col-span-3"
                    : "md:col-span-3 lg:col-span-2";

              const minHeightClass =
                size === "hero" ? "min-h-[240px]" : size === "wide" ? "min-h-[240px]" : "min-h-[210px]";

              return (
              <Link
                key={tile.title}
                href={tile.href}
                style={{ backgroundImage: tile.backgroundImage }}
                className={`group relative overflow-hidden rounded-2xl p-5 ring-1 ring-zinc-200/70 transition will-change-transform hover:-translate-y-0.5 hover:shadow-lg ${spanClass} ${minHeightClass}`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-25">
                  <div className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-white blur-2xl transition duration-500 group-hover:opacity-80" />
                  <div className="absolute -right-10 -bottom-12 h-40 w-40 rounded-full bg-black/30 blur-2xl transition duration-500 group-hover:opacity-60" />
                </div>
                <div className="pointer-events-none absolute -inset-24 rotate-12 opacity-0 transition duration-700 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent)] blur-xl" />
                </div>
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2">
                        {tile.badge ? (
                          <span className="rounded-full bg-white/60 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-zinc-950 ring-1 ring-white/60">
                            {tile.badge}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-3 text-[15px] font-extrabold uppercase leading-tight tracking-tight text-zinc-950">
                        {tile.title}
                      </div>
                      <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-900/80">
                        {tile.subtitle}
                      </div>
                    </div>

                    {tile.icon ? (
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/55 text-zinc-950 ring-1 ring-white/60">
                        <TileIcon name={tile.icon} />
                      </div>
                    ) : null}
                  </div>

                  {tile.highlights && tile.highlights.length > 0 ? (
                    <div className="mt-5 grid gap-2">
                      {tile.highlights.slice(0, 3).map((h) => (
                        <div
                          key={h}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-950/90"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-950/70 ring-2 ring-white/60" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-white transition group-hover:bg-zinc-900">
                    {tile.cta ?? "Ver"}
                    <span className="text-white/80">→</span>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </section>

        <section id="catalogo" className="border-t border-zinc-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-balance text-3xl font-extrabold uppercase tracking-tight">
                  Catálogo
                </h2>
                <p className="mt-2 text-sm font-semibold text-zinc-700">
                  Lo más buscado hoy en recambios y accesorios.
                </p>
              </div>
              <Link
                href="#"
                className="hidden rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-zinc-900 hover:bg-zinc-50 sm:inline"
              >
                Ver todo
              </Link>
            </div>

            {filteredCatalog.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-6 text-sm font-semibold text-zinc-700">
                No hay resultados para “{searchQuery.trim()}”.
              </div>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredCatalog.map((item) => (
                  <div
                    key={item.id}
                    id={`product-${item.id}`}
                    className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-lime-400 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-zinc-950">
                          {item.badge}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                          {item.meta}
                        </span>
                      </div>

                      <Link href={item.href} className="mt-4 block">
                        <ProductMockupSlider
                          id={item.id}
                          title={item.title}
                          intervalMs={3200}
                          respectReducedMotion={false}
                        />
                        <div className="mt-4 text-balance text-sm font-extrabold uppercase tracking-tight text-zinc-950">
                          {item.title}
                        </div>
                      </Link>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="text-base font-extrabold text-zinc-950">
                          {item.price}
                        </div>
                        <Link
                          href="#"
                          className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white hover:bg-zinc-800"
                        >
                          Añadir
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <TestimonialsSection />
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/Logo-TDP-394@3x.webp"
                alt="Taller del Patinete"
                width={320}
                height={72}
                className="h-10 w-auto max-w-[220px] object-contain sm:h-12 sm:max-w-[280px]"
              />
              <span className="sr-only">Taller del Patinete</span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wide text-zinc-700">
              <Link href="#categorias" className="hover:text-zinc-950">
                Categorías
              </Link>
              <Link href="#catalogo" className="hover:text-zinc-950">
                Catálogo
              </Link>
              <Link href="#" className="hover:text-zinc-950">
                Contacto
              </Link>
              <Link href="#" className="hover:text-zinc-950">
                Tiendas
              </Link>
            </div>
          </div>
          <div className="mt-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} Taller del Patinete
          </div>
        </div>
      </footer>
    </div>
  );
}
