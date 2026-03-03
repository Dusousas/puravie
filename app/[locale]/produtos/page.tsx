import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function ProdutosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  const dict = await getDictionary(locale);

  const items = dict.products?.items ?? [];

  return (
    <>
      <section className="bgProducts py-40">
        <div className="maxW">
          <h1 className="text-4xl font-semibold">
            {dict.products?.title ?? "Produtos"}
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="maxW">
          <div className="grid grid-cols-1 gap-y-20 md:grid-cols-2 justify-items-center text-center">
            {items.map((p: { slug: Key | null | undefined; image: string | Blob | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; flavor: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; weights: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <article key={p.slug} className="max-w-sm">
                <img src={p.image as string} alt={String(p.title ?? "")} className="mx-auto" />

                <h2 className="text-lg text-vermelhop font-semibold uppercase mt-4">
                  {p.title}
                </h2>

                <p className="text-black uppercase">{p.flavor}</p>
                <p className="text-black uppercase text-sm">{p.weights}</p>

                <div className="mt-4">
                  <Link
                    href={`/${locale}/produtos/${String(p.slug)}`}
                    className="inline-flex items-center justify-center px-6 py-2 rounded-md bg-vermelhop text-white font-semibold uppercase text-sm hover:opacity-90 transition"
                  >
                    {dict.products?.cta ?? "Saiba mais"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}