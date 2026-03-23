"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchBar, type SearchSuggestion } from "./SearchBar";
import { ToplineRotator } from "./ToplineRotator";

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

function SocialIcon({
  name,
  className,
}: {
  name: "instagram" | "facebook" | "x";
  className?: string;
}) {
  const common = className ?? "h-4 w-4";
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path
          d="M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9A4.75 4.75 0 0 1 16.5 21.25h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M12 16.25A4.25 4.25 0 1 0 12 7.75a4.25 4.25 0 0 0 0 8.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M17 6.5h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path
          d="M13.5 21v-8h2.7l.4-3H13.5V8.2c0-.9.3-1.5 1.6-1.5h1.6V4c-.8-.1-1.7-.2-2.7-.2-2.6 0-4.4 1.6-4.4 4.6V10H7v3h2.6v8h3.9Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
      <path
        d="M4 4l7.6 8.6L4.6 20H7l5.6-5.9L17.7 20H20l-7.9-9L19.4 4H17l-5 5.2L7.4 4H4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader({
  topCenterMessage,
  topMessages,
  navItems,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  searchSuggestions,
  onSelectSuggestion,
}: {
  topCenterMessage: string;
  topMessages: string[];
  navItems: Array<{ label: string; href: string }>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  searchSuggestions: SearchSuggestion[];
  onSelectSuggestion: (suggestionId: string) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-lime-400">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2 text-zinc-900">
          <div className="min-w-0">
            <ToplineRotator messages={topMessages} respectReducedMotion={false} />
          </div>

          <div className="hidden items-center justify-center md:flex">
            <span className="inline-flex h-7 items-center rounded-full bg-zinc-900/10 px-3 text-[11px] font-extrabold uppercase tracking-wide text-zinc-900 ring-1 ring-white/40">
              <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900/15 text-[10px] font-black">
                1
              </span>
              {topCenterMessage}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Link
              href="#"
              aria-label="Instagram"
              title="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/50 text-zinc-900 shadow-sm ring-1 ring-white/60 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
            >
              <SocialIcon name="instagram" className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              aria-label="Facebook"
              title="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/50 text-zinc-900 shadow-sm ring-1 ring-white/60 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
            >
              <SocialIcon name="facebook" className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              aria-label="X"
              title="X"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/50 text-zinc-900 shadow-sm ring-1 ring-white/60 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
            >
              <SocialIcon name="x" className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`bg-white ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="border-b border-zinc-200">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo-TDP-394@3x.webp"
                alt="Taller del Patinete"
                width={320}
                height={72}
                className="h-10 w-auto max-w-[220px] object-contain sm:h-12 sm:max-w-[280px]"
                priority
              />
              <span className="sr-only">Taller del Patinete</span>
            </Link>

            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
              suggestions={searchSuggestions}
              onSelectSuggestion={onSelectSuggestion}
              containerClassName="ml-auto hidden w-full max-w-xl items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 shadow-sm md:block"
              inputClassName="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
              leftIcon={
                <HeaderIcon name="search" className="h-5 w-5 text-zinc-500" />
              }
            />

            <div className="ml-auto flex items-center gap-3 md:ml-3">
              <Link
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-800 hover:bg-zinc-50"
                aria-label="Cuenta"
              >
                <HeaderIcon name="user" />
              </Link>
              <Link
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-800 hover:bg-zinc-50"
                aria-label="Carrito"
              >
                <HeaderIcon name="cart" />
              </Link>
            </div>
          </div>
        </div>

        <nav className="border-b border-zinc-200 bg-white" aria-label="Navegación principal">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="flex items-center gap-4 overflow-x-auto py-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="shrink-0 text-xs font-bold uppercase tracking-wide text-zinc-700 hover:text-zinc-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
