import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import certifications from "../data/certifications.json";

const CertCard = ({ cert, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className="group"
    >
      <div className="border border-neutral-800 bg-neutral-900 hover:border-red-600 transition-colors duration-300 overflow-hidden">
        {/* Thumbnail / placeholder */}
        <div className="w-full h-40 sm:h-48 bg-neutral-800 relative overflow-hidden flex items-center justify-center">
          {cert.thumbnail ? (
            <img
              src={cert.thumbnail}
              alt={cert.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="z-10 text-center px-4">
                <p className="font-mono text-2xl sm:text-4xl font-bold text-neutral-700 tracking-tighter leading-tight">
                  {cert.issuer}
                </p>
                <p className="font-mono text-xs text-neutral-600 tracking-widest mt-1">
                  CERTIFICATE
                </p>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="font-mono text-xs text-red-500 tracking-widest">
              [ {cert.id} ]
            </span>
            <span className="font-mono text-xs text-amber-400 border border-amber-500 border-opacity-50 px-2 py-0.5 tracking-widest flex-shrink-0">
              {cert.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-mono text-base sm:text-xl font-bold text-white tracking-tighter mb-2 group-hover:text-red-500 transition-colors duration-300 leading-snug">
            {cert.title}
          </h3>

          {/* Issuer */}
          <p className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest uppercase mb-3 sm:mb-4">
            {cert.issuer}
          </p>

          {/* Description */}
          <p className="font-mono text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 sm:mb-6">
            {cert.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs text-red-400 tracking-wide"
              >
                #{skill}
              </span>
            ))}
          </div>

          {/* Verify button */}
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs tracking-widest uppercase px-3 sm:px-5 py-2 sm:py-2.5 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-colors duration-300 inline-block"
            >
              Verify Certificate →
            </a>
          )}
        </div>

        {/* Bottom hover line */}
        <div className="h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <main className="bg-black min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-8 md:px-16 lg:px-20">
      {/* Page header */}
      <div className="mb-12 sm:mb-16">
        <p className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest uppercase mb-2 sm:mb-3">
          [ Credentials ]
        </p>
        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter">
          Certifi-
          <br />
          <span className="text-red-500">cations.</span>
        </h1>
        <p className="font-mono text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
          {certifications.length} certification — verified and earned
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {certifications.map((cert, index) => (
          <CertCard key={cert.id} cert={cert} index={index} />
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-12 sm:mt-16 border-t border-neutral-800 pt-6 sm:pt-8">
        <p className="font-mono text-xs text-gray-600 tracking-widest text-center">
          [ ALWAYS LEARNING — MORE COMING SOON ]
        </p>
      </div>
    </main>
  );
};

export default Certifications;
