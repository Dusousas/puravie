import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

export default async function SobreNosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  const dict = await getDictionary(locale);

  return (
    <>
      <section className="py-10 bg-white">
        <div className="maxW">
          <div className="">
            <video
              className="w-full  mx-auto  shadow-lg h-[600px] object-cover object-top"
              src="/sobre-nos.mp4"
              controls
              playsInline
              preload="metadata"
            />
          </div>

          <article className="mt-10">
            <h2 className="text-vermelhop text-3xl font-semibold">
              {dict.about?.title ?? "Sobre nós"}
            </h2>

            <p className="mt-4 text-black max-w-4xl">
              {dict.about?.description ??
                "Saiba mais sobre a nossa marca e o nosso compromisso com o bem-estar dos seus pets."}
            </p>
          </article>

          <article className="bg-vermelhop items-center flex justify-center gap-x-20 py-20 px-10 mt-10 ">
            <div className="lg:w-1/3">
              <h2 className="text-3xl text-white font-semibold">
                {dict.about?.mission?.title ?? "Sobre nós"}
              </h2>
              <p className="mt-4 text-white text-sm font-normal ">
                {dict.about?.mission?.description ??
                  "Saiba mais sobre a nossa marca e o nosso compromisso com o bem-estar dos seus pets."}
              </p>
            </div>

            <div className="lg:w-1/3">
              <h2 className="text-3xl text-white font-semibold">
                {dict.about?.commitment?.title ?? "Sobre nós"}
                <p className="mt-4 text-white text-sm font-normal ">
                  {dict.about?.commitment?.description ??
                    "Saiba mais sobre a nossa marca e o nosso compromisso com o bem-estar dos seus pets."}
                </p>
              </h2>
            </div>

            <div className="lg:w-1/3">
              <h2 className="text-3xl text-white font-semibold">
                {dict.about?.values?.title ?? "Nossos Valores"}
              </h2>

              <ul className=" text-white/90 mt-4">
                {(dict.about?.values?.list ?? []).map(
                  (
                    item:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined,
                    idx: Key | null | undefined,
                  ) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-white/80 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </article>

          <article className="mt-10 flex items-center justify-center gap-x-20">
            <div className="lg:w-1/2">
              <h3 className="text-black font-semibold text-2xl">
                {dict.about?.packaging?.title ?? "Sobre nós"}
              </h3>

              <p className="mt-4 text-black">
                {dict.about?.packaging?.description1 ??
                  "Saiba mais sobre a nossa marca e o nosso compromisso com o bem-estar dos seus pets."}
              </p>
              <p className="mt-2 text-black">
                {dict.about?.packaging?.description2 ??
                  "Saiba mais sobre a nossa marca e o nosso compromisso com o bem-estar dos seus pets."}
              </p>
              <p className="mt-2 text-black">
                {dict.about?.packaging?.description3 ??
                  "Saiba mais sobre a nossa marca e o nosso compromisso com o bem-estar dos seus pets."}
              </p>
              <p className="mt-2 text-black">
                {dict.about?.packaging?.description4 ??
                  "Saiba mais sobre a nossa marca e o nosso compromisso com o bem-estar dos seus pets."}
              </p>
              <p className="mt-2 text-black font-semibold">
                {dict.about?.packaging?.description5 ??
                  "Saiba mais sobre a nossa marca e o nosso compromisso com o bem-estar dos seus pets."}
              </p>
            </div>

            <div className="flex flex-col gap-y-4">
              <img className="" src="/selo_eu-reciclo.avif" alt="" />
              <img className="" src="/produtos/100.svg" alt="" />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
