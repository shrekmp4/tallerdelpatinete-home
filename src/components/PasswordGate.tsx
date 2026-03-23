"use client";

import { useEffect, useMemo, useState } from "react";

export function PasswordGate({
  password = "123321",
  storageKey = "srkdev_demo_access",
  children,
}: {
  password?: string;
  storageKey?: string;
  children: React.ReactNode;
}) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rafs: number[] = [];
    try {
      const stored = window.localStorage.getItem(storageKey);
      rafs.push(
        window.requestAnimationFrame(() => {
          setIsUnlocked(stored === "1");
        })
      );
    } catch {
      rafs.push(
        window.requestAnimationFrame(() => {
          setIsUnlocked(false);
        })
      );
    }
    return () => rafs.forEach((raf) => window.cancelAnimationFrame(raf));
  }, [storageKey]);

  const isLocked = !isUnlocked;

  const disclaimer = useMemo(
    () =>
      "El diseño es de SRKDEV.ES. Su difusión u utilización en cualquier página web deberá ser consultada.",
    []
  );

  const onUnlock = () => {
    if (input.trim() !== password) {
      setError("Contraseña incorrecta.");
      return;
    }
    setError(null);
    setIsUnlocked(true);
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {}
  };

  return (
    <div className="relative min-h-full">
      <div className={isLocked ? "pointer-events-none select-none blur-xl" : ""}>
        {children}
      </div>

      {isLocked ? (
        <div className="fixed inset-0 z-[999] grid place-items-center bg-zinc-950/45 px-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
            <div className="text-center">
              <div className="text-xs font-extrabold uppercase tracking-wide text-white/80">
                Acceso restringido
              </div>
              <div className="mt-2 text-balance text-2xl font-extrabold uppercase tracking-tight">
                Taller del Patinete (demo)
              </div>
              <div className="mt-3 text-sm font-semibold leading-6 text-white/80">
                {disclaimer}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="srkdev-password"
                className="text-xs font-extrabold uppercase tracking-wide text-white/80"
              >
                Contraseña
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="srkdev-password"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onUnlock();
                  }}
                  type="password"
                  className="h-11 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white outline-none placeholder:text-white/45 focus-visible:ring-2 focus-visible:ring-white/40"
                  placeholder="Introduce la contraseña"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={onUnlock}
                  className="h-11 shrink-0 rounded-xl bg-lime-400 px-4 text-xs font-extrabold uppercase tracking-wide text-zinc-950 hover:bg-lime-300"
                >
                  Entrar
                </button>
              </div>
              {error ? (
                <div className="mt-2 text-sm font-semibold text-red-200">{error}</div>
              ) : null}

            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
