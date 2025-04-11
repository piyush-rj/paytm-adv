"use client"

import { useRecoilState } from "recoil"
import { themeAtom } from "../app/lib/theme/themeAtom"

export default function ThemeToggle() {
    const [theme, setTheme] = useRecoilState(themeAtom);
    
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <button
        onClick={toggleTheme}
        className={`p-2 rounded-full ${
            theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
        }`}
        aria-label="Toggle theme"
        >{theme === "light" ? '🌙' : '☀️'}</button>
    )
}