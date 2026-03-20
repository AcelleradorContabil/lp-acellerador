import { Partners } from "./partners";

const WrapperPartners = async () => {
  // const fetchPartners = await fetch("http://localhost:3000/api/get-partners", {
  //   method: "GET",
  // });

  // const partners = await fetchPartners.json();
  const partners = [
    "cardeal.png",
    "cg.png",
    "ecs.png",
    "lk.png",
    "mazzola.png",
    "medassist.svg",
    "megaoffice.png",
    "moreiraemendes.webp",
    "silveirasoares.png",
    "conzatti.png",
    "3c.jpg",
    "akartos.webp",
    "apice.webp",
    "contabexpress.png",
    "ers.webp",
    "omnia.png",
    "pessato.png",
    "zeleve.png",
  ];
  
  return (
    <>
      <Partners partners={partners} />
    </>
  );
};

export { WrapperPartners };
