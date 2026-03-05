import About from "@/components/About";
import Buy from "@/components/Buy";
import Cats from "@/components/Cats";
import Contact from "@/components/Contact";
import CtaBlog from "@/components/CtaBlog";
import Dogs from "@/components/Dogs";
import Hero from "@/components/Hero";
import Program from "@/components/Program";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;

  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <CtaBlog locale={locale} dict={dict} />
      <Dogs locale={locale} dict={dict} />
      <Cats locale={locale} dict={dict} />
      <About locale={locale} dict={dict} />

      <Program locale={locale} dict={dict} />

      <Contact locale={locale} dict={dict} />
      <Buy locale={locale} dict={dict} />
    </>
  );
}