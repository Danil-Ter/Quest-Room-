import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import i18nConfig from '@/i18nConfig';
import Header from "../components/Header";
import Social from "../components/Social";
import Switch from "../components/LanguageChanger";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Escape Room",
  description: "website for quest rooms",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string }; 
}

export default function RootLayout({ children, params }: RootLayoutProps): JSX.Element {
  const { locale } = params; 
  return (
    <html lang={locale}>
      <body className={`${raleway.className}`}>
        <Header params={{ locale }} /> 
        <Social />
        <Switch />
        {children}
      </body>
    </html>
  );
}
