import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const glitchChars = "!@#$%^&*<>?/\\|[]{}~`";

const GlitchText = ({ text }) => {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iterations) return text[i];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join(""),
      );
      iterations += 0.5;
      if (iterations >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
};

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const NotFound = () => {
  return (
    <main className="bg-black min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Big 404 background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-mono font-bold text-neutral-900 text-[20vw] leading-none tracking-tighter">
          404
        </span>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <p className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest uppercase mb-4">
          [ Error 404 — Page Not Found ]
        </p>

        <h1 className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tighter mb-2">
          <GlitchText text="LOST IN" />
          <br />
          <span className="text-red-500">
            <GlitchText text="THE VOID." />
          </span>
        </h1>

        <p className="font-mono text-xs sm:text-sm text-gray-500 mt-6 mb-10 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist or was moved. Head back to
          somewhere real.
        </p>

        {/* Nav options */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="font-mono text-xs sm:text-sm tracking-widest uppercase px-5 py-3 bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Back to Home →
          </Link>
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-mono text-xs sm:text-sm tracking-widest uppercase px-4 py-3 border border-neutral-700 text-gray-400 hover:border-white hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Bottom note */}
      <div className="absolute bottom-8 left-0 right-0">
        <p className="font-mono text-xs text-gray-700 tracking-widest text-center">
          [ YOU WEREN'T SUPPOSED TO BE HERE ]
        </p>
      </div>
    </main>
  );
};

export default NotFound;
