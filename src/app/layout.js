import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import Header from "@/components/Header";
import styles from "../styles/main.module.css";

const montserrat = Montserrat({ subsets: ["latin"] });
// const capriola = Capriola({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-capriola",
// });

export const metadata = {
  title: "Stastiem personal app",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <div className={styles.container}>
          <ReduxProvider>
            <Header />
            {children}
            <div id="modal-root"></div>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
