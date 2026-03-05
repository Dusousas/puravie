"use client";

type CtaBlogProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function CtaBlog({ locale, dict }: CtaBlogProps) {
  return (
    <a href="/blog">
      <section className="bgctabr py-12 border-t-2 border-white">
        <div className="maxW flex flex-col items-center gap-x-30 w-full lg:flex-row">
          <img src="/logo_blog.avif" alt="" />
          <h2 className="text-4xl max-w-[590px] font-bold text-center lg:text-left">
            {dict.blog?.title ?? "Blog Title"}
          </h2>
        </div>
      </section>
    </a>
  );
}
