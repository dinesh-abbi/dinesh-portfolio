import type { Metadata } from "next";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Dinesh Abbi — Software Developer",
    template: "%s | Dinesh Abbi",
  },
  description:
    "Software Developer with 3+ years building full-stack web applications, REST APIs, and AI-integrated platforms using React, TypeScript, and NestJS.",
  authors: [{ name: "Dinesh Abbi" }],
  keywords: ["Dinesh Abbi", "Software Developer", "React", "NestJS", "TypeScript", "Full-Stack", "Hyderabad"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dinesh-abbi.vercel.app",
    title: "Dinesh Abbi — Software Developer",
    description: "Software Developer building full-stack systems and AI-integrated platforms.",
    siteName: "Dinesh Abbi Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-bg-primary text-text-primary font-sans antialiased flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(13, 20, 34, 0.95)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              color: "#f1f5f9",
              backdropFilter: "blur(16px)",
            },
          }}
        />
      </body>
    </html>
  );
}
