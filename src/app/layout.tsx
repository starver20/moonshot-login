import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/navbar";
import { Toaster } from 'react-hot-toast';
import { UserProvider } from "./_context/user-context";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "E-commerce",
  description: "Find all your daily needs here",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
      <Toaster position="bottom-center"/>
        <TRPCReactProvider>
          <UserProvider>
          <Navbar/>

          {children}
          
          </UserProvider>
          </TRPCReactProvider>
      </body>
    </html>
  );
}
