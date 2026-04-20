import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import skills from "../data/skills.json";

const SkillBar = ({ name, level, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // ASCII style level label
  const getLabel = (level) => {
    if (level >= 85) return "EXPERT";
    if (level >= 75) return "ADVANCED";
    if (level >= 65) return "INTERMEDIATE";
    return "LEARNING";
  };

  const getLabelColor = (level) => {
    if (level >= 85) return "text-green-400";
    if (level >= 75) return "text-red-400";
    if (level >= 65) return "text-amber-400";
    return "text-gray-500";
  };

  return (
    <div ref={ref} className="mb-4 sm:mb-5">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-2">
        <span className="font-mono text-xs sm:text-sm text-white tracking-wide">
          {name}
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className={`font-mono text-xs tracking-widest ${getLabelColor(level)}`}
          >
            {getLabel(level)}
          </span>
          <span className="font-mono text-xs text-gray-600">{level}%</span>
        </div>
      </div>

      {/* ASCII bar */}
      <div className="flex items-center gap-1">
        {/* Bar track */}
        <div className="flex-1 h-1.5 bg-neutral-800 relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : {}}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: index * 0.05,
            }}
            className="h-full bg-red-500 relative"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CategoryBlock = ({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className="border border-neutral-800 bg-neutral-900 p-6 sm:p-8 hover:border-red-600 transition-colors duration-300"
    >
      {/* Category header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <p className="font-mono text-xs text-red-500 tracking-widest mb-1">
            [ {category.id} ]
          </p>
          <h3 className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tighter">
            {category.category}
          </h3>
        </div>
        <span className="font-mono text-xs text-gray-600 tracking-widest flex-shrink-0">
          {category.skills.length} SKILLS
        </span>
      </div>

      {/* Skills */}
      {category.skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          index={i}
        />
      ))}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <main className="bg-black min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-8 md:px-16 lg:px-20">
      {/* Page header */}
      <div className="mb-12 sm:mb-16">
        <p className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest uppercase mb-2 sm:mb-3">
          [ Technical Skills ]
        </p>
        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter">
          What I<br />
          <span className="text-red-500">Know.</span>
        </h1>
        <p className="font-mono text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
          {skills.reduce((acc, cat) => acc + cat.skills.length, 0)} skills
          across {skills.length} categories
        </p>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {skills.map((category, index) => (
          <CategoryBlock key={category.id} category={category} index={index} />
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-12 sm:mt-16 border-t border-neutral-800 pt-6 sm:pt-8">
        <p className="font-mono text-xs text-gray-600 tracking-widest text-center">
          [ ALWAYS LEARNING — ALWAYS BUILDING ]
        </p>
      </div>
    </main>
  );
};

export default Skills;
