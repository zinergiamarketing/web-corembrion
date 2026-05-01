"use client";

/**
 * Candado temporal de mantenimiento — CÓMO DESACTIVAR (elige uno):
 *
 * 1) Variables de entorno (recomendado en Vercel/hosting):
 *    - Quita NEXT_PUBLIC_MAINTENANCE_MODE o ponla distinta de "true"
 *    - Opcionalmente elimina MAINTENANCE_PIN si ya no la usas
 *
 * 2) Código en app/layout.tsx:
 *    - Quitar la importación de MaintenanceGate
 *    - Cambiar el body para renderizar sólo children y WhatsAppButton:
 *        <body>
 *          {children}
 *          <WhatsAppButton />
 *        </body>
 *
 * 3) Archivos que puedes eliminar por completo al quitar la función:
 *    - components/MaintenanceGate.tsx
 *    - app/api/maintenance-unlock/route.ts
 */

import { useState, useEffect, type ReactNode } from "react";

const STORAGE_KEY = "corembrion_maintenance_unlocked";

interface MaintenanceGateProps {
  enabled: boolean;
  children: ReactNode;
}

export function MaintenanceGate({ enabled, children }: MaintenanceGateProps) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setUnlocked(true);
      setReady(true);
      return;
    }
    try {
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
        setUnlocked(true);
      }
    } finally {
      setReady(true);
    }
  }, [enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[100000] flex min-h-[100dvh] items-center justify-center bg-[#0f2d56]" aria-busy="true" aria-live="polite">
        <p className="text-white/90 text-sm font-medium">Cargando…</p>
      </div>
    );
  }

  if (!unlocked) {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const digits = code.replace(/\D/g, "").slice(0, 4);
      if (digits.length !== 4) {
        setError("Ingresa un código de 4 dígitos.");
        return;
      }
      setSubmitting(true);
      try {
        const res = await fetch("/api/maintenance-unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: digits }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok) {
          localStorage.setItem(STORAGE_KEY, "1");
          setUnlocked(true);
          setCode("");
        } else {
          setError("Código incorrecto. Intenta de nuevo.");
        }
      } catch {
        setError("No se pudo verificar. Revisa tu conexión.");
      } finally {
        setSubmitting(false);
      }
    };

    const onDigitChange = (value: string) => {
      setCode(value.replace(/\D/g, "").slice(0, 4));
      setError(null);
    };

    return (
      <div
        className="fixed inset-0 z-[100000] flex min-h-[100dvh] flex-col items-center justify-center bg-[#0f2d56] px-6 py-10 text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="maintenance-title"
        aria-describedby="maintenance-desc"
      >
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-[#1a1a1a]">
          <h1 id="maintenance-title" className="text-center font-heading text-2xl font-bold text-[#1a4792] sm:text-3xl">
            Página en mantenimiento
          </h1>
          <p id="maintenance-desc" className="mt-4 text-center text-base text-gray-600">
            Introduce el código de acceso de 4 dígitos para continuar al sitio.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="maintenance-code" className="mb-2 block text-sm font-medium text-gray-700">
                Código de acceso
              </label>
              <input
                id="maintenance-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={4}
                placeholder="••••"
                value={code}
                onChange={(e) => onDigitChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-mono text-2xl tracking-[0.5em] focus:border-[#1a4792] focus:outline-none focus:ring-2 focus:ring-[#1a4792]"
                disabled={submitting}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "maintenance-error" : undefined}
              />
              {error && (
                <p id="maintenance-error" className="mt-2 text-center text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting || code.length !== 4}
              className="w-full rounded-lg bg-[#1a4792] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#153a75] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Verificando…" : "Entrar al sitio"}
            </button>
          </form>
          <p className="mt-8 text-center text-xs text-gray-400">COREMBRION</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
