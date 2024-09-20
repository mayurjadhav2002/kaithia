"use client";

import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "@/components/context/AppContext";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
		<title>Kaithia</title>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
          onLoad={() => {
            console.log("Telegram Web Apps SDK loaded");
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <div className="relative lg:w-2/4 lg:mx-auto w-full md:w-2/4 md:mx-auto xl:w-1/4 xl:mx-auto h-screen bg-white" >
            <div className="">{children}</div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
