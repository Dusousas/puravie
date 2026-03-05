"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type DogsProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Dogs({ locale, dict }: DogsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // evita “sumir” caso re-render/strict mode
      gsap.set([imgWrapRef.current, titleRef.current, pRef.current, btnRef.current], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        imgWrapRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, clearProps: "transform,opacity" }
      )
        .fromTo(
          titleRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.75, clearProps: "transform,opacity" },
          "-=0.55"
        )
        .fromTo(
          pRef.current,
          { x: 45, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, clearProps: "transform,opacity" },
          "-=0.55"
        )
        .fromTo(
          btnRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: "transform,opacity" },
          "-=0.45"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const btnText =
    dict.dogs?.primaryButton ?? dict.dog?.primaryButton ?? "Saiba mais";

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="maxW flex flex-col gap-y-10 gap-x-20 justify-center items-center lg:flex-row">
        <article className="lg:w-1/2">
          <div
            ref={imgWrapRef}
            className="group overflow-hidden rounded-2xl will-change-transform"
          >
            <img
              src="/dogs_page.avif"
              alt="Linha para cães"
              className="w-full h-auto transform transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </article>

        <article className="lg:w-1/2">
          <h2
            ref={titleRef}
            className="text-5xl font-bold uppercase tracking-wider text-vermelhop text-center lg:text-left"
          >
            {dict.dogs?.title ?? "Dogs Title"}
          </h2>

          <p ref={pRef} className="text-black mt-4 text-center lg:text-left">
            {dict.dogs?.p ?? "Dogs paragrafo"}
          </p>

          <div className="mt-4 flex w-full">
            <Link
              ref={btnRef}
              href={`/${locale}/produtos`}
              className="bg-vermelhop text-text-white px-6 py-3 rounded-lg font-semibold transition mx-auto lg:mx-0 inline-flex
                         hover:opacity-95 hover:-translate-y-[2px] hover:shadow-md"
            >
              {btnText}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}