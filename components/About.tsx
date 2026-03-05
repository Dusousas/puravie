"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AboutProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function About({ locale, dict }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // evita ficar travado em opacity:0 em dev/strict mode
      gsap.set([titleRef.current, btnRef.current], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        titleRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, clearProps: "transform,opacity" }
      ).fromTo(
        btnRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: "transform,opacity" },
        "-=0.45"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bgabout py-20">
      <div className="maxW flex justify-end">
        <article className="flex flex-col lg:items-end text-right max-w-2xl">
          <h2
            ref={titleRef}
            className="text-5xl font-bold uppercase tracking-wider text-white text-center lg:text-right"
          >
            {dict.about?.title ?? "about Title"}
          </h2>

          <div className="mt-6 flex">
            <Link
              ref={btnRef}
              href={`/${locale}/sobre-nos`}
              className="bg-white px-6 py-3 text-black rounded-lg font-semibold transition mx-auto inline-flex
                         hover:opacity-95 hover:-translate-y-[2px] hover:shadow-md"
            >
              {dict.about?.primaryButton ?? "Leia mais"}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}