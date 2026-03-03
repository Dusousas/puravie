import type { Locale } from "@/i18n/config";
import pt from "@/i18n/dictionaries/pt.json";

const dictionaries = {
  pt: () =>
    import("@/i18n/dictionaries/pt.json").then((m) => m.default),

  en: () =>
    import("@/i18n/dictionaries/en.json").then((m) => m.default),
};

export type Dictionary = typeof pt;

export async function getDictionary(
  locale: Locale
): Promise<Record<string, any>> {
  return dictionaries[locale]();
}