import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <main className="bg-white py-20">
      <div className="maxW">
        <Link
          href={`/${locale}/produtos`}
          className="text-sm underline text-black"
        >
          ← Voltar para produtos
        </Link>

        <article className="mt-10 flex justify-center gap-30 items-center">
          <div>
            <img src={product.image} alt={product.title} />
          </div>
          <div className="bg-[#007584] py-20 px-10 rounded-2xl">
            <h1 className="text-3xl font-semibold uppercase text-white">
              {product.title}
            </h1>

            <p className="mt-4 uppercase">{product.flavor}</p>
            <p className="uppercase text-sm">{product.weights}</p>

            {/* Se quiser, dá pra adicionar descrição no JSON depois */}
          </div>
        </article>
      </div>
    </main>
  );
}
