"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const params = useParams() as { locale?: string };
  const locale = (params?.locale as "pt" | "en" | "es") ?? "pt";

  const content = {
    pt: {
      title: "PAGINA NAO ENCONTRADA",
      description: "DESCULPE! A PAGINA NAO EXISTE.",
      backHome: "VOLTAR AO INICIO",
      shop: "VER PRODUTOS",
    },
    en: {
      title: "PAGE NOT FOUND",
      description: "SORRY! THIS PAGE DOES NOT EXIST.",
      backHome: "BACK TO HOME",
      shop: "VIEW PRODUCTS",
    },
    es: {
      title: "PAGINA NO ENCONTRADA",
      description: "LO SENTIMOS! ESTA PAGINA NO EXISTE.",
      backHome: "VOLVER AL INICIO",
      shop: "VER PRODUCTOS",
    },
  }[locale];

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-20">
      <div className="maxW w-full">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold tracking-tighter text-slate-300 md:text-[150px]">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold text-slate-900 md:text-5xl">
                404
              </p>
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {content.title}
          </h2>

          <p className="mb-8 text-lg leading-relaxed text-slate-600">
            {content.description}
          </p>

          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}`}
              className="rounded-lg border-2 border-[#c70217] bg-white px-8 py-3 font-semibold text-[#c70217] transition hover:opacity-90"
            >
              {content.backHome}
            </Link>

            <Link
              href={`/${locale}/produtos`}
              className="rounded-lg bg-[#c70217] px-8 py-3 font-semibold text-white transition hover:opacity-90"
            >
              {content.shop}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
