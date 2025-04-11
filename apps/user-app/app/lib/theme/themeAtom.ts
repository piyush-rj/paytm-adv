"use client"
import { atom } from "recoil"

export type Theme = "light" | "dark"

export const themeAtom = atom({
    key: "themeState",
    default: "light",
    effects: [
        ({ setSelf, onSet }) => {
            const stored = localStorage.getItem("theme") as Theme | null;

            if (stored === "dark" || stored === "light") {
                setSelf(stored);
                document.documentElement.classList.toggle("dark", stored === "dark");
            }

            onSet((newTheme) => {
                localStorage.setItem("theme", newTheme);
                document.documentElement.classList.toggle("dark", newTheme === "dark")
            })
        }
    ]
})