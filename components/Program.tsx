"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ProgramProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Program({ locale, dict }: ProgramProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLImageElement>(null);

  const rightRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // esquerda
      tl.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // selo
      tl.from(
        badgeRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

      // direita
      tl.from(
        rightRef.current,
        {
          x: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // lista em stagger
      if (listRef.current) {
        tl.from(
          listRef.current.children,
          {
            y: 15,
            opacity: 0,
            duration: 0.4,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="satisfacao" ref={sectionRef} className="bg-vermelhop py-20">
      <div className="maxW flex flex-col justify-center lg:flex-row">
        
        <article ref={leftRef} className="lg:w-1/2">
          <h2 className="text-3xl font-bold uppercase tracking-wider text-white text-center lg:text-left">
            {dict.program?.title ?? "Program Title"}
          </h2>

          <div className="w-[160px] mt-10 lg:mt-4 mx-auto lg:mx-0">
            {dict.program?.badgeSrc && (
              <img
                ref={badgeRef}
                src={dict.program.badgeSrc}
                alt="Selo 110% satisfação"
                className="w-full h-auto"
              />
            )}
          </div>
        </article>

        <article ref={rightRef} className="lg:w-1/2">
          <h3 className="text-2xl font-bold uppercase tracking-wider text-white text-center lg:text-left">
            {dict.program?.title2 ?? "Program Title"}
          </h3>

          <p className="mt-4 text-white text-center lg:text-left">
            {dict.program?.p ?? "Program Title"}
          </p>

          <ul ref={listRef} className="mt-6 text-white font-semibold">
            {dict.program?.list?.map((item: string, index: number) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>

          <p className="mt-6 font-semibold text-white">
            sac@noupetcare.com
          </p>

          <p className="font-semibold text-white">
            (19) 99944-8710
          </p>
        </article>

      </div>
    </section>
  );
}