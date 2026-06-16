import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { animate, stagger } from "animejs";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/cn";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" }
];

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navContainerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Monitor scroll for header background style change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate the active underline bar on desktop using Anime.js
  useEffect(() => {
    if (!navContainerRef.current || !underlineRef.current) return;
    
    // Find active anchor element
    const activeLinkEl = navContainerRef.current.querySelector(
      `a[data-path="${location.pathname}"]`
    ) as HTMLElement;

    if (activeLinkEl) {
      const { offsetLeft, offsetWidth } = activeLinkEl;
      
      // Animate underline to match the active tab's offset and width
      animate(underlineRef.current, {
        left: offsetLeft,
        width: offsetWidth,
        duration: isFirstRender.current ? 0 : 350,
        ease: "outQuad"
      });
      
      isFirstRender.current = false;
    } else {
      // Hide underline if not matching any nav link
      animate(underlineRef.current, {
        width: 0,
        duration: 200,
        ease: "outQuad"
      });
    }
  }, [location.pathname]);

  // Mobile menu links stagger animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Small timeout to allow element rendering before animation target runs
      setTimeout(() => {
        animate(".mobile-nav-link", {
          opacity: [0, 1],
          translateY: [30, 0],
          delay: stagger(80, { start: 100 }),
          duration: 500,
          ease: "outCubic"
        });
      }, 50);
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-300 px-6 py-4 md:px-12",
          isScrolled 
            ? "bg-bg-primary/75 backdrop-blur-md border-b border-border-custom shadow-lg" 
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Monogram */}
          <Link
            to="/"
            className="text-2xl font-bold font-mono text-accent-blue-light hover:text-accent-blue transition-colors flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="border border-accent-blue px-2 py-0.5 rounded-md bg-accent-blue/10">
              DA
            </span>
            <span className="hidden sm:inline text-sm font-semibold tracking-wider text-text-secondary">
              Dinesh Abbi
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            ref={navContainerRef}
            className="hidden md:flex items-center gap-8 relative py-2"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  data-path={link.path}
                  data-active={isActive ? "true" : "false"}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 px-1",
                    isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Active sliding line */}
            <div
              ref={underlineRef}
              className="absolute bottom-0 h-[2px] bg-accent-blue rounded-full"
              style={{ left: 0, width: 0 }}
            />
          </nav>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-text-primary p-2 hover:text-accent-blue-light transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Full-screen Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 w-full h-screen bg-bg-primary/98 backdrop-blur-lg z-30 flex flex-col justify-center items-center md:hidden">
          <nav className="flex flex-col items-center gap-8 text-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "mobile-nav-link text-3xl font-semibold tracking-wider transition-colors py-2 opacity-0",
                    isActive ? "text-accent-blue" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
