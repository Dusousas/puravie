import type { Locale } from "@/i18n/config";

type Specs = { composition: string; guarantee: string; enrichment: string };

export const productLabels = {
  pt: {
    flavor: "Sabor", packaging: "Disponível em embalagens de",
    kibble: "Formato do grão da ração", guarantee: "Satisfação de 110% ou seu dinheiro de volta",
    experts: "Desenvolvido por especialistas", natural: "Livre de corantes e aromatizantes artificiais",
  },
  en: {
    flavor: "Flavor", packaging: "Available in packages of",
    kibble: "Kibble shape", guarantee: "110% satisfaction or your money back",
    experts: "Developed by experts", natural: "No artificial colors or flavors",
  },
  es: {
    flavor: "Sabor", packaging: "Disponible en envases de",
    kibble: "Forma de la croqueta", guarantee: "110% de satisfacción o te devolvemos tu dinero",
    experts: "Desarrollado por especialistas", natural: "Sin colorantes ni aromatizantes artificiales",
  },
} as const;

const benefitNames: Record<string, [string, string, string]> = {
  "protecao-cardiovascular.svg": ["Proteção cardiovascular", "Cardiovascular protection", "Protección cardiovascular"],
  "proteinas-selecionadas.svg": ["Proteínas selecionadas", "Selected proteins", "Proteínas seleccionadas"],
  "pele-pelagem.svg": ["Pele saudável e pelagem brilhante", "Healthy skin and shiny coat", "Piel sana y pelaje brillante"],
  "complexo-imunologico.svg": ["Complexo imunológico", "Immune support", "Apoyo inmunológico"],
  "fezes-firmes.svg": ["Fezes mais firmes e com menos cheiro", "Firmer stools with less odor", "Heces más firmes y con menos olor"],
  "saude-oral.svg": ["Saúde oral", "Oral health", "Salud bucal"],
  "saude-intestinal.svg": ["Saúde intestinal", "Digestive health", "Salud intestinal"],
  "tamanho-formato.svg": ["Tamanho e formato ideais", "Ideal size and shape", "Tamaño y forma ideales"],
  "sabor-irresistivel.svg": ["Sabor irresistível", "Irresistible taste", "Sabor irresistible"],
  "reforco-articular.svg": ["Reforço articular", "Joint support", "Apoyo articular"],
  "antioxidantes-naturais.svg": ["Com antioxidantes naturais", "With natural antioxidants", "Con antioxidantes naturales"],
  "desenvolvimento-cerebral.svg": ["Apoio ao desenvolvimento cerebral", "Brain development support", "Apoyo al desarrollo cerebral"],
  "crescimento-saudavel.svg": ["Crescimento saudável", "Healthy growth", "Crecimiento saludable"],
  "paladares-exigentes.svg": ["Paladares exigentes", "For picky eaters", "Para paladares exigentes"],
  "epa-dha-taurina.svg": ["Com EPA, DHA e taurina", "With EPA, DHA and taurine", "Con EPA, DHA y taurina"],
  "ambientes-internos.svg": ["Ambientes internos", "Indoor living", "Vida en interiores"],
  "trato-urinario.svg": ["Trato urinário saudável", "Healthy urinary tract", "Tracto urinario saludable"],
  "controle-peso.svg": ["Controle de peso", "Weight management", "Control de peso"],
};

export function benefitLabel(path: string, locale: Locale): string {
  const index = { pt: 0, en: 1, es: 2 }[locale];
  return benefitNames[path.split("/").pop() ?? ""]?.[index] ?? "";
}

const englishBenefitImages = new Set([
  "proteinas-selecionadas.svg",
  "paladares-exigentes.svg",
  "ambientes-internos.svg",
  "complexo-imunologico.svg",
  "antioxidantes-naturais.svg",
  "saude-oral.svg",
  "tamanho-formato.svg",
  "pele-pelagem.svg",
  "saude-intestinal.svg",
  "fezes-firmes.svg",
  "protecao-cardiovascular.svg",
  "sabor-irresistivel.svg",
  "reforco-articular.svg",
  "desenvolvimento-cerebral.svg",
  "crescimento-saudavel.svg",
  "epa-dha-taurina.svg",
  "trato-urinario.svg",
  "controle-peso.svg",
]);

