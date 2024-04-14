import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header, { UserRoute } from "./components/header";

const inter = Inter({ subsets: ["latin"] });

const links = [
  {href: "/parent", label:"Parent", isChild: false},
  {href: "/john", label:"John", isChild: true},
] as UserRoute[]

export const metadata: Metadata = {
  title: "Famdit",
  description: "A prototype for Fin 6777 class",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
