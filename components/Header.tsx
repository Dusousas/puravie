"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "./subc/Navbar";
import React, { useEffect, useRef, useState } from "react";

type HeaderProps = {
  locale: "pt" | "en" | "es";
  dict: any;
};

function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  const rest = parts.slice(2).join("/");
  return `/${rest}`.replace(/\/$/, "") || "/";
}

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const restPath = stripLocale(pathname);
  const suffix = restPath === "/" ? "" : restPath;

  const [hidden, setHidden] = useState(false);

  // guarda último scroll pra comparar direção
  const lastY = useRef(0);
  // evita ficar piscando em micro scroll
  const TOLERANCE = 8;
  // se estiver perto do topo, sempre mostra
  const TOP_SHOW = 40;

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      // perto do topo => sempre visível
      if (y <= TOP_SHOW) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      // ignora micro variações
      if (Math.abs(diff) < TOLERANCE) return;

      // desceu => esconder | subiu => mostrar
      if (diff > 0) setHidden(true);
      else setHidden(false);

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 py-2 shadow-xl",
        "bg-vermelhop",
        "transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="maxW flex items-center justify-between py-2">
        <Link href={`/${locale}`}>
          <img src="/logo.svg" alt="Logo" className="w-[100px]" />
        </Link>

        <Navbar locale={locale} dict={dict} />

        <div className="hidden lg:flex items-center gap-4">
          <Link href={`/pt${suffix}`}>
            <img
              src="/pt.png"
              alt="Português"
              className={`w-[28px] h-[20px] object-cover border-2 border-white rounded-sm transition-all cursor-pointer ${
                locale === "pt"
                  ? "opacity-100 scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          </Link>

          <Link href={`/en${suffix}`}>
            <img
              src="/us.png"
              alt="English"
              className={`w-[28px] h-[20px] object-cover border-2 border-white rounded-sm transition-all cursor-pointer ${
                locale === "en"
                  ? "opacity-100 scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          </Link>

          <Link href={`/es${suffix}`}>
            <img
              src="/es.png"
              alt="Español"
              className={`w-[28px] h-[20px] object-cover border-2 border-white rounded-sm transition-all cursor-pointer ${
                locale === "es"
                  ? "opacity-100 scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}