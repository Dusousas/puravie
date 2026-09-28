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

const benefitLabels: Record<string, string> = {
  "protecao-cardiovascular.svg": "Proteção cardiovascular",
  "proteinas-selecionadas.svg": "Proteínas selecionadas",
  "pele-pelagem.svg": "Pele saudável e pelagem brilhante",
  "complexo-imunologico.svg": "Complexo imunológico",
  "fezes-firmes.svg": "Fezes mais firmes e com menos cheiro",
  "saude-oral.svg": "Saúde oral",
  "saude-intestinal.svg": "Saúde intestinal",
  "tamanho-formato.svg": "Tamanho e formato ideais",
  "sabor-irresistivel.svg": "Sabor irresistível",
  "reforco-articular.svg": "Reforço articular",
  "antioxidantes-naturais.svg": "Com antioxidantes naturais",
  "desenvolvimento-cerebral.svg": "Apoio ao desenvolvimento cerebral",
  "crescimento-saudavel.svg": "Crescimento saudável",
  "paladares-exigentes.svg": "Paladares exigentes",
  "epa-dha-taurina.svg": "Com EPA, DHA e taurina",
  "ambientes-internos.svg": "Ambientes internos",
  "trato-urinario.svg": "Trato urinário saudável",
  "controle-peso.svg": "Controle de peso",
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
  const backLabel = {
    pt: "Voltar para produtos",
    en: "Back to products",
    es: "Volver a productos",
  }[locale];

  const product = items.find((p: { slug: string }) => p.slug === slug);
  if (!product) return notFound();
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
                alt={product.title}
                className="max-w-[450px]"
              />

              <img
                className="absolute top-0 right-0 w-[180px]"
                src="/produtos/100.svg"
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
                    alt="Formato do grão da ração"
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
              </div>
              <div className="mt-6 flex flex-wrap items-start justify-center gap-4 sm:justify-start">
                <img
                  src="/110_br.svg"
                  alt="Satisfação de 110% ou seu dinheiro de volta"
                  className="h-28 w-28 shrink-0 object-contain"
                />
                <img
                  src="/produtos/icons.svg"
                  alt="Desenvolvido por especialistas; livre de corantes e aromatizantes artificiais"
                  className="h-28 w-full min-w-[280px] max-w-[500px] flex-1 object-cover object-top"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      {product.benefits && (
        <section
          className={`py-20 ${
            slug.startsWith("gatos-") ? "bg-[#071d73]" : "bg-vermelhop"
          }`}
        >
          <div className="maxW">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-6">
              {product.benefits.map((benefit: string) => (
                <img
                  key={benefit}
                  src={benefit}
                  alt={benefitLabels[benefit.split("/").pop() ?? ""] ?? ""}
                  className={`h-[210px] w-[calc(50%-0.5rem)] max-w-[200px] object-contain md:w-[calc(33.333%-0.75rem)] ${
                    product.benefits.length === 8
                      ? "lg:w-[calc(25%-0.75rem)]"
                      : product.benefits.length === 10
                        ? "lg:w-[calc(20%-0.8rem)]"
                        : "lg:w-[calc(16.666%-0.9rem)]"
                  }`}
                />
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
