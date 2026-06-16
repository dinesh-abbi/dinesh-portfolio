"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg-primary/60 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="font-display text-xl font-medium tracking-wide">
          DA.
        </Link>
        <nav className="flex gap-6 md:gap-8 text-sm text-text-muted">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`hover:text-text-primary transition-colors ${
                pathname === link.path ? "text-text-primary underline underline-offset-4 decoration-border-custom" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
