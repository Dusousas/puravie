"use client";

import Link from "next/link";

type CatsProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Cats({ locale, dict }: CatsProps) {
  return (
    <>
      <section className="pb-20 bg-white">
        <div className="maxW flex gap-20 justify-center items-center">
          <article className="lg:w-1/2">
            <h2 className="text-5xl font-bold uppercase tracking-wider text-[#031C6F]">
              {dict.cats?.title ?? "cats Title"}
            </h2>
            <p className="text-black mt-4">
              {dict.cats?.p ?? "cats paragrafo"}
            </p>

            <div className="mt-4 flex">
              <Link
                href={`/${locale}/about`}
                className="bg-[#031C6F] text-text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                {dict.dog?.primaryButton ?? "Saiba mais"}
              </Link>
            </div>
          </article>

          <article className="lg:w-1/2">
            <img src="/cats_page.avif" alt="" />
          </article>
        </div>
      </section>
    </>
  );
}
