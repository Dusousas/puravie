"use client";

import React, { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type ContactProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Contact({ locale, dict }: ContactProps) {
  const ABOUT_OPTIONS = (dict?.contact?.about?.options ?? []) as string[];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");

  // Dropdown
  const [about, setAbout] = useState<string>("");
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  // fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!aboutRef.current) return;
      if (!aboutRef.current.contains(e.target as Node)) setIsAboutOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // fecha no ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setIsAboutOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <section id="contato" className="bgContact py-10">
        <div className="maxW flex flex-col lg:items-end lg:justify-end">
          <form
            className="bg-[#F0F0F0] text-black p-8 rounded-2xl lg:w-[600px]"
            action=""
          >
            <h3 className="text-vermelhop uppercase font-semibold text-3xl mb-6">
              {dict?.contact?.title ?? "Contact"}
            </h3>

            {/* Nome */}
            <div>
              <label className="text-sm text-black">
                {dict?.contact?.fullName?.label ?? "Full name"}
              </label>
              <input
                className="bg-white w-full rounded-lg p-2 text-black mt-2 outline-none"
                placeholder={
                  dict?.contact?.fullName?.placeholder ?? "Your name"
                }
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                name="fullName"
              />
            </div>

            {/* Email */}
            <div className="mt-4">
              <label className="text-sm text-black">
                {dict?.contact?.email?.label ?? "Email"}
              </label>
              <input
                className="bg-white w-full rounded-lg p-2 text-black mt-2 outline-none"
                placeholder={dict?.contact?.email?.placeholder ?? "Your email"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>

            {/* Whatsapp */}
            <div className="mt-4">
              <label className="text-sm text-black">
                {dict?.contact?.phone?.label ?? "Phone"}
              </label>

              <div className="mt-2 phoneWrap">
                <PhoneInput
                  defaultCountry={locale === "pt" ? "BR" : "US"}
                  international
                  countryCallingCodeEditable={false}
                  value={phone}
                  onChange={setPhone}
                  placeholder={
                    dict?.contact?.phone?.placeholder ?? "WhatsApp number"
                  }
                />
              </div>

              {/* hidden para submit */}
              <input type="hidden" name="phone" value={phone ?? ""} />
            </div>

            {/* SOBRE - DROPDOWN */}
            <div className="mt-4" ref={aboutRef}>
              <label className="text-sm text-black">
                {dict?.contact?.about?.label ?? "About"}
              </label>

              <button
                type="button"
                onClick={() => setIsAboutOpen((v) => !v)}
                className="bg-white w-full rounded-lg p-2 text-black mt-2 outline-none flex items-center justify-between"
                aria-haspopup="listbox"
                aria-expanded={isAboutOpen}
              >
                <span className={about ? "text-black" : "text-black/60"}>
                  {about || dict?.contact?.about?.placeholder || "Select"}
                </span>

                {/* Setinha */}
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isAboutOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isAboutOpen && (
                <div className="relative">
                  <ul
                    role="listbox"
                    className="absolute z-20 mt-2 w-full bg-white rounded-lg overflow-hidden shadow-md border border-black/5"
                  >
                    {ABOUT_OPTIONS.map((item: string) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => {
                            setAbout(item);
                            setIsAboutOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-black hover:bg-black/5 transition ${
                            about === item ? "font-semibold" : ""
                          }`}
                          role="option"
                          aria-selected={about === item}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* hidden pra enviar no form (se precisar) */}
              <input type="hidden" name="about" value={about} />
            </div>

            {/* Mensagem */}
            <div className="mt-4">
              <label className="text-sm text-black">
                {dict?.contact?.message?.label ?? "Message"}
              </label>
              <textarea
                className="bg-white w-full rounded-lg resize-none mt-2 p-2 text-black"
                rows={4}
                placeholder={
                  dict?.contact?.message?.placeholder ?? "Write your message"
                }
                name="message"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-vermelhop uppercase cursor-pointer text-white font-semibold py-3 rounded-xl hover:opacity-95 transition"
            >
              {dict?.contact?.button ?? "Send"}
            </button>

            <p className="mt-6 text-sm text-vermelhop text-right">{dict?.contact?.contactBar?.email ?? "email@email.com"}</p>
            <p className="text-sm text-vermelhop text-right">{dict?.contact?.contactBar?.phone ?? "(00) 00000-0000"}</p>
          </form>
        </div>

      </section>
    </>
  );
}
