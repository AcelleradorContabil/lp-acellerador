"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Start = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedTempo, setTypedTempo] = useState("");
  const [typedCrescimento, setTypedCrescimento] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const fullTempo = "executam";
  const fullCrescimento = "lideram.";

  useEffect(() => {
    // Fade-in animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Typing effect for "Tempo"
  useEffect(() => {
    if (typedTempo.length < fullTempo.length) {
      const timer = setTimeout(() => {
        setTypedTempo(fullTempo.slice(0, typedTempo.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else if (typedCrescimento.length < fullCrescimento.length) {
      // Start typing "Crescimento" after "Tempo" is complete
      const timer = setTimeout(() => {
        setTypedCrescimento(
          fullCrescimento.slice(0, typedCrescimento.length + 1)
        );
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setTypingComplete(true);
    }
  }, [typedTempo, typedCrescimento]);

  // Blinking cursor effect
  useEffect(() => {
    if (!typingComplete) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [typingComplete]);

  return (
    <section
      id="inicio"
      className={`
        scroll-mt-20 flex items-center justify-center
        w-full
        transform transition-all duration-1000 ease-out
        my-28 px-40
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className="md:px-0 px-10 md:mb-0 mb-11"> 
        <h1 className="md:text-[3.5rem] text-[3.5rem] leading-[4rem] w-[75%] text-4xl md:leading-normal text-white">
          Robôs{" "}
          <span className="bg-mainOrange px-2 py-1 rounded">
            {typedTempo}{"."}
          </span>
          {" Pessoas "}
          <span className="bg-mainOrange px-2 py-1 rounded">
            {typedCrescimento}
            {typedCrescimento.length < fullCrescimento.length && (
              <span className="animate-blink">|</span>
            )}
          </span>
          {typingComplete && (
            <span
              className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
            >
              {/* cursor opcional */}
            </span>
          )}
        </h1>
      </div>
      <div className="md:flex hidden">
        <Image
          alt=""
          src="/logos/Icones/RoboAlternativo.png"
          height={300}
          width={300}
          className={`
            transform transition-all duration-1000 ease-out delay-500
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
          `}
        />
      </div>
    </section>
  );
};

export { Start };
