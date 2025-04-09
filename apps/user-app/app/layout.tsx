import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers>
            <Toaster 
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                fontSize: '14px'
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
            }}
            position="top-center" reverseOrder={false}/>
            <body className={inter.className}>{children}</body>
        </Providers>
      </body>
    </html>
  );
}
