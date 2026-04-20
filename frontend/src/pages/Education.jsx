import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import education from "../data/education.json";

const typeConfig = {
  university: {
    label: "UNIVERSITY",
    color: "text-red-400",
    border: "border-red-500",
    dot: "bg-red-500",
    icon: "🎓",
  },
  school: {
    label: "SCHOOL",
    color: "text-blue-400",
    border: "border-blue-500",
    dot: "bg-blue-500",
    icon: "📚",
  },
};

const EducationCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const config = typeConfig[item.type] || typeConfig.school;
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex gap-6 mb-8">
      {/* Left number */}
      <div className="hidden md:flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full mt-10 ${config.dot} ring-4 ring-black shrink-0`}
        />
        {index < education.length - 1 && (
          <div className="w-0.5 flex-1 bg-neutral-800 mt-2" />
        )}
      </div>

      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
        className="flex-1 group"
      >
        <div
          className={`border bg-neutral-900 p-8 hover:border-red-600 transition-colors duration-300 ${config.border} border-opacity-30`}
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <span
                className={`font-mono text-xs tracking-widest ${config.color} mb-2 block`}
              >
                [ {config.label} ] — [ {item.id} ]
              </span>
              <h3 className="font-mono text-2xl font-bold text-white tracking-tighter group-hover:text-red-500 transition-colors duration-300">
                {item.degree}
              </h3>
            </div>

            {/* Grade badge */}
            {item.grade && (
              <span className="font-mono text-sm text-amber-400 border border-amber-500 border-opacity-50 px-3 py-1 tracking-widest shrink-0">
                {item.grade}
              </span>
            )}
          </div>

          {/* Institution + location */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-sm text-gray-300 font-bold">
              {item.institution}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs text-gray-500">
              {item.location}
            </span>
            <span className="text-gray-700">·</span>
            <span className="font-mono text-xs text-gray-500 tracking-widest">
              {item.startDate} — {item.endDate}
            </span>
          </div>

          {/* Description */}
          <p className="font-mono text-sm text-gray-400 leading-relaxed">
            {item.description}
          </p>

          {/* Bottom hover line */}
          <div className="h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-500 mt-6" />
        </div>
      </motion.div>
    </div>
  );
};

const Education = () => {
  return (
    <main className="bg-black min-h-screen pt-24 pb-20 px-8 md:px-20">
      {/* Page header */}
      <div className="mb-16">
        <p className="font-mono text-sm text-gray-500 tracking-widest uppercase mb-3">
          [ Academic Background ]
        </p>
        <h1 className="font-mono text-5xl md:text-6xl font-bold text-white tracking-tighter">
          Edu-
          <br />
          <span className="text-red-500">cation.</span>
        </h1>
        <p className="font-mono text-sm text-gray-500 mt-4">
          {education.length} institutions — CBSE + University
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl">
        {education.map((item, index) => (
          <EducationCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-16 border-t border-neutral-800 pt-8">
        <p className="font-mono text-xs text-gray-600 tracking-widest text-center">
          [ B.E. GRADUATING — JUN 2025 — PUNE, IN ]
        </p>
      </div>
    </main>
  );
};

export default Education;
