import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " Trays Calculator",
  description:
    "Use this calculator to determine the number of trays required for a exrtraction column.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <main className="relative overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
