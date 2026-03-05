"use client";

import Link from "next/link";

type DogsProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Dogs({ locale, dict }: DogsProps) {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="maxW flex flex-col gap-y-10 gap-x-20 justify-center items-center lg:flex-row">
          <article className="lg:w-1/2">
            <img src="/dogs_page.avif" alt="" />
          </article>

          <article className="lg:w-1/2">
            <h2 className="text-5xl font-bold uppercase tracking-wider text-vermelhop text-center lg:text-left">
              {dict.dogs?.title ?? "Dogs Title"}
            </h2>
            <p className="text-black mt-4 text-center lg:text-left">
              {dict.dogs?.p ?? "Dogs paragrafo"}
            </p>

            <div className="mt-4 flex w-full">
              <Link
                href={`/${locale}/about`}
                className="bg-vermelhop text-text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition mx-auto lg:mx-0"
              >
                {dict.dog?.primaryButton ?? "Saiba mais"}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
