import {
  defaultLocale,
  isLocale,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import { benefitImage, benefitLabel, productLabels, translateSpecs } from "@/lib/productTranslations";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductSpecsTabs from "./ProductSpecsTabs";

const productCardColors: Record<string, string> = {
  "caes-adultos-porte-medio-grande": "#073187",
  "caes-adultos-todos-portes": "#60292b",
  "caes-filhotes-todos-portes": "#18c4d5",
  "gatos-adultos": "#fc4b72",
  "gatos-castrados": "#603890",
};

const kibbleImages: Record<string, string> = {
  "caes-adultos-porte-medio-grande": "/produtos/graos/medio-grande.avif",
  "caes-adultos-todos-portes": "/produtos/graos/todos-portes.avif",
  "caes-filhotes-todos-portes": "/produtos/graos/todos-portes.avif",
  "gatos-adultos": "/produtos/graos/gatos-adultos.avif",
  "gatos-castrados": "/produtos/graos/todos-portes.avif",
};

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) => {
      const dict = await getDictionary(locale);

      return (dict.products?.items ?? [])
        .filter((item: { slug?: string }) => Boolean(item.slug))
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
  const items = dict.products?.items ?? [];
  const ptDict = locale === "pt" ? dict : await getDictionary("pt");
  const backLabel = {
    pt: "Voltar para produtos",
    en: "Back to products",
    es: "Volver a productos",
  }[locale];

  const product = items.find((p: { slug: string }) => p.slug === slug);
  if (!product) return notFound();
  const sourceProduct = ptDict.products.items.find((p: { slug: string }) => p.slug === slug);
  const benefits: string[] = product.benefits ?? sourceProduct?.benefits ?? [];
  const specs = product.specs ?? (sourceProduct?.specs && translateSpecs(sourceProduct.specs, locale));
  const labels = productLabels[locale];
  const titleParts = locale === "en" ? product.title.split(" — ") : [product.title];
  const title = titleParts[0];
  const porte = product.porte ?? titleParts[1];
  const kibbleImage = kibbleImages[slug];

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
                alt={title}
                className="max-w-[450px]"
              />

              <img
                className="absolute top-0 right-0 w-[180px]"
                src={locale === "pt" ? "/produtos/100.svg" : `/produtos/100_${locale}.svg`}
                alt=""
              />
            </div>

            <div className="w-full max-w-[700px]">
              <div
                className="relative rounded-2xl px-10 py-20 shadow"
                style={{ backgroundColor: productCardColors[slug] }}
              >
              {kibbleImage && (
                <div className="absolute top-1/2 right-0 flex h-28 w-28 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white shadow md:h-40 md:w-40">
                  <img
                    className={
                      slug === "caes-adultos-porte-medio-grande"
                        ? "w-16 md:w-20"
                        : "w-20"
                    }
                    src={kibbleImage}
                    alt={labels.kibble}
                  />
                </div>
              )}

              <h1 className="text-5xl font-semibold uppercase text-white">
                {title}
              </h1>

              {porte && (
                <h3 className="text-xl uppercase text-white">
                  {porte}
                </h3>
              )}

              <h3 className="mt-6 text-xl font-semibold uppercase text-white">
                {product.sabor ?? labels.flavor}:
              </h3>

              <p className="text-white">{product.flavor}</p>

              <p className="mt-6 font-semibold uppercase text-white">
                {product.disp ?? labels.packaging}:
              </p>

              <p className="text-sm text-white">{product.weights}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-start justify-center gap-4 sm:justify-start">
                <img
                  src={locale === "pt" ? "/110_br.svg" : `/110_${locale}.svg`}
                  alt={labels.guarantee}
                  className="h-28 w-28 shrink-0 object-contain"
                />
                <img
                  src={locale === "pt" ? "/produtos/icons.svg" : `/produtos/icons_${locale}.svg`}
                  alt={`${labels.experts}; ${labels.natural}`}
                  className="h-28 w-full min-w-[280px] max-w-[500px] flex-1 object-contain object-left"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      {benefits.length > 0 && (
        <section
          className={`py-20 ${
            slug.startsWith("gatos-") ? "bg-[#071d73]" : "bg-vermelhop"
          }`}
        >
          <div className="maxW">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-6">
              {benefits.map((benefit: string) => (
                <img
                  key={benefit}
                  src={benefitImage(benefit, locale)}
                  alt={benefitLabel(benefit, locale)}
                  className={`h-[210px] w-[calc(50%-0.5rem)] max-w-[200px] object-contain md:w-[calc(33.333%-0.75rem)] ${
                    benefits.length === 8
                      ? "lg:w-[calc(25%-0.75rem)]"
                      : benefits.length === 10
                        ? "lg:w-[calc(20%-0.8rem)]"
                        : "lg:w-[calc(16.666%-0.9rem)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {specs && (
        <ProductSpecsTabs specs={specs} locale={locale} />
      )}
    </>
  );
}
