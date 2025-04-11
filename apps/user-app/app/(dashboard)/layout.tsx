"use client"

import { BackgroundBeams } from "../../components/background-lines";
import { SidebarItem } from "../../components/SidebarItem";
import ThemeToggle from "../../components/ThemeToggleButton";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black bg-white">
      <div className="absolute inset-0 -z-10 ">
        <BackgroundBeams/>
      </div>
      <div className="flex-1 px-4 pt-4 pb-24 dark:bg-black">{children}</div>

      {/* Bottom Navigation */}
    <div className="fixed bottom-0 left-0 right-0 z-50 mb-4 flex justify-center w-full">
      <div className="w-[90%] max-w-90% rounded-2xl border border-slate-800 bg-white dark:bg-gray-950 dark:border-slate-700 shadow-lg px-4 py-3 flex items-center justify-between">
        {/* Main Navigation */}
      <div className="flex justify-around flex-grow gap-4">
        <SidebarItem href="/dashboard" icon={<HomeIcon />} title="Home" />
        <SidebarItem href="/transfer" icon={<TransferIcon />} title="Wallet" />
        <SidebarItem href="/transactions" icon={<TransactionsIcon />} title="Transactions" />
        <SidebarItem href="/p2p" icon={<P2PTransferIcon />} title="P2P" />
      </div>

    {/* Divider */}
    <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2" />

        {/* Theme Toggle */}
        <div className="shrink-0 ml-2 mr-1">
          <ThemeToggle />
        </div>
      </div>
    </div>

    </div>
  );
}
function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}

function P2PTransferIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
}

function LightModeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
}

function DarkModeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>
}