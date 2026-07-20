"use client";

import { useState } from "react";

// Input "glass" com ícone à esquerda — usado no formulário de contato
// (rodapé) e no modal de captura de lead, para que fiquem idênticos.
const GlassInput = ({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  textarea,
  rows,
}: {
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className={`
      relative flex items-start gap-3 rounded-xl px-4
      border transition-all duration-200
      ${focused
        ? "bg-white/[0.09] border-mainOrange/40 shadow-[0_0_0_3px_rgba(231,103,20,0.08)]"
        : "bg-white/[0.05] border-white/[0.09] hover:border-white/[0.15]"
      }
    `}>
      <Icon className={`w-4 h-4 mt-3.5 shrink-0 transition-colors duration-200 ${focused ? "text-mainOrange" : "text-white/30"}`} />
      <Tag
        type={type}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full py-3.5 bg-transparent outline-none text-sm text-white placeholder-white/30
          caret-mainOrange resize-none
        `}
      />
    </div>
  );
};

export { GlassInput };
