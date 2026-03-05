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
            <h2 className=" font-bold text-3xl uppercase tracking-wider text-white text-center lg:text-left lg:text-5xl">
              {dict.about?.title ?? "about Title"}
            </h2>


            <div className="mt-6 flex w-full">
              <Link
                href={`/${locale}/about`}
                className="bg-white text-text-white px-6 py-3 text-black rounded-lg font-semibold hover:opacity-90 transition mx-auto lg:mx-0"
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
