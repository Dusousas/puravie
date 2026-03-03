"use client";

import React, { useMemo, useState } from "react";

type Specs = {
  composition: string;
  guarantee: string;
  enrichment: string;
};

export default function ProductSpecsTabs({ specs }: { specs: Specs }) {
  const tabs = useMemo(
    () => [
      { key: "composition" as const, label: "Composição Básica" },
      { key: "guarantee" as const, label: "Níveis de Garantia" },
      { key: "enrichment" as const, label: "Enriquecimento" },
    ],
    []
  );

  const [active, setActive] =
    useState<(typeof tabs)[number]["key"]>("composition");

  return (
    <section className="bg-white py-20">
      {/* Tabs */}
      <div className="border-b border-zinc-200">
        <div className="maxW">
          <div className="grid  grid-cols-3 text-center text-sm md:text-base">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`py-5 transition ${
                  active === t.key
                    ? "border-b-2 border-black font-medium"
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

      {/* Conteúdo */}
      <div className="maxW">
        <p className="text-zinc-900 leading-relaxed whitespace-pre-line pt-10">
          {specs[active]}
        </p>
      </div>
    </section>
  );
}