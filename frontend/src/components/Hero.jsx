import { useEffect, useRef, useState, memo, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MechCube from "./MechCube";

const taglines = [
  "Full Stack Developer.",
  "Problem Solver.",
  "MERN Stack Engineer.",
  "Based in Pune, IN.",
];

const Hero = () => {
  const [currentTagline, setCurrentTagline] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.85]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  // Memoized typewriter tick
  const tick = useCallback(() => {
    const current = taglines[taglineIndex];

    if (!deleting && charIndex < current.length) {
      setCurrentTagline(current.slice(0, charIndex + 1));
      setCharIndex((c) => c + 1);
    } else if (!deleting && charIndex === current.length) {
      setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      setCurrentTagline(current.slice(0, charIndex - 1));
      setCharIndex((c) => c - 1);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTaglineIndex((i) => (i + 1) % taglines.length);
    }
  }, [charIndex, deleting, taglineIndex]);

  useEffect(() => {
    const timeout = setTimeout(tick, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [tick, deleting]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative h-screen w-full bg-black flex items-center px-4 sm:px-8 md:px-16 lg:px-20 overflow-hidden sticky top-0"
    >
      {/* Darkness overlay on scroll */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black pointer-events-none z-10"
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Left — Text */}
      <div className="flex-1 flex flex-col justify-center z-10">
        <p className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest uppercase mb-4 sm:mb-6">
          [ Portfolio — 2025 ]
        </p>

        <h1 className="font-mono text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-none tracking-tighter uppercase">
          Vivek<span className="text-red-500">.</span>
          <br />
          More
          <span className="text-red-500">_</span>
        </h1>

        <div className="mt-6 sm:mt-8 flex items-center gap-1 flex-wrap">
          <span className="font-mono text-base sm:text-lg md:text-xl text-gray-400">
            {currentTagline}
          </span>
          <span className="w-0.5 h-5 bg-red-500 animate-pulse inline-block" />
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <a
            href="/projects"
            className="font-mono text-xs sm:text-sm tracking-widest uppercase px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white hover:bg-red-700 transition-colors w-full sm:w-auto text-center"
          >
            View Work →
          </a>
          <a
            href="/contact"
            className="font-mono text-xs sm:text-sm tracking-widest uppercase px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-colors w-full sm:w-auto text-center"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Right — 3D Cube */}
      <div className="hidden lg:flex flex-1 items-center justify-center h-full">
        <div className="w-full h-full">
          <MechCube />
        </div>
      </div>

      {/* Bottom row */}
      <div className="absolute bottom-8 sm:bottom-10 left-4 sm:left-8 md:left-16 lg:left-20 right-4 sm:right-8 md:right-16 lg:right-20 flex items-center justify-between z-10">
        <p className="font-mono text-xs text-gray-600 tracking-widest uppercase">
          Scroll to explore
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="font-mono text-red-500 text-lg sm:text-xl"
        >
          ↓
        </motion.div>
      </div>
    </motion.section>
  );
};

export default memo(Hero);
