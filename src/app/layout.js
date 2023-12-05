// "use client";
import "../styles/globals.css";

import { Montserrat } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import { Sidebar } from "@/components/Sidebar";
// import { useState } from "react";
import Header from "@/components/Header";

const montserrat = Montserrat({ subsets: ["latin"] });
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
export default function RootLayout({ children }) {
  const metadata = {
    title: "Stastiem personal application",
    description: "Generated by create next app",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  };
  // const [isOpen, setIsOpen] = useState(false);
  // const openSidebar = () => {
  //   setIsOpen(true);
  // };
  // const closeSidebar = () => {
  //   setIsOpen(false);
  // };
  return (
    <html lang="en">
      <head>
        {metadata && (
          <>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            {/* <meta name="viewport" content={metadata.viewport} /> */}
          </>
        )}
      </head>
      <body className={`${montserrat.className}`}>
        <ReduxProvider>
          <Header />
          {children}
          <div id="modal-root"></div>
          <ToastContainer />
          {/* <Sidebar onClose={closeSidebar} isOpen={isOpen} /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
