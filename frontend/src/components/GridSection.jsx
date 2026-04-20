import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import { lazy, Suspense } from "react";
import Hero from "../components/Hero";

const cards = [
  {
    id: "01",
    title: "PROJECTS",
    description: "Things I have built — web apps, tools, and experiments.",
    path: "/projects",
    direction: "left",
    spotlightColor: "rgba(239, 68, 68, 0.2)",
  },
  {
    id: "02",
    title: "EXPERIENCE",
    description: "Internships and real world contributions.",
    path: "/experience",
    direction: "right",
    spotlightColor: "rgba(239, 68, 68, 0.2)",
  },
  {
    id: "03",
    title: "SKILLS",
    description:
      "My technical stack — frontend, backend and everything in between.",
    path: "/skills",
    direction: "left",
    spotlightColor: "rgba(239, 68, 68, 0.2)",
  },
  {
    id: "04",
    title: "EDUCATION",
    description: "Academic background — engineering, school and beyond.",
    path: "/education",
    direction: "right",
    spotlightColor: "rgba(239, 68, 68, 0.2)",
  },
  {
    id: "05",
    title: "CERTIFICATIONS",
    description: "Verified credentials and completed programmes.",
    path: "/certifications",
    direction: "left",
    spotlightColor: "rgba(239, 68, 68, 0.2)",
  },
  {
    id: "06",
    title: "CONTACT",
    description: "Have a project in mind? Let's talk.",
    path: "/contact",
    direction: "right",
    spotlightColor: "rgba(239, 68, 68, 0.2)",
  },
];

const GridCard = ({ card, index }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      x: card.direction === "left" ? -100 : 100,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.08,
      },
    },
    exit: {
      opacity: 0,
      x: card.direction === "left" ? -100 : 100,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      className="cursor-pointer"
      onClick={() => navigate(card.path)}
    >
      <SpotlightCard
        className="h-48 sm:h-56 p-6 sm:p-8 group"
        spotlightColor={card.spotlightColor}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <span className="font-mono text-xs text-red-500 tracking-widest">
            [ {card.id} ]
          </span>
          <span className="font-mono text-gray-600 text-lg sm:text-xl group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300">
            →
          </span>
        </div>

        {/* Title */}
        <h2 className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tighter mb-2 sm:mb-3 group-hover:text-red-500 transition-colors duration-300">
          {card.title}
        </h2>

        {/* Description */}
        <p className="font-mono text-xs sm:text-sm text-gray-500 leading-relaxed">
          {card.description}
        </p>

        {/* Bottom line animation */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-red-500 w-0 group-hover:w-full transition-all duration-500" />
      </SpotlightCard>
    </motion.div>
  );
};

const GridSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="relative bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-16 lg:px-20 z-10"
    >
      {/* Section header */}
      <div className="mb-12 sm:mb-16">
        <p className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest uppercase mb-2 sm:mb-3">
          [ Explore ]
        </p>
        <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
          What I do<span className="text-red-500">.</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((card, index) => (
          <GridCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default GridSection;
