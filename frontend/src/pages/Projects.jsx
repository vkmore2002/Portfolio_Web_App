import { useRef } from "react";
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
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 bg-black border border-neutral-700 flex items-center justify-center hover:border-white transition-colors"
              >
                <span className="font-mono text-white text-xs">GH</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 bg-black border border-neutral-700 flex items-center justify-center hover:border-white transition-colors"
              >
                <span className="font-mono text-white text-xs">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Card content */}
        <div className="p-6">
          {/* Top row */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-red-500 tracking-widest">
              [ {project.id} ]
            </span>
            <span
              className={`font-mono text-xs tracking-widest border px-2 py-0.5 ${status.text} ${status.border}`}
            >
              {status.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-mono text-xl font-bold text-white tracking-tighter mb-1 group-hover:text-red-500 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-3">
            {project.tagline}
          </p>

          {/* Description */}
          <p className="font-mono text-sm text-gray-400 leading-relaxed mb-4">
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
  // Responsive column count
  const getMasonryStyle = () => ({
    columnCount:
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1,
    columnGap: "1rem",
  });

  return (
    <main className="bg-black min-h-screen pt-24 pb-20 px-8 md:px-20">
      {/* Page header */}
      <div className="mb-16">
        <p className="font-mono text-sm text-gray-500 tracking-widest uppercase mb-3">
          [ All Projects ]
        </p>
        <h1 className="font-mono text-5xl md:text-6xl font-bold text-white tracking-tighter">
          Things I've
          <br />
          <span className="text-red-500">Built.</span>
        </h1>
        <p className="font-mono text-sm text-gray-500 mt-4">
          {projects.length} projects — personal, academic and freelance
        </p>
      </div>

      {/* Masonry grid */}
      <div
        style={{
          columnCount: 3,
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
