"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type HeroProps = {
  locale: "pt" | "en" | "es";
  dict: {
    hero?: {
      title?: string;
      subtitle?: string;
      primaryButton?: string;
    };
  };
};

export default function Hero({ locale, dict }: HeroProps) {
  const heroImage = {
    pt: "/hero1_br.avif",
    en: "/hero1_us.avif",
    es: "/hero1_es.avif",
  }[locale];
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
    <section className="bgHero1 relative mt-20">
      <div className="absolute inset-0 hidden bg-cover bg-bottom md:block" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
      <Image src={heroImage} alt="" width={1905} height={1030} priority unoptimized className="block w-full h-auto md:hidden" />
      <div
        ref={rootRef}
        className="maxW relative flex flex-col justify-center items-center !py-10 md:min-h-[80vh] md:items-start md:!py-0"
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
