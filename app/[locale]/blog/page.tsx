import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;

  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <section className=" bg-gradient-to-br flex justify-center items-center from-slate-50 to-slate-100 h-[75vh]">
        <div className="maxW">
          <div className="flex flex-col items-center justify-center text-center mt-20">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {dict.blog.section.title}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              {dict.blog.section.subtitle}
            </p>
            <div className="mt-8 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-400 animate-pulse"></div>
              <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse delay-100"></div>
              <div className="w-6 h-6 rounded-full bg-red-600 animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
