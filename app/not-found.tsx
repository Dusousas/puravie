"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const params = useParams() as { locale?: string };
  const locale = (params?.locale as "pt" | "en" | "es") ?? "pt";

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-20 px-4">
      <div className="maxW w-full">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[150px] font-bold text-slate-300 tracking-tighter">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl md:text-5xl font-bold text-slate-900">404</p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            PÁGINA NÃO ENCONTRADA
          </h2>

          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            DESCULPE! A PÁGINA NÃO EXISTE.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Link
              href={`/${locale}`}
              className="bg-white text-[#c70217] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition border-2 border-[#c70217]"
            >
              VOLTAR AO INÍCIO
            </Link>

            <Link
              href={`/${locale}/produtos`}
              className="bg-[#c70217] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              VER PRODUTOS
            </Link>
          </div>

          <div className="mt-16 text-6xl">🐾</div>
        </div>
      </div>
    </section>
  );
}