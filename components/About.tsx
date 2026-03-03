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
          <article className="">
            <h2 className="text-5xl font-bold uppercase tracking-wider text-white">
              {dict.about?.title ?? "about Title"}
            </h2>
            <p className="text-white mt-4">
              {dict.about?.p ?? "about paragrafo"}
            </p>

            <div className="mt-6 flex">
              <Link
                href={`/${locale}/about`}
                className="bg-white text-text-white px-6 py-3 text-black rounded-lg font-semibold hover:opacity-90 transition"
              >
                {dict.about?.primaryButton ?? "Leia amis"}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
