"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Play, ArrowRight, Zap } from "lucide-react";
import { useCart, robotsData } from "@/app/cart-context";

type Props = {
    title: string;
    description?: string;
    videoUrl: string;
    handleClick: (url: string) => void;
    active: boolean;
    className?: string;
    index?: number;
    icon?: string;
    features?: string[];
};

const RobotCard = ({
    title,
    description = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    videoUrl,
    handleClick,
    active,
    className,
    index = 0,
    features = ["Automação", "Eficiência", "Precisão"],
}: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addItem, toggleCart } = useCart();

    const handleClickCard = (e: React.MouseEvent) => {
        e.preventDefault();
        handleClick(videoUrl);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        const robotData = robotsData.find(robot => robot.title === title);
        const defaultPrice = robotData?.defaultPrice || 1.50;
        const robotId = robotData?.id || title.toLowerCase().replace(/\s+/g, '-');
        
        addItem({
        id: robotId,
        title,
        price: defaultPrice,
        unitPrice: defaultPrice,
        });
        
        toggleCart();
    };

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{
            y: -8,
            transition: { duration: 0.2 },
        }}
        className={`
            group relative overflow-hidden
            rounded-2xl border border-gray-200/50
            bg-white/80 backdrop-blur-sm
            cursor-pointer transition-all duration-300
            flex-1 min-w-[320px] max-w-[400px] m-3
            shadow-lg hover:shadow-2xl
            ${
            active
                ? "ring-2 ring-blue-500/50 ring-offset-2 ring-offset-blueAcellera"
                : ""
            }
            ${className}
        `}
        onClick={handleClickCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        {/* Gradient overlay background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30" />

        {/* Animated background elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:rotate-45" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-2xl transition-all duration-700 group-hover:scale-125" />

        {/* Card content */}
        <div className="relative p-6 flex flex-col h-full z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {title}
                </h3>

                {/* Price display */}
                <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">A partir de</span>
                <span className="text-lg font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    R${" "}
                    {robotsData
                    .find((robot) => robot.title === title)
                    ?.defaultPrice.toFixed(2) || "1.50"}
                </span>
                <span className="text-sm text-gray-500">/CNPJ</span>
                </div>
            </div>

            {/* Status indicator */}
            <div className="flex flex-col items-end">
                <div className="flex items-center mb-2">
                <span
                    className={`h-2 w-2 rounded-full mr-2 ${
                    active ? "bg-green-500 animate-pulse" : "bg-gray-300"
                    }`}
                />
                <span
                    className={`text-xs font-medium ${
                    active ? "text-green-600" : "text-gray-500"
                    }`}
                >
                    {active ? "Ativo" : "Disponível"}
                </span>
                </div>

                {/* Play button for video */}
                <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300"
                >
                <Play className="w-4 h-4 text-blue-600 ml-0.5" />
                </motion.div>
            </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
            {description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
            {features.map((feature, i) => (
                <span
                key={i}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100 hover:border-blue-200 transition-colors duration-200"
                >
                {feature}
                </span>
            ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                flex-1 py-3 px-4 rounded-xl font-medium text-sm
                transition-all duration-300 flex items-center justify-center gap-2
                ${
                    active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }
                `}
            >
                <span>{active ? "Assistir Demo" : "Ver Detalhes"}</span>
                <ArrowRight
                className={`w-4 h-4 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                }`}
                />
            </motion.button>

            {/* Add to cart button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl group"
                title="Adicionar ao carrinho"
            >
                <ShoppingCart className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </motion.button>
            </div>
        </div>

        {/* Hover glow effect */}
        <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
            background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
        />
        </motion.div>
    );
};

export { RobotCard };