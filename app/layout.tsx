import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "./context";
import { CartProvider } from "./cart-context";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acellerador Contábil",
  description: "Conheça a nossa inovação tecnologica para empresas contábeis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <CartProvider>
          <body className={`${outfit.className} h-screen bg-blueAcellera`}>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                className: "",
                style: {
                  padding: "16px",
                  borderRadius: "4px",
                },
              }}
            />
          </body>
        </CartProvider>
      </GlobalContextProvider>
    </html>
  );
}
