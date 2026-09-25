import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const TURNSTILE_SITE_KEY = "0x4AAAAAAFCzhRxZCe5_Mwv4";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window { turnstile?: TurnstileApi }
}

let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    const s = existing ?? document.createElement("script");
    const check = () => (window.turnstile ? resolve() : setTimeout(check, 50));
    s.addEventListener("load", check);
    s.addEventListener("error", () => { scriptPromise = null; reject(new Error("Turnstile failed to load")); });
    if (!existing) { s.src = SCRIPT_SRC; s.async = true; s.defer = true; document.head.appendChild(s); }
    else check();
  });
  return scriptPromise;
}

export type TurnstileHandle = { reset: () => void };

export const Turnstile = forwardRef<TurnstileHandle, {
  action: "contact" | "quote";
  onToken: (token: string | null) => void;
}>(function Turnstile({ action, onToken }, ref) {
  const el = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useImperativeHandle(ref, () => ({
    reset: () => {
      cb.current(null);
      if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !el.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(el.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action,
        theme: "auto",
        callback: (t: string) => cb.current(t),
        "expired-callback": () => {
          cb.current(null);
          if (widgetId.current) window.turnstile?.reset(widgetId.current);
        },
        "error-callback": () => cb.current(null),
      });
    }).catch(() => cb.current(null));
    return () => {
      cancelled = true;
      if (window.turnstile && widgetId.current) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [action]);

  return <div ref={el} className="min-h-[65px]" />;
});
