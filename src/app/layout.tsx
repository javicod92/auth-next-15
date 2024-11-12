import { NotificationProvider } from "@/context/NotificationContext";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Next 15",
  description: "Authentication system with Next.js 15 ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NotificationProvider>
          <main className="min-h-screen flex flex-col items-center justify-center">
            {children}
          </main>
        </NotificationProvider>
      </body>
    </html>
  );
}
