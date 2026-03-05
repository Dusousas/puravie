"use client";

import Link from "next/link";

type HeroProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="bgHero1">
      <div className="maxW min-h-[80vh] flex flex-col justify-center items-start py-20">

        {/* Título */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-[700px] text-center lg:text-left">
          {dict.hero?.title ?? "Hero Title"}
        </h1>

        {/* Subtítulo */}
        <p className="mt-6 text-lg md:text-xl max-w-[600px] opacity-90 text-center lg:text-left">
          {dict.hero?.subtitle ?? "Hero subtitle"}
        </p>

        {/* Botões */}
        <div className="mt-8 flex gap-4 justify-center lg:justify-start w-full">
          <Link
            href={`/${locale}/produtos`}
            className="bg-white text-vermelhop px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition mx-auto lg:mx-0"
          >
            {dict.hero?.primaryButton ?? "Saiba mais"}
          </Link>
        </div>

      </div>
    </section>
  );
}