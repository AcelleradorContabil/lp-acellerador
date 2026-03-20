"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface Package {
  name: string;
  ideal_for: string;
  includes: string[];
  sla?: {
    whatsapp: string;
    ajustes: string;
  };
  investment: {
    [key: string]: string;
  };
  support?: string[];
  governance_security_sla?: string[];
  roi_scalability?: string[];
}

const packages: Package[] = [
  {
    name: "Starter Pack",
    ideal_for: "Escritórios com até 100 CNPJs",
    includes: [
      "Até 5 robôs padrão (DP e Fiscal)",
      "Painel AcelleraHub",
      "Monitoramento ativo das 8h às 18h - robô roda 24hrs",
      "Parametrização inicial (DP e Fiscal)",
      "Suporte via WhatsApp Central",
      "NPS mensal automatizado",
      "Infraestrutura AcelleraInfra (1 usuário)",
    ],
    sla: {
      whatsapp: "até 5 min",
      ajustes: "resposta em até 24h úteis, execução em até 72h úteis",
    },
    investment: {
      "50_cnpjs": "R$ 500/mês",
      "100_cnpjs": "R$ 800/mês",
      implantacao: "R$ 1.500 (ou R$ 1.000 à vista)",
      excedente: "R$ 2,00 por operação/CNPJ",
    },
  },
  {
    name: "Growth Pack",
    ideal_for: "Escritórios com 101 a 300 CNPJs",
    includes: [
      "Tudo do Starter Pack +",
      "Até 8 robôs ativos (DP + Fiscal)",
      "Acesso ao AcelleraHub",
      "Parametrização completa e estratégica",
      "Monitoramento ativo com prioridade de atendimento",
      "Infraestrutura AcelleraInfra para até 3 usuários simultâneos",
      "NPS mensal + call de acompanhamento (30 min)",
      "Reunião estratégica trimestral com Head Técnico",
      "Auditoria trimestral de uso dos robôs",
      "Sugestões proativas de novos robôs",
    ],
    sla: {
      whatsapp: "até 5 min",
      ajustes: "resposta em até 24h úteis, execução em até 72h úteis",
    },
    investment: {
      mensalidade: "R$ 2.500",
      implantacao: "R$ 2.500 (ou R$ 1.750 à vista)",
      excedente: "R$ 2,00 por operação/CNPJ",
    },
  },
  {
    name: "Scale Pack",
    ideal_for: "Escritórios com 301 a 500 CNPJs",
    includes: [
      "Tudo do Growth Pack +",
      "Até 12 robôs ativos (padrão + sob demanda)",
      "1 robô sob demanda/trimestre (sem custo de criação)",
      "Infraestrutura AcelleraInfra para até 5 usuários simultâneos",
      "Monitoramento com IA + ProcessPilots",
      "Auditoria mensal de uso dos robôs",
      "Check técnico antes da ativação",
      "Plano de automação por setor",
      "Reuniões mensais + revisão estratégica com liderança Head técnico",
    ],
    sla: {
      whatsapp: "até 5 min",
      ajustes: "resposta em até 24h úteis, execução em até 48h úteis",
    },
    investment: {
      mensalidade: "Fale conosco",
    },
  },
  {
    name: "Enterprise",
    ideal_for:
      "Para escritórios que precisam de performance máxima, suporte exclusivo e estrutura robusta.",
    includes: [
      "Tudo do Scale Pack +",
      "Implantação e operação de robôs hiperpersonalizados",
      "Acesso completo à plataforma AcelleraHub",
      "Robôs rodando em servidores dedicados com VPN segura",
      "Integração com infraestrutura própria (AcelleraInfra)",
      "Até 20 robôs personalizados",
      "Licenças ilimitadas de usuários",
      "Dashboards com uso, status e performance",
      "Canal exclusivo para solicitação de melhorias",
    ],
    sla: {
      whatsapp: "até 5 min",
      ajustes: "resposta em até 24h úteis, execução em até 48h úteis",
    },
    investment: {
      mensalidade: "Fale conosco",
    },
  },
];

const getPackageColor = (index: number) => {
  const colors = [
    "from-green-500 to-green-600",
    "from-orange-500 to-orange-600",
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
  ];
  return colors[index] || colors[0];
};

export function Packages() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % packages.length);
    }, 20000);

    return () => clearInterval(interval);
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % packages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + packages.length) % packages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleContractPackage = ({
    package: selectedPackage,
  }: {
    package: Package;
  }) => {
    console.log("Package selected:", selectedPackage);
    const message = encodeURIComponent(
      `Olá! Gostaria de finalizar a compra do pacote  ${selectedPackage.name}`
    );
    const whatsappNumber = "5551993437038";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="py-20 bg-gradient-to-br relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossos <span className="text-mainOrange">Pacotes</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Escolha o plano ideal para o seu escritório contábil e acelere seus
            processos com nossa automação inteligente
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div
              className={`bg-gradient-to-r ${getPackageColor(
                currentSlide
              )} p-8 text-white`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-bold">
                  {packages[currentSlide].name}
                </h3>
                {/* <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium">
                    {currentSlide + 1} de {packages.length}
                  </span>
                </div> */}
              </div>
              <p className="text-lg opacity-90">
                {packages[currentSlide].ideal_for}
              </p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    O que está incluso:
                  </h4>
                  <ul className="space-y-3">
                    {packages[currentSlide].includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {packages[currentSlide].support && (
                    <div className="mt-6">
                      <h5 className="font-semibold text-gray-900 mb-3">
                        Atendimento e Suporte:
                      </h5>
                      <ul className="space-y-2">
                        {packages[currentSlide].support.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-4 h-4 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      💰 Investimento
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(packages[currentSlide].investment).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center"
                          >
                            <span className="text-gray-600 capitalize">
                              {key.replace(/_/g, " ").replace("cnpjs", "CNPJs")}
                              :
                            </span>
                            {value === "Fale conosco" ? (
                              <a
                                href={`https://wa.me/5551993437038?text=Olá! Gostaria de saber mais sobre o pacote ${packages[currentSlide].name}`}
                                target="_blank"
                                className="font-semibold text-blue-600 hover:underline"
                              >
                                <span className="font-semibold text-blue-600">
                                  {value}
                                </span>
                              </a>
                            ) : (
                              <span className="font-semibold text-black">
                                {value}
                              </span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {packages[currentSlide].sla && (
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        📊 SLA
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">WhatsApp:</span>
                          <span className="font-semibold text-blue-600">
                            {packages[currentSlide].sla.whatsapp}
                          </span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-gray-600">Ajustes:</span>
                          <span className="font-semibold text-blue-600 text-right text-sm">
                            {packages[currentSlide].sla.ajustes}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() =>
                    handleContractPackage({ package: packages[currentSlide] })
                  }
                  className={`bg-gradient-to-r ${getPackageColor(
                    currentSlide
                  )} text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  Contratar {packages[currentSlide].name}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {packages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
