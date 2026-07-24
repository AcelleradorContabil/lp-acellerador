// hooks/useActiveSection.tsx
import { useEffect, useState } from "react";

export const useActiveSection = (
    sectionIds: string[],
    offset: number = 100
) => {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
        const scrollPosition = window.scrollY + offset;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
            const section = document.getElementById(sectionIds[i]);
            if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                if (activeSection !== sectionIds[i]) {
                setActiveSection(sectionIds[i]);
                }
                return;
            }
            }
        }

        if (window.scrollY < 100 && activeSection !== sectionIds[0]) {
            setActiveSection("inicio");
            window.history.replaceState(null, "", window.location.pathname);
        }
        };

        let timeoutId: NodeJS.Timeout;
        const debouncedHandleScroll = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleScroll, 50);
        };

        const hash = window.location.hash.slice(1);
        if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash);
        } else {
        handleScroll();
        }

        window.addEventListener("scroll", debouncedHandleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
        window.removeEventListener("scroll", debouncedHandleScroll);
        window.removeEventListener("resize", handleScroll);
        clearTimeout(timeoutId);
        };
    }, [activeSection, sectionIds, offset]);

    return activeSection;
};