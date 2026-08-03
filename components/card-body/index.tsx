"use client";

import React, { useRef, useState } from "react";
import { RobotCard } from "../robot-card";
import Image from "next/image";
import { useScrollToSection } from "@/hooks/useScrollToSection";

type CardType = {
    title: string;
    videoUrl: string;
    features: string[];
    description?: string;
};

type Props = {
    cardsData: CardType[];
};

const CardBody = ({ cardsData }: Props) => {
    const [activeCard, setActiveCard] = useState<{ title: string; url: string }>({
        title: "",
        url: "",
    });
    const [showMoreCards, setShowMoreCards] = useState<boolean>(false);
    const { scrollToSection } = useScrollToSection();

    const videoRef = useRef<HTMLIFrameElement>(null);

    const handleCardClick = (url: string, title: string) => {
        if (activeCard) {
        scrollToSection("produtos");
        }

        setActiveCard(() => ({ title, url }));
    };

    const mainCards = cardsData.slice(0, 3);
    const otherCards = cardsData.slice(3);

    return (
        <div className="flex gap-5 flex-col py-8 px-6 text-white">
        <div>
            {!!activeCard.title && (
            <iframe
                src={activeCard.url}
                className="w-full h-[600px] rounded-md"
                frameBorder="0"
                allowFullScreen
            />
            )}
        </div>
        <div
            className="flex gap-4 sm:flex-row flex-col flex-wrap justify-center"
            ref={videoRef}
        >
            {mainCards?.map((item) => (
            <RobotCard
                active={activeCard.title === item.title}
                key={item.title}
                title={item.title}
                videoUrl={item.videoUrl}
                handleClick={(url) => handleCardClick(url, item.title)}
                features={item.features}
                description={item.description}
            />
            ))}
            {showMoreCards && (
            <div
                className={`flex gap-4 flex-wrap transition-all duration-500 ease-out animate-fade-scale items-center justify-center ${
                showMoreCards ? "opacity-100" : "opacity-0"
                }`}
            >
                {otherCards &&
                otherCards.map((item, index) => (
                    <RobotCard
                    key={item.title}
                    active={activeCard.title === item.title}
                    title={item.title}
                    videoUrl={item.videoUrl}
                    handleClick={(url) => handleCardClick(url, item.title)}
                    index={index}
                    features={item.features}
                    description={item.description}
                    />
                ))}
            </div>
            )}
        </div>
        <div
            className={`flex flex-col items-center border-t border-white gap-5 cursor-pointer transition-all ease-in-out duration-600 ${
            showMoreCards ? "translate-y-3" : "translate-y-0"
            }`}
            onClick={() => setShowMoreCards((prev) => !prev)}
        >
            <h1 className="pt-4">{showMoreCards ? "Fechar" : "Veja mais"}</h1>
            <Image
            className={`${!showMoreCards && "animate-bounce"}`}
            alt="Ícone para ver mais robos"
            src={`/icon/${showMoreCards ? "arrow-top.svg" : "arrow-bottom.svg"}`}
            width={28}
            height={28}
            />
        </div>
        </div>
    );
};

export { CardBody };