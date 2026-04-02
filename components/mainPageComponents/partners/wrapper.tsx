import { Partners } from "./partners";

const WrapperPartners = async () => {
  // const fetchPartners = await fetch("http://localhost:3000/api/get-partners", {
  //   method: "GET",
  // });

  // const partners = await fetchPartners.json();
  const partners = [
    "akartos.webp",
    "apice.png",
    "cg.jpg",
    "contabexpress.png",
    "ecs.png",
    "exatus.png",
    "fisco brasil.png",
    "focosmais.jpg",
    "fortus.avif",
    "funcional.png",
    "grupoinn.webp",
    "jjr.jpg",
    "macrocont.webp",
    "mast.png",
    "max.jpeg",
    "megaoffice.png",
    "pessato.png",
    "rsm contabilidade.jpg",
    "samapli.png",
    "silveira soares.jpg",
    "sousa e couto.jpg",
    "zip.png",
  ];
  
  return (
    <>
      <Partners partners={partners} />
    </>
  );
};

export { WrapperPartners };