const spanishBenefitImages = new Set([
  "protecao-cardiovascular.svg",
  "proteinas-selecionadas.svg",
  "pele-pelagem.svg",
  "complexo-imunologico.svg",
  "fezes-firmes.svg",
  "antioxidantes-naturais.svg",
  "saude-oral.svg",
  "saude-intestinal.svg",
  "tamanho-formato.svg",
  "sabor-irresistivel.svg",
  "reforco-articular.svg",
  "desenvolvimento-cerebral.svg",
  "paladares-exigentes.svg",
  "crescimento-saudavel.svg",
  "epa-dha-taurina.svg",
  "ambientes-internos.svg",
  "controle-peso.svg",
]);

export function benefitImage(path: string, locale: Locale): string {
  const filename = path.split("/").pop() ?? "";
  if (locale === "en" && englishBenefitImages.has(filename)) return path.replace(/\.svg$/, "_en.svg");
  if (locale === "es" && spanishBenefitImages.has(filename)) return path.replace(/\.svg$/, "_es.svg");
  return path;
}

// Terms in the technical nutrition tables. Numbers and units are retained exactly as approved in Portuguese.
const terms: Record<"en" | "es", Record<string, string>> = {
  en: {
    "Farinha de vísceras de aves": "Poultry by-product meal", "farinha de carne e ossos de bovino": "Beef meat and bone meal",
    "farinha de torresmo": "Pork crackling meal", "farelo de glúten de milho": "Corn gluten meal",
    "grão de arroz": "Rice grain", "grão de milho": "Corn grain", "farelo de arroz": "Rice bran",
    "farelo de soja": "Soybean meal", "levedura de cervejaria inativada desidratada": "Dehydrated inactive brewer's yeast",
    "polpa desidratada de beterraba": "Dried beet pulp", "óleo de aves": "Poultry oil", "óleo de peixes": "Fish oil",
    "sulfato de glicosamina": "Glucosamine sulfate", "sulfato de condroitina": "Chondroitin sulfate",
    "cloreto de sódio": "Sodium chloride", "cloreto de potássio": "Potassium chloride",
    "hidrolisado de fígado de aves": "Poultry liver hydrolysate", "vitaminas": "vitamins", "minerais": "minerals",
    "fosfatidilcolina": "phosphatidylcholine", "sulfato de ferro": "ferrous sulfate", "sulfato de cobre": "copper sulfate",
    "sulfato de zinco": "zinc sulfate", "sulfato de manganês": "manganese sulfate",
    "selenito de sódio": "sodium selenite", "iodato de cálcio": "calcium iodate",
    "complexo ferro aminoácido": "iron amino acid complex", "complexo cobre aminoácido": "copper amino acid complex",
    "complexo zinco aminoácido": "zinc amino acid complex", "complexo manganês aminoácido": "manganese amino acid complex",
    "proteinato de selênio": "selenium proteinate", "parede celular de levedura": "yeast cell wall",
    "aditivo prebiótico": "prebiotic additive", "zeólita": "zeolite", "extrato de yucca": "yucca extract",
    "aditivo regulador de acidez": "acidity regulator", "ácido cítrico": "citric acid",
    "cloreto de amônio": "ammonium chloride", "sulfato de amônio": "ammonium sulfate",
    "óleo de girassol refinado": "refined sunflower oil", "ácido propiônico": "propionic acid", " e BHT": " and BHT",
    "Umidade": "Moisture", "proteína bruta": "crude protein", "extrato etéreo": "crude fat",
    "matéria fibrosa": "crude fiber", "matéria mineral": "ash", "cálcio": "calcium", "fósforo": "phosphorus",
    "sódio": "sodium", "potássio": "potassium", "Aminoácidos": "Amino acids", "Lisina": "Lysine",
    "metionina": "methionine", "Ácidos graxos essenciais": "Essential fatty acids",
    "Ômega": "Omega", "Nutrientes funcionais": "Functional nutrients",
    "Ingredientes e nutrientes funcionais": "Functional ingredients and nutrients",
    "Carnitina": "Carnitine", "taurina": "taurine", "lisina": "lysine", "mananoligossacarídeos": "mannan oligosaccharides",
    "beta-glucanas": "beta-glucans", "Vitaminas e minerais": "Vitamins and minerals",
    "Vitamina": "Vitamin", "vitamina": "vitamin", "selênio orgânico": "organic selenium", "zinco orgânico": "organic zinc",
    "Energia metabolizável": "Metabolizable energy", "Ferro": "Iron", "Cobre": "Copper", "Zinco": "Zinc",
    "Manganês": "Manganese", "Selênio": "Selenium", "Iodo": "Iodine", "Fosfatidilcolina": "Phosphatidylcholine",
    "máx.": "max.", "mín.": "min.", "UI": "IU",
    "*Valores por kg do produto, expressos em mínimos.": "*Values per kg of product, stated as minimums.",
  },
  es: {
    "Farinha de vísceras de aves": "Harina de vísceras de aves", "farinha de carne e ossos de bovino": "harina de carne y huesos de bovino",
    "farinha de torresmo": "harina de chicharrón", "farelo de glúten de milho": "harina de gluten de maíz",
    "grão de arroz": "grano de arroz", "grão de milho": "grano de maíz", "farelo de arroz": "salvado de arroz",
    "farelo de soja": "harina de soja", "levedura de cervejaria inativada desidratada": "levadura de cerveza inactiva deshidratada",
    "polpa desidratada de beterraba": "pulpa de remolacha deshidratada", "óleo de aves": "aceite de aves", "óleo de peixes": "aceite de pescado",
    "sulfato de glicosamina": "sulfato de glucosamina", "sulfato de condroitina": "sulfato de condroitina",
    "cloreto de sódio": "cloruro de sodio", "cloreto de potássio": "cloruro de potasio",
    "hidrolisado de fígado de aves": "hidrolizado de hígado de aves", "vitaminas": "vitaminas", "minerais": "minerales",
    "fosfatidilcolina": "fosfatidilcolina", "sulfato de ferro": "sulfato de hierro", "sulfato de cobre": "sulfato de cobre",
    "sulfato de zinco": "sulfato de zinc", "sulfato de manganês": "sulfato de manganeso",
    "selenito de sódio": "selenito de sodio", "iodato de cálcio": "yodato de calcio",
    "complexo ferro aminoácido": "complejo de hierro y aminoácidos", "complexo cobre aminoácido": "complejo de cobre y aminoácidos",
    "complexo zinco aminoácido": "complejo de zinc y aminoácidos", "complexo manganês aminoácido": "complejo de manganeso y aminoácidos",
    "proteinato de selênio": "proteinato de selenio", "parede celular de levedura": "pared celular de levadura",
    "aditivo prebiótico": "aditivo prebiótico", "zeólita": "zeolita", "extrato de yucca": "extracto de yuca",
    "aditivo regulador de acidez": "regulador de acidez", "ácido cítrico": "ácido cítrico",
    "cloreto de amônio": "cloruro de amonio", "sulfato de amônio": "sulfato de amonio",
    "óleo de girassol refinado": "aceite de girasol refinado", "ácido propiônico": "ácido propiónico", " e BHT": " y BHT",
    "Umidade": "Humedad", "proteína bruta": "proteína bruta", "extrato etéreo": "extracto etéreo",
    "matéria fibrosa": "fibra bruta", "matéria mineral": "materia mineral", "cálcio": "calcio", "fósforo": "fósforo",
    "sódio": "sodio", "potássio": "potasio", "Aminoácidos": "Aminoácidos", "Lisina": "Lisina",
    "metionina": "metionina", "Ácidos graxos essenciais": "Ácidos grasos esenciales",
    "Ômega": "Omega", "Nutrientes funcionais": "Nutrientes funcionales",
    "Ingredientes e nutrientes funcionais": "Ingredientes y nutrientes funcionales",
    "Carnitina": "Carnitina", "taurina": "taurina", "lisina": "lisina", "mananoligossacarídeos": "mananooligosacáridos",
    "beta-glucanas": "beta-glucanos", "Vitaminas e minerais": "Vitaminas y minerales",
    "Vitamina": "Vitamina", "selênio orgânico": "selenio orgánico", "zinco orgânico": "zinc orgánico",
    "Energia metabolizável": "Energía metabolizable", "Ferro": "Hierro", "Cobre": "Cobre", "Zinco": "Zinc",
    "Manganês": "Manganeso", "Selênio": "Selenio", "Iodo": "Yodo", "Fosfatidilcolina": "Fosfatidilcolina",
    "máx.": "máx.", "mín.": "mín.",
    "*Valores por kg do produto, expressos em mínimos.": "*Valores por kg de producto, expresados como mínimos.",
  },
};

function translate(text: string, locale: "en" | "es"): string {
  const entries = Object.entries(terms[locale]).sort(([a], [b]) => b.length - a.length);
  const pattern = new RegExp(entries.map(([source]) => source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
  const mapped = new Map(entries);
  return text.replace(pattern, (match) => mapped.get(match) ?? match);
}

export function translateSpecs(specs: Specs, locale: Locale): Specs {
  if (locale === "pt") return specs;
  return {
    composition: translate(specs.composition, locale),
    guarantee: translate(specs.guarantee, locale),
    enrichment: translate(specs.enrichment, locale),
  };
}
