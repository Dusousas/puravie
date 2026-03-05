"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type BuyProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Buy({ locale, dict }: BuyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, pRef.current, btnRef.current], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // bloco vindo da direita
      tl.fromTo(
        wrapRef.current,
        { x: 70, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, clearProps: "transform,opacity" }
      );

      // stagger interno (bem leve)
      tl.fromTo(
        [titleRef.current, pRef.current, btnRef.current],
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          clearProps: "transform,opacity",
        },
        "-=0.45"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bgbuy py-20">
      <div className="maxW flex flex-col lg:flex-row lg:justify-end">
        <article ref={wrapRef} className="lg:w-1/2 lg:mr-20">
          <h2
            ref={titleRef}
            className="text-3xl uppercase font-bold leading-tight max-w-[700px] text-center lg:text-left"
          >
            {dict.buy?.title ?? "buy Title"}
          </h2>

          <p
            ref={pRef}
            className="mt-4 max-w-[600px] opacity-90 text-center lg:text-left"
          >
            {dict.buy?.subtitle ?? "buy subtitle"}
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              ref={btnRef}
              href={`/${locale}/about`}
              className="bg-white text-vermelhop tracking-widest uppercase px-6 py-3 rounded-lg font-semibold transition mx-auto lg:mx-0 inline-flex
                         hover:opacity-95 hover:-translate-y-[2px] hover:shadow-md"
            >
              {dict.buy?.primaryButton ?? "Saiba mais"}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}