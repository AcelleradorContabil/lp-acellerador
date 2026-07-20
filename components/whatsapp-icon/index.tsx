"use client";

import { MessageCircle } from "lucide-react";
import { trackWhatsappClick } from "@/lib/analytics";

function FloatingWhatsappButton() {
    const message = "Olá, estou vindo da página do Acellerador e gostaria de mais informações!";
    const whatsappUrl = `https://wa.me/5551993437038?text=${message}`;

    return (
        <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsappClick("floating")}
        className="fixed bottom-24 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-40"
        aria-label="Fale conosco no WhatsApp"
        >
        <MessageCircle className="w-6 h-6" />
        </a>
    );
}

export default FloatingWhatsappButton;