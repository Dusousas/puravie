"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type HeroProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Hero({ locale, dict }: HeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // garante que começa visível no DOM (evita travar em opacity:0)
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 1,
      });

      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, clearProps: "transform,opacity" }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, clearProps: "transform,opacity" },
          "-=0.55"
        )
        .fromTo(
          buttonRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: "transform,opacity" },
          "-=0.45"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bgHero1">
      <div
        ref={rootRef}
        className="maxW min-h-[80vh] flex flex-col justify-center items-start py-20"
      >
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold leading-tight max-w-[700px] text-center lg:text-left"
        >
          {dict.hero?.title ?? "Hero Title"}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl max-w-[600px] opacity-90 text-center lg:text-left"
        >
          {dict.hero?.subtitle ?? "Hero subtitle"}
        </p>

        <div className="mt-8 flex gap-4 justify-center lg:justify-start w-full">
          <Link
            href={`/${locale}/produtos`}
            className="bg-white text-vermelhop px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition mx-auto lg:mx-0 inline-flex"
            ref={buttonRef}
          >
            {dict.hero?.primaryButton ?? "Saiba mais"}
          </Link>
        </div>
      </div>
    </section>
  );
}