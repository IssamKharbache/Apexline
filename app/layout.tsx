import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/header/Navbar";
import MiniNavbar from "./components/header/MiniNavbar";

const bebasNeue = Bebas_Neue({
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Apexline",
  description: "Web application to visualize F1 races schedules",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.className} antialiased`}>
        <Navbar />
        <MiniNavbar />
        {children}
      </body>
    </html>
  );
}
