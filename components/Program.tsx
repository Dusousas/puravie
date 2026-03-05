"use client";


type ProgramProps = {
  locale: "pt" | "en";
  dict: any;
};

export default function Program({ locale, dict }: ProgramProps) {
  return (
    <>
      <section id="satisfacao" className="bg-vermelhop/80 py-20">
        <div className="maxW flex flex-col justify-center lg:flex-row">
          <article className="lg:w-1/2">
            <h2 className="text-3xl font-bold uppercase tracking-wider text-white text-center lg:text-left">
              {dict.program?.title ?? "Program Title"}
            </h2>

            <div className="w-[160px] mt-10 lg:mt-4 mx-auto lg:mx-0">
              {dict.program?.badgeSrc && (
                <img
                  src={dict.program.badgeSrc}
                  alt="Selo 110% satisfação"
                  className="w-full h-auto"
                />
              )}
            </div>
          </article>

          <article className="lg:w-1/2">
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white text-center lg:text-left">
              {dict.program?.title2 ?? "Program Title"}
            </h3>

            <p className="mt-4 text-white text-center lg:text-left">
              {dict.program?.p ?? "Program Title"}
            </p>

            <ul className="mt-6 text-white font-semibold">
              {dict.program?.list?.map((item: string, index: number) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>

            <p className="mt-6 font-semibold">sac@noupetcare.com</p>
            <p className="font-semibold">(19) 99944-8710</p>
          </article>
        </div>
      </section>
    </>
  );
}
