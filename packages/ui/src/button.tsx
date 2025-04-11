"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="dark:bg-gradient-to-tl dark:from-gray-900 dark:to-black dark:border dark:border-gray-700 rounded-xl px-6 py-2 backdrop-blur-sm shadow-inner mt-5 transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.1)] hover:dark:from-gray-800 hover:dark:to-gray-950 hover:scale-[1.02]"
    >
      {children}
    </button>
  );
};
