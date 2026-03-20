"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Partners = ({ partners }: { partners: string[] }) => {
  const CustomMarquee = ({
    reverse,
    partners,
  }: {
    reverse: boolean;
    partners: string[];
  }) => {
    let partnersData = partners;

    if (reverse) {
      partnersData = [...partners].reverse();
    }

    return (
      <Marquee>
        {partnersData.map((item) => {
          let customSize = 0;
          let isDarkItem = false;

          if (
            item === "lk.png" ||
            item === "medassist.svg" ||
            item === "cg.png"
          ) {
            customSize = 75;
          }

          if (item === "3c.jpg" || item === "apice.webp") {
            customSize = 120
          }
          if (
            item === "cardeal.png" ||
            item === "ers.webp" ||
            item === "conzatti.png" ||
            item === "contabexpress.png"
          ) {
            isDarkItem = true;
          }

          return (
            <div
              key={item}
              className={`${isDarkItem && "bg-white rounded-md"} p-2 px-4 mx-2`}
            >
              <Image
                alt={`Logo empresa ${item}`}
                src={`/partners/${item}`}
                height={customSize ? customSize : 200}
                width={customSize ? customSize : 200}
              />
            </div>
          );
        })}
      </Marquee>
    );
  };

  return (
    <section id="parceiros" className="scroll-mt-20">
      <div className="text-white w-full mt-28 px-10 h-auto flex items-center flex-col gap-20 justify-center animate-fade [scale:0.7] opacity-0 [animation-timeline:view()] [animation-range-start:cover] [animation-range-end:400px]">
        <h1 className="text-4xl text-center text-white">
          Alguns de Nossos Parceiros
        </h1>
        <CustomMarquee partners={partners} reverse={false} />
        <CustomMarquee partners={partners} reverse={true} />
      </div>
    </section>
  );
};

export { Partners };
