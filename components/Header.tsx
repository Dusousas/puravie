"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


type HeaderProps = {
  locale: "pt" | "en" | "es";
  dict: any;
};

function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  const rest = parts.slice(2).join("/");
  return `/${rest}`.replace(/\/$/, "") || "/";
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const restPath = stripLocale(pathname);
  const suffix = restPath === "/" ? "" : restPath;

  return (
    <section className="bg-vermelhop py-2">
      <div className="maxW flex items-center justify-between">
        <Link href={`/${locale}`} className="">
          <img src="/logo.svg" alt="Logo" className="w-[100px]" />
        </Link>

        <div className="flex items-center gap-4">

          {/* Brasil */}
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

          {/* EUA */}
          <Link href={`/en${suffix}`}>
            <img
              src="/us.png"
              alt="English"
              className={`w-[28px] h-[20px] object-cover rounded-sm transition-all border-2 border-white cursor-pointer ${
                locale === "en"
                  ? "opacity-100 scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          </Link>

          {/* Espanha */}
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
    </section>
  );
}