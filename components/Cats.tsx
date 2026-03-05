"use client";

import Link from "next/link";

type CatsProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Cats({ locale, dict }: CatsProps) {
  return (
    <>
      <section className=" py-20 bg-white lg:pb-20 lg:py-0">
        <div className="maxW flex flex-col gap-y-10 gap-x-20 justify-center items-center lg:flex-row">
          <article className="lg:w-1/2">
            <h2 className="text-5xl font-bold uppercase tracking-wider text-[#031C6F] text-center lg:text-left">
              {dict.cats?.title ?? "cats Title"}
            </h2>
            <p className="text-black mt-4 text-center lg:text-left">
              {dict.cats?.p ?? "cats paragrafo"}
            </p>

            <div className="mt-4 flex w-full">
              <Link
                href={`/${locale}/produtos`}
                className="bg-[#031C6F] text-text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition mx-auto lg:mx-0"
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
