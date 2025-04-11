"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";


export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (

        <div 
            className={`flex cursor-pointer p-2 pl-8 rounded-md hover:text-black dark:hover:text-gray-200 hover:scale-105 transition-all transform  
                ${selected 
                    ? "text-[#000] dark:text-gray-200"
                    : "text-slate-500 dark:text-gray-400"}`} 
            onClick={() => {
                router.push(href);
            }}
        >
            <div className="pr-2">
                {icon}
            </div>
            <div className={`font-bold  ${selected 
                ? "text-[#000] dark:text-gray-200"
                : "text-slate-500 dark:text-gray-400"}`}>

                {title}
            </div>
        </div>
    );
}