"use client";

import Link from "next/link";

type BuyProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Buy({ locale, dict }: BuyProps) {
  return (
    <>
      <section className="bgbuy py-20">
        <div className="maxW flex justify-end">
          <article className="lg:w-1/2 lg:mr-20">
            {/* Título */}
            <h2 className="text-3xl uppercase font-bold leading-tight max-w-[700px]">
              {dict.buy?.title ?? "buy Title"}
            </h2>

            {/* Subtítulo */}
            <p className="mt-4  max-w-[600px] opacity-90">
              {dict.buy?.subtitle ?? "buy subtitle"}
            </p>

            {/* Botões */}
            <div className="mt-6 flex gap-4">
              <Link
                href={`/${locale}/about`}
                className="bg-white text-vermelhop tracking-widest uppercase px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                {dict.buy?.primaryButton ?? "Saiba mais"}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
