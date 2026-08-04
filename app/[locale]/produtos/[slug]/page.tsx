import {
  defaultLocale,
  isLocale,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductSpecsTabs from "./ProductSpecsTabs";

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) => {
      const dict = await getDictionary(locale);

      return (dict.products?.items ?? [])
        .filter((item: { slug?: string }) =>
          Boolean(item.slug && item.slug !== "caes-adultos-porte-pequeno"),
        )
        .map((item: { slug?: string }) => ({ locale, slug: item.slug! }));
    }),
  );

  return params.flat();
}

export default async function ProdutoDetalhePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  const dict = await getDictionary(locale);
  const items = (dict.products?.items ?? []).filter(
    (item: { slug?: string }) => item.slug !== "caes-adultos-porte-pequeno",
  );
  const backLabel = {
    pt: "Voltar para produtos",
    en: "Back to products",
    es: "Volver a productos",
  }[locale];

  const product = items.find((p: { slug: string }) => p.slug === slug);
  if (!product) return notFound();

  return (
    <>
      <section className="bg-white pt-28 pb-20 md:pt-32">
        <div className="maxW">
          <Link
            href={`/${locale}/produtos`}
            className="inline-flex items-center gap-2 text-sm font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            <span aria-hidden="true">←</span>
            <span>{backLabel}</span>
          </Link>

          <article className="mt-10 flex flex-col items-center justify-center gap-20 lg:flex-row">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-[450px]"
              />

              <img
                className="absolute top-0 right-0 w-[180px]"
                src="/produtos/100.svg"
                alt=""
              />
            </div>

            <div className="relative w-full max-w-[700px] overflow-visible rounded-2xl bg-[#007584] px-10 py-20 shadow">
              {product.image1 && (
                <div className="absolute top-1/2 right-0 flex h-28 w-28 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white shadow">
                  <img
                    className="w-[80px]"
                    src={product.image1}
                    alt={product.title}
                  />
                </div>
              )}

              <h1 className="text-5xl font-semibold uppercase text-white">
                {product.title}
              </h1>

              {product.porte && (
                <h3 className="text-xl uppercase text-white">
                  {product.porte}
                </h3>
              )}

              <h3 className="mt-6 text-xl font-semibold uppercase text-white">
                {product.sabor}:
              </h3>

              <p className="text-white">{product.flavor}</p>

              <p className="mt-6 font-semibold uppercase text-white">
                {product.disp}:
              </p>

              <p className="text-sm text-white">{product.weights}</p>

              <img
                className="absolute -bottom-55 left-0 h-[200px] w-full max-w-[500px] object-contain"
                src="/produtos/icons.svg"
                alt=""
              />
            </div>
          </article>
        </div>
      </section>

      {product.icons && (
        <section className="bg-vermelhop py-20">
          <div className="maxW">
            <div className="flex flex-wrap justify-center gap-20">
              {product.icons.map((icon: string, index: number) => (
                <div key={index}>
                  <img
                    src={icon}
                    alt="feature icon"
                    className="h-[200px] w-[200px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.specs && (
        <ProductSpecsTabs specs={product.specs} locale={locale} />
      )}
    </>
  );
}
