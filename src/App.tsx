import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/ui/CustomCursor";
import SmoothScroll from "./components/layout/SmoothScroll";

// PageWrapper component handles the transition: "fade + slight translateY(20px -> 0) on enter, reverse on exit"
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans">
        {/* Custom cursor overlay */}
        <CustomCursor />
        
        {/* Navigation Header */}
        <Navbar />
        
        {/* Toast Notifier */}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(30, 41, 59, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#f1f5f9",
              backdropFilter: "blur(8px)"
            }
          }}
        />
        
        {/* Main Routed Area */}
        <main className="flex-grow pt-[80px] flex flex-col">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path="/about"
                element={
                  <PageWrapper>
                    <About />
                  </PageWrapper>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageWrapper>
                    <Projects />
                  </PageWrapper>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageWrapper>
                    <Contact />
                  </PageWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
