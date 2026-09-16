import { Partners } from "./partners";

const WrapperPartners = async () => {
  // const fetchPartners = await fetch("http://localhost:3000/api/get-partners", {
  //   method: "GET",
  // });

  // const partners = await fetchPartners.json();
  const partners = [
    "akartos.webp",
    "apice.png",
    "auditar.svg",
    "cg.jpg",
    "contabexpress.png",
    "ecs.png",
    "exatus.png",
    "fisco brasil.png",
    "focosmais.jpg",
    "fortus.avif",
    "funcional.png",
    "jjr.jpg",
    "mast.png",
    "megaoffice.png",
    "pessato.png",
    "planning-logo.svg",
    "rsm contabilidade.jpg",
    "silveira soares.jpg",
    "zip.png",
  ];
  
  return (
    <>
      <Partners partners={partners} />
    </>
  );
};

export { WrapperPartners };
