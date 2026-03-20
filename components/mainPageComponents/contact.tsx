"use client";
import Image from "next/image";
import { LeadForm } from "../lead-form";

const Contact = () => {
  return (
    <section id="contato" className="scroll-mt-20 pb-20">
      <div className="flex gap-8 items-center flex-col text-white w-full px-10 h-auto my-20 justify-center animate-fade [scale:0.7] opacity-0 [animation-timeline:view()] [animation-range-start:cover] [animation-range-end:400px]">
        <div className="md:flex gap-2">
          <h1 className="text-4xl text-center flex gap-2">Acellere</h1>
          <h1 className="text-4xl text-center text-white flex gap-2">
            sua contabilidade!
          </h1>
        </div>

        <div className="flex md:flex-row flex-col gap-4">
          <LeadForm />
          <Image
            className="rounded-md"
            alt=""
            src="/mapa.png"
            height={300}
            width={550}
          />
        </div>
      </div>
    </section>
  );
};

export { Contact };
