"use client";

import type { Locale } from "@/i18n/config";
import React, { useMemo, useState } from "react";

type Specs = {
  composition: string;
  guarantee: string;
  enrichment: string;
};

export default function ProductSpecsTabs({
  specs,
  locale,
}: {
  specs: Specs;
  locale: Locale;
}) {
  const tabs = useMemo(() => {
    const labels = {
      pt: {
        composition: "Composição Básica",
        guarantee: "Níveis de Garantia",
        enrichment: "Enriquecimento",
      },
      en: {
        composition: "Basic Composition",
        guarantee: "Guaranteed Analysis",
        enrichment: "Enrichment",
      },
      es: {
        composition: "Composición Básica",
        guarantee: "Niveles Garantizados",
        enrichment: "Enriquecimiento",
      },
    }[locale];

    return [
      { key: "composition" as const, label: labels.composition },
      { key: "guarantee" as const, label: labels.guarantee },
      { key: "enrichment" as const, label: labels.enrichment },
    ];
  }, [locale]);

  const [active, setActive] =
    useState<(typeof tabs)[number]["key"]>("composition");

  return (
    <section className="bg-white py-20">
      <div className="border-b border-zinc-200">
        <div className="maxW">
          <div className="grid grid-cols-3 text-center text-sm md:text-base">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`py-5 transition ${
                  active === t.key
                    ? "border-b-2 border-black font-medium text-black"
                    : "text-vermelhop hover:text-vermelhop/50"
                }`}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="maxW">
        <p className="pt-10 leading-relaxed whitespace-pre-line text-zinc-900">
          {specs[active]}
        </p>
      </div>
    </section>
  );
}
