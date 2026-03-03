import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductSpecsTabs from "./ProductSpecsTabs";

export default async function ProdutoDetalhePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  const dict = await getDictionary(locale);
  const items = dict.products?.items ?? [];

  const product = items.find((p: { slug: string }) => p.slug === slug);
  if (!product) return notFound();

  return (
    <>
      {/* PRODUTO */}
      <section className="bg-white py-20">
        <div className="maxW">
          <Link
            href={`/${locale}/produtos`}
            className="text-sm underline text-black"
          >
            ← Voltar para produtos
          </Link>

          <article className="mt-10 flex flex-col lg:flex-row justify-center gap-20 items-center">
            {/* IMAGEM DO PRODUTO */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-[450px]"
              />

              <img
                className="absolute w-[180px] top-0 right-0"
                src="/produtos/100.svg"
                alt=""
              />
            </div>

            {/* CARD */}
            <div className="bg-[#007584] relative py-20 px-10 rounded-2xl w-full max-w-[700px] shadow overflow-visible">
              {/* BOLINHA DA RAÇÃO */}
              {product.image1 && (
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 shadow bg-white rounded-full h-28 w-28 flex items-center justify-center">
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
                <h3 className="text-xl text-white uppercase">
                  {product.porte}
                </h3>
              )}

              <h3 className="text-xl text-white uppercase mt-6 font-semibold">
                {product.sabor}:
              </h3>

              <p className="text-white">{product.flavor}</p>

              <p className="uppercase mt-6 font-semibold text-white">
                {product.disp}:
              </p>

              <p className="text-sm text-white">{product.weights}</p>
                          <img
              className="object-contain absolute -bottom-55 left-0 w-full max-w-[500px] h-[200px]"
              src="/produtos/icons.svg"
              alt=""
            />
            </div>


          </article>
        </div>
      </section>

      {/* ICONES */}
      {product.icons && (
        <section className="bg-vermelhop py-20">
          <div className="maxW">
            <div className="flex flex-wrap gap-20 justify-center">
              {product.icons.map((icon: string, index: number) => (
                <div key={index}>
                  <img
                    src={icon}
                    alt="feature icon"
                    className="w-[200px] h-[200px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPOSIÇÃO */}
      {product.specs && <ProductSpecsTabs specs={product.specs} />}
    </>
  );
}
