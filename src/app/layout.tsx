import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header, { UserRoute } from "./components/header";
import { UserProvider } from "./components/accounts";

const inter = Inter({ subsets: ["latin"] });

const links = [
  {href: "/parent", label:"Parent"},
  {href: "/john", label:"John"},
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
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
