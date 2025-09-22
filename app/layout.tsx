import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";

const geistSans = Poppins({
  weight:["400" , "500" , "700"],
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "StudentYug - One Student, One Tree, One Future",
  description: "StudentYug portal connecting students with sports guidance while promoting environmental responsibility through tree plantation. Grow knowledge, grow nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.className} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
