"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export type SearchSuggestion = {
  id: string;
  title: string;
  meta: string;
  price: string;
};

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Buscar...",
  suggestions,
  onSelectSuggestion,
  inputClassName,
  containerClassName,
  leftIcon,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  suggestions: SearchSuggestion[];
  onSelectSuggestion: (suggestionId: string) => void;
  inputClassName?: string;
  containerClassName?: string;
  leftIcon?: React.ReactNode;
}) {
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const blurTimer = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const hasQuery = value.trim().length > 0;
  const showList = isOpen && hasQuery;

  const items = useMemo(
    () => (suggestions.length > 6 ? suggestions.slice(0, 6) : suggestions),
    [suggestions]
  );

  useEffect(() => {
    return () => {
      if (blurTimer.current !== null) window.clearTimeout(blurTimer.current);
    };
  }, []);

  return (
    <div className={`relative ${containerClassName ?? ""}`}>
      <div className="flex w-full items-center gap-2">
        {leftIcon}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            if (blurTimer.current !== null) window.clearTimeout(blurTimer.current);
            blurTimer.current = window.setTimeout(() => setIsOpen(false), 120);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit?.();
              setIsOpen(false);
              inputRef.current?.blur();
            }
            if (e.key === "Escape") {
              setIsOpen(false);
              inputRef.current?.blur();
            }
          }}
          className={inputClassName ?? ""}
          placeholder={placeholder}
          aria-label="Buscar"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listboxId}
          aria-autocomplete="list"
        />
      </div>

      {showList ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg"
        >
          {items.length > 0 ? (
            <div className="max-h-72 overflow-auto">
              {items.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="option"
                  aria-selected={false}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-zinc-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onSelectSuggestion(s.id);
                    setIsOpen(false);
                    inputRef.current?.blur();
                  }}
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-extrabold uppercase tracking-tight text-zinc-950">
                      {s.title}
                    </div>
                    <div className="mt-0.5 truncate text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      {s.meta}
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-extrabold text-zinc-900">
                    {s.price}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm font-semibold text-zinc-600">
              Sin resultados
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
