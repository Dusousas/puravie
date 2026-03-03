"use client";

import Link from "next/link";


type FooterProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="bg-vermelhop py-10 text-white">
      <div className="container mx-auto px-4">
        {/* Logo Centralizado */}
        <Link href={`/${locale}`} className="flex justify-center mb-10">
          <img src="/logo.svg" alt="Logo" className="w-[250px]" />
    
        </Link>

        {/* Grid de Informações */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-white/20 pt-8">
          
          {/* Coluna 1: SAC */}
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-sm uppercase tracking-wider">Atendimento ao Consumidor</h4>
            <a href="mailto:sac@noupetcare.com" className="text-sm hover:underline">sac@noupetcare.com</a>
            <a href="https://wa.me/5519999448710" target="_blank" className="text-sm hover:underline">(19) 99944-8710</a>
          </div>

          {/* Coluna 2: Redes Sociais */}
          <div className="flex flex-col md:items-end gap-1">
            <p className="text-sm italic">{dict.footer?.socialText ?? "Siga-nos, interaja e participe da comunidade"}</p>
            <a 
              href="https://instagram.com/puravie" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-lg hover:opacity-80 transition-opacity"
            >
              @puravie
            </a>
          </div>

        </div>
        
        <div className="mt-10 text-center opacity-70 uppercase">
          <p>{dict.footer?.title ?? "© 2026 Noupetcare. Todos os direitos reservados."}</p>
          <p className="mt-2 text-sm">{dict.footer?.title2 ?? "Desenvolvido por Youon"} <a className="underline" target="_blank" href="www.agenciayouon.com">Youon</a></p>

        </div>
      </div>
    </footer>
  );
}