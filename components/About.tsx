"use client";

import Link from "next/link";

type AboutProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function About({ locale, dict }: AboutProps) {
  return (
    <>
      <section className="bgabout py-20">
        <div className="maxW flex justify-end">
          <article className="flex flex-col lg:items-end text-right max-w-2xl">
            <h2 className="text-5xl font-bold uppercase tracking-wider text-white text-center lg:text-right">
              {dict.about?.title ?? "about Title"}
            </h2>


            <div className="mt-6 flex">
              <Link
                href={`/${locale}/sobre-nos`}
                className="bg-white text-text-white px-6 py-3 text-black rounded-lg font-semibold hover:opacity-90 transition mx-auto"
              >
                {dict.about?.primaryButton ?? "Leia mais"}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
