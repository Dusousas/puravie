"use client";

import Link from "next/link";

type NavbarProps = {
  locale: "pt" | "en" | "es";
  dict: any;
};

export default function Navbar({ locale, dict }: NavbarProps) {
  const items = [
    { label: dict.nav?.home ?? "Home", href: `/${locale}` },
    { label: dict.nav?.adocao ?? "#AdoçãoPura", href: `/${locale}/adocao-pura` },
    { label: dict.nav?.products ?? "Produtos", href: `/${locale}/produtos` },
    { label: dict.nav?.about ?? "A Puravie", href: `/${locale}/sobre-nos` },
    { label: dict.nav?.program ?? "Programa de Satisfação", href: `/${locale}/programa-de-satisfacao` },
    { label: dict.nav?.contact ?? "Fale Conosco", href: `/${locale}/contato` },
  ];

  return (
    <nav>
      <ul className="flex items-center gap-8">
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
  );
}