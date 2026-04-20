import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import experience from "../data/experience.json";

const ExperienceCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className="group"
    >
      <div className="border border-neutral-800 bg-neutral-900 hover:border-red-600 transition-colors duration-300 p-6 sm:p-10">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1">
            <span className="font-mono text-xs text-red-500 tracking-widest mb-2 block">
              [ {String(index + 1).padStart(2, "0")} ] — [ INTERNSHIP ]
            </span>
            <h3 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter group-hover:text-red-500 transition-colors duration-300">
              {item.role}
            </h3>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <span className="font-mono text-xs text-amber-400 border border-amber-500 border-opacity-50 px-2 sm:px-3 py-1 tracking-widest block mb-1 sm:mb-2">
              {item.startDate} — {item.endDate}
            </span>
            <span className="font-mono text-xs text-gray-500 tracking-widest">
              {item.location}
            </span>
          </div>
        </div>

        {/* Company */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-neutral-800">
          <div className="w-1 h-6 sm:h-8 bg-red-500" />
          <span className="font-mono text-base sm:text-xl text-gray-300 font-bold">
            {item.company}
          </span>
        </div>

        {/* Description */}
        <p className="font-mono text-xs sm:text-base text-gray-400 leading-relaxed mb-6 sm:mb-8 max-w-3xl">
          {item.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs text-red-400 border border-red-900 px-2 sm:px-3 py-1 sm:py-1.5 tracking-widest hover:border-red-500 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom hover line */}
        <div className="h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-500 mt-6 sm:mt-8" />
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <main className="bg-black min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-8 md:px-16 lg:px-20">
      {/* Page header */}
      <div className="mb-12 sm:mb-16">
        <p className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest uppercase mb-2 sm:mb-3">
          [ Work History ]
        </p>
        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter">
          Experi-
          <br />
          <span className="text-red-500">ence.</span>
        </h1>
        <p className="font-mono text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
          {experience.length} internship — hands on industry experience
        </p>
      </div>

      {/* Experience cards */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {experience.map((item, index) => (
          <ExperienceCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Fresher note */}
      <div className="mt-12 sm:mt-16 border border-neutral-800 p-6 sm:p-8">
        <div className="flex gap-3 sm:gap-4 items-start">
          <div
            className="w-1 h-full bg-red-500 shrink-0"
            style={{ minHeight: "60px" }}
          />
          <div>
            <p className="font-mono text-xs sm:text-sm text-red-500 tracking-widest uppercase mb-1 sm:mb-2">
              [ Note ]
            </p>
            <p className="font-mono text-xs sm:text-sm text-gray-400 leading-relaxed">
              I am a fresher actively looking for full time opportunities in
              full stack development. I bring hands-on project experience, a
              strong MERN foundation and a hunger to contribute and grow within
              a team.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-12 sm:mt-16 border-t border-neutral-800 pt-6 sm:pt-8">
        <p className="font-mono text-xs text-gray-600 tracking-widest text-center">
          [ OPEN TO WORK — PUNE, IN — REMOTE FRIENDLY ]
        </p>
      </div>
    </main>
  );
};

export default Experience;
