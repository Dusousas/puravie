import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import Script from "next/script";

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
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-71YNTRQ2QQ"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-71YNTRQ2QQ');
        `}
      </Script>

      <Header locale={locale} dict={dict} />

      {children}

      <Footer locale={locale} dict={dict} />
    </>
  );
}