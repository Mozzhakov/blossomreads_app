import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";

const montserrat = Montserrat({ subsets: ["latin"] });
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
};
export const metadata = {
  title: "Blossom Reads personal application",
  description: "Generated by create next app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://googleapis.com" />
        <link rel="preconnect" href="https://identitytoolkit.googleapis.com" />
      </head>
      <body className={`${montserrat.className}`}>
        <ReduxProvider>
          {children}
          <div id="modal-root"></div>
        </ReduxProvider>
      </body>
    </html>
  );
}
