"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

type NavbarProps = {
  locale: "pt" | "en" | "es";
  dict: any;
};

function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  const rest = parts.slice(2).join("/");
  return `/${rest}`.replace(/\/$/, "") || "/";
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // mantém a rota atual ao trocar idioma
  const restPath = stripLocale(pathname);
  const suffix = restPath === "/" ? "" : restPath;

  const items = useMemo(
    () => [
      { label: dict.nav?.home ?? "Home", href: `/${locale}` },
      { label: dict.nav?.products ?? "Produtos", href: `/${locale}/produtos` },
      { label: dict.nav?.about ?? "A Puravie", href: `/${locale}/sobre-nos` },
      {
        label: dict.nav?.program ?? "Programa de Satisfação",
        href: `/${locale}/programa-de-satisfacao`,
      },
      { label: dict.nav?.contact ?? "Fale Conosco", href: `/${locale}/contato` },
      { label: dict.nav?.adocao ?? "Blog Puravie", href: `/${locale}/blog` },
    ],
    [dict, locale],
  );

  // portal só no client
  useEffect(() => setMounted(true), []);

  // trava scroll quando abre
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // fecha com ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // fecha ao trocar rota
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const MobileDrawer = (
    <div
      className={[
        "fixed inset-0 z-[99999] md:hidden",
        "transition-opacity duration-200",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/60"
      />

      {/* Drawer */}
      <aside
        className={[
          "absolute top-0 right-0 h-full w-[85%] max-w-[340px]",
          "bg-vermelhop shadow-2xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
      >
        {/* Topo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
          <span className="text-white font-semibold uppercase text-sm">Menu</span>

          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/30 hover:border-white/50 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Bandeiras no Mobile */}
        <div className="px-6 py-4 border-b border-white/15">
          <p className="text-white/90 text-xs uppercase font-semibold tracking-wide">
            Idioma
          </p>

          <div className="mt-3 flex items-center gap-3">
            <Link href={`/pt${suffix}`} onClick={() => setOpen(false)}>
              <img
                src="/pt.png"
                alt="Português"
                className={`w-[34px] h-[24px] object-cover border-2 border-white rounded-sm transition-all cursor-pointer ${
                  locale === "pt"
                    ? "opacity-100 scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            </Link>

            <Link href={`/en${suffix}`} onClick={() => setOpen(false)}>
              <img
                src="/us.png"
                alt="English"
                className={`w-[34px] h-[24px] object-cover border-2 border-white rounded-sm transition-all cursor-pointer ${
                  locale === "en"
                    ? "opacity-100 scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            </Link>

            <Link href={`/es${suffix}`} onClick={() => setOpen(false)}>
              <img
                src="/es.png"
                alt="Español"
                className={`w-[34px] h-[24px] object-cover border-2 border-white rounded-sm transition-all cursor-pointer ${
                  locale === "es"
                    ? "opacity-100 scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            </Link>
          </div>
        </div>

        {/* Links */}
        <nav className="px-6 py-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b border-white/10 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-white uppercase text-sm font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );

  return (
    <>
      {/* DESKTOP */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-8 uppercase text-sm">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-white font-semibold hover:opacity-80 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* BOTÃO MOBILE */}
      <button
        type="button"
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/30 hover:border-white/50 transition"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* PORTAL */}
      {mounted && createPortal(MobileDrawer, document.body)}
    </>
  );
}