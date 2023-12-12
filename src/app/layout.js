import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
// import "../scss/notifications.scss";

const montserrat = Montserrat({ subsets: ["latin"] });
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
};
export const metadata = {
  title: "Stastiem personal application",
  description: "Generated by create next app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <ReduxProvider>
          {children}
          <div id="modal-root"></div>
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
