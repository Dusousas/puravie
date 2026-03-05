"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CtaBlogProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function CtaBlog({ locale, dict }: CtaBlogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        logoRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      ).fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <a href="/blog" className="block">
      <section
        ref={sectionRef}
        className="bgctabr py-12 border-t-2 border-white"
      >
        <div className="maxW flex flex-col items-center gap-x-30 w-full lg:flex-row">
          <img ref={logoRef} src="/logo_blog.avif" alt="Blog PuraVie" />

          <h2
            ref={titleRef}
            className="text-4xl max-w-[590px] font-bold text-center lg:text-left"
          >
            {dict.blog?.title ?? "Blog Title"}
          </h2>
        </div>
      </section>
    </a>
  );
}