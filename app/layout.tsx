import type { Metadata } from "next";
import { fontDisplay, fontBody } from "../lib/fonts";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SmoothScroll from "../components/layout/SmoothScroll";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Dinesh Abbi",
  description: "I build software systems, end to end — and lately, I'm teaching myself what's next in AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-bg-primary text-text-primary font-sans flex flex-col min-h-screen" suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster theme="dark" position="bottom-right" />
        </SmoothScroll>
      </body>
    </html>
  );
}
