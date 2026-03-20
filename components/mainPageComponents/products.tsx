"use client";
import { CardBody } from "../card-body";

const cardsData = [
  {
    title: "DCTF WEB",
    videoUrl: "https://www.youtube.com/embed/0mxEvzoj8kI",
    features: ["DP", "Emissão", "Conferência", "Eventos Periódicos"],
    description:
      "Realiza conferência dos valores da Domínio x valores do e-Cac, em caso de igualdade salva guia e em caso de transmissão recibo e declaração",
  },
  {
    title: "REINF",
    videoUrl: "https://www.youtube.com/embed/66oMW_UkQnc",
    features: ["Fiscal", "Emissão", "Precisão"],
    description:
      "Apuração da empresa no Domínio, transmissão completa dos blocos, salva relatório de envio no Domínio e totalizadores no eCac",
  },
  {
    title: "FGTS",
    videoUrl: "https://www.youtube.com/embed/tYlcLEI9ShY",
    features: ["DP", "Emissão", "Conferência", "Eventos Periódicos"],
    description:
      "Realiza conferência dos valores da Domínio x FGTS Digital, em caso de igualdade salva guia e detalhamento do site",
  },
  {
    title: "RESCISÃO",
    videoUrl: "https://www.youtube.com/embed/74rR0g5cphs",
    features: ["DP", "Emissão"],
    description:
      "Automatiza todo o processo de rescisão, gerando e salvando todos os documentos necessários.",
  },
  {
    title: "FOLHA",
    videoUrl: "https://www.youtube.com/embed/RF_AuQPXfRM",
    features: ["DP", "Emissão"],
    description:
      "Salva os relatórios da folha em pdf para envio ao cliente (extrato mensal, relatórios de pensão, recibos de pagamentos, relatório de líquidos, etc,)",
  },
];

const Products = () => {
  return (
    <section id="produtos" className="scroll-mt-20">
      <h1 className="text-4xl text-center text-white">
        Conheça alguns de nossos robôs
      </h1>
      <div className="flex gap-5 w-[60%] justify-center mx-auto">
        <CardBody cardsData={cardsData} />
      </div>
    </section>
  );
};

export { Products };
