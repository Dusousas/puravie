
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;

  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      {children}
      <Footer locale={locale} dict={dict} />

    </>
  );
}