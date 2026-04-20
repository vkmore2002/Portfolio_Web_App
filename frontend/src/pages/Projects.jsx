import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import projects from "../data/projects.json";

const statusColors = {
  completed: {
    text: "text-green-400",
    border: "border-green-400",
    label: "COMPLETED",
  },
  "in-progress": {
    text: "text-amber-400",
    border: "border-amber-400",
    label: "IN PROGRESS",
  },
  archived: {
    text: "text-gray-500",
    border: "border-gray-500",
    label: "ARCHIVED",
  },
};

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const status = statusColors[project.status] || statusColors.completed;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      style={{ breakInside: "avoid", marginBottom: "1rem" }}
      className="group"
    >
      <div className="border border-neutral-800 bg-neutral-900 hover:border-red-600 transition-colors duration-300 overflow-hidden">
        {/* Thumbnail */}
        <div
          className="w-full bg-neutral-800 relative overflow-hidden"
          style={{
            height:
              index % 3 === 0 ? "200px" : index % 3 === 1 ? "140px" : "170px",
          }}
        >
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
              <span className="font-mono text-neutral-700 text-xs tracking-widest z-10">
                [ {project.id} ]
              </span>
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
          )}

        {/* GitHub + Live buttons */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 sm:w-8 h-7 sm:h-8 bg-black border border-neutral-700 flex items-center justify-center hover:border-white transition-colors text-xs"
              >
                <span className="font-mono text-white">GH</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 sm:w-8 h-7 sm:h-8 bg-black border border-neutral-700 flex items-center justify-center hover:border-white transition-colors"
              >
                <span className="font-mono text-white text-xs">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Card content */}
        <div className="p-4 sm:p-6">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3">
            <span className="font-mono text-xs text-red-500 tracking-widest">
              [ {project.id} ]
            </span>
            <span
              className={`font-mono text-xs tracking-widest border px-2 py-0.5 ${status.text} ${status.border} flex-shrink-0`}
            >
              {status.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-mono text-lg sm:text-xl font-bold text-white tracking-tighter mb-1 group-hover:text-red-500 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-3">
            {project.tagline}
          </p>

          {/* Description */}
          <p className="font-mono text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs text-red-400 tracking-wide"
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom red line on hover */}
        <div className="h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="bg-black min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-8 md:px-16 lg:px-20">
      {/* Page header */}
      <div className="mb-12 sm:mb-16">
        <p className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest uppercase mb-2 sm:mb-3">
          [ All Projects ]
        </p>
        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter">
          Things I've
          <br />
          <span className="text-red-500">Built.</span>
        </h1>
        <p className="font-mono text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
          {projects.length} projects — personal, academic and freelance
        </p>
      </div>

      {/* Masonry grid */}
      <div
        style={{
          columnCount: columnCount,
          columnGap: "1rem",
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </main>
  );
};

export default Projects;
