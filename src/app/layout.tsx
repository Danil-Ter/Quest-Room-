import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Escape Room",
  description: "website for quest rooms",
};

import Header from "./components/Header";
import Social from "./components/Social";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body
                className={`${raleway.className}`}
            >
        <Header />
        <Social />
        {children}

      </body>
    </html>
  );
}
