import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import profile from "../data/profile.json";

const stats = [
  { label: "Projects Built", value: "5+" },
  { label: "Technologies", value: "15+" },
  { label: "Certifications", value: "01" },
  { label: "cups of coffee", value: "∞" },
];

const About = () => {
  const introRef = useRef(null);
  const storyRef = useRef(null);
  const interestRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const introInView = useInView(introRef, { once: true, margin: "-60px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-60px" });
  const interestInView = useInView(interestRef, {
    once: true,
    margin: "-60px",
  });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <main className="bg-black min-h-screen pt-24 pb-20 px-8 md:px-20">
      {/* Page header */}
      <div className="mb-16">
        <p className="font-mono text-sm text-gray-500 tracking-widest uppercase mb-3">
          [ The Human Behind The Code ]
        </p>
        <h1 className="font-mono text-5xl md:text-6xl font-bold text-white tracking-tighter">
          About
          <br />
          <span className="text-red-500">Me.</span>
        </h1>
      </div>

      {/* Hero row — photo + intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Photo block */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="border border-neutral-800 bg-neutral-900 overflow-hidden group hover:border-red-600 transition-colors duration-300"
          style={{ minHeight: "420px" }}
        >
          {/* Swap src with your actual photo path later */}
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover object-top"
              style={{ minHeight: "420px" }}
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-4 relative"
              style={{ minHeight: "420px" }}
            >
              {/* Placeholder grid */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Initials circle */}
              <div className="w-32 h-32 rounded-full border-2 border-red-500 flex items-center justify-center z-10">
                <span className="font-mono text-4xl font-bold text-red-500">
                  VM
                </span>
              </div>
              <p className="font-mono text-xs text-gray-600 tracking-widest z-10">
                [ PHOTO COMING SOON ]
              </p>
              <p className="font-mono text-xs text-gray-700 tracking-widest z-10">
                Add your photo to public/images/avatar.jpg
              </p>
            </div>
          )}
        </motion.div>

        {/* Intro + quick info */}
        <motion.div
          ref={introRef}
          initial={{ opacity: 0, x: 80 }}
          animate={introInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="border border-neutral-800 bg-neutral-900 p-10 hover:border-red-600 transition-colors duration-300 group flex flex-col justify-between"
        >
          <div>
            <p className="font-mono text-xs text-red-500 tracking-widest mb-4">
              [ 01 ] — WHO I AM
            </p>
            <h2 className="font-mono text-3xl font-bold text-white tracking-tighter mb-6">
              Vivek Harishchandra
              <br />
              <span className="text-red-500">More.</span>
            </h2>
            <p className="font-mono text-base text-gray-300 leading-relaxed mb-4">
              A developer from{" "}
              <span className="text-white font-bold">India</span> currently
              focused on building full-stack web applications and exploring
              real-world problem-solving through code.
            </p>
            <p className="font-mono text-base text-gray-400 leading-relaxed">
              I've worked on projects ranging from e-commerce platforms to
              AI-based systems like sign language detection, and I enjoy turning
              ideas into functional, user-friendly products.
            </p>
          </div>

          {/* Quick info */}
          <div className="mt-8 pt-8 border-t border-neutral-800 grid grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-1">
                Location
              </p>
              <p className="font-mono text-sm text-white">Pune, India</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-1">
                Degree
              </p>
              <p className="font-mono text-sm text-white">B.E. ECE — 2025</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-1">
                Focus
              </p>
              <p className="font-mono text-sm text-white">Full Stack Dev</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-1">
                Status
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-sm text-green-400">
                  Available
                </span>
              </div>
            </div>
          </div>

          <div className="h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-500 mt-8" />
        </motion.div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* What drives me */}
        <motion.div
          ref={storyRef}
          initial={{ opacity: 0, x: -80 }}
          animate={storyInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="border border-neutral-800 bg-neutral-900 p-10 hover:border-red-600 transition-colors duration-300 group"
        >
          <p className="font-mono text-xs text-red-500 tracking-widest mb-4">
            [ 02 ] — WHAT DRIVES ME
          </p>
          <p className="font-mono text-base text-gray-300 leading-relaxed">
            What got me into development was the ability to actually
            <span className="text-white font-bold">
              {" "}
              create something from scratch
            </span>{" "}
            and see it working in real time.
          </p>
          <br />
          <p className="font-mono text-base text-gray-400 leading-relaxed">
            That feeling of building, debugging, improving, and finally getting
            things to work — that's what keeps me hooked. I'm especially
            interested in <span className="text-red-400">backend systems</span>{" "}
            and how everything connects behind the scenes.
          </p>
          <div className="h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-500 mt-8" />
        </motion.div>

        {/* Outside coding */}
        <motion.div
          ref={interestRef}
          initial={{ opacity: 0, x: 80 }}
          animate={interestInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="border border-neutral-800 bg-neutral-900 p-10 hover:border-red-600 transition-colors duration-300 group"
        >
          <p className="font-mono text-xs text-red-500 tracking-widest mb-4">
            [ 03 ] — OUTSIDE CODING
          </p>
          <p className="font-mono text-base text-gray-300 leading-relaxed">
            I'm really into{" "}
            <span className="text-white font-bold">fitness</span>. I train
            regularly with <span className="text-red-400">boxing</span> and
            <span className="text-red-400"> calisthenics</span>, and I like
            pushing my limits physically just like I do mentally with
            development.
          </p>
          <br />
          <p className="font-mono text-base text-gray-400 leading-relaxed">
            It keeps me disciplined and balanced. The same mentality that gets
            me through a tough workout gets me through a tough debugging
            session.
          </p>
          <div className="h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-500 mt-8" />
        </motion.div>
      </div>

      {/* Looking for — full width */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={interestInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="border border-red-900 bg-neutral-900 p-10 hover:border-red-500 transition-colors duration-300 group relative overflow-hidden mb-4"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 opacity-5 rounded-full translate-x-32 -translate-y-32" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-red-500 tracking-widest mb-4">
              [ 04 ] — WHAT I'M LOOKING FOR
            </p>
            <p className="font-mono text-base text-gray-300 leading-relaxed max-w-2xl">
              I'm looking for opportunities where I can
              <span className="text-white font-bold">
                {" "}
                grow as a developer
              </span>{" "}
              — preferably a full-time role or internship where I can work on
              real projects, learn from experienced people, and improve my
              skills in a practical environment.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-sm text-green-400 tracking-widest uppercase">
              Available for opportunities
            </span>
          </div>
        </div>
        <div className="h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-500 mt-8" />
      </motion.div>

      {/* Stats row */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 40 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-neutral-800 bg-neutral-900 p-8 text-center hover:border-red-600 transition-colors duration-300"
          >
            <p className="font-mono text-4xl font-bold text-red-500 mb-2">
              {stat.value}
            </p>
            <p className="font-mono text-xs text-gray-500 tracking-widest uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* CTA row */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 40 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border border-neutral-800 bg-neutral-900 p-10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <p className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-2">
            [ Let's work together ]
          </p>
          <h3 className="font-mono text-2xl font-bold text-white tracking-tighter">
            Have a project in mind?
          </h3>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="/contact"
            className="font-mono text-sm tracking-widest uppercase px-6 py-3 bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Contact Me →
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm tracking-widest uppercase px-6 py-3 border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-colors"
          >
            Resume ↗
          </a>
        </div>
      </motion.div>

      {/* Bottom note */}
      <div className="mt-16 border-t border-neutral-800 pt-8">
        <p className="font-mono text-xs text-gray-600 tracking-widest text-center">
          [ PUNE, IN — OPEN TO REMOTE — AVAILABLE NOW ]
        </p>
      </div>
    </main>
  );
};

export default About;
