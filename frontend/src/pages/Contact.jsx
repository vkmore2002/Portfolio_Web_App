import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import profile from "../data/profile.json";

const FORMSPREE_URL = "https://formspree.io/f/xzdyvkby";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="bg-black min-h-screen pt-24 pb-20 px-8 md:px-20">
      {/* Page header */}
      <div className="mb-16">
        <p className="font-mono text-sm text-gray-500 tracking-widest uppercase mb-3">
          [ Get In Touch ]
        </p>
        <h1 className="font-mono text-5xl md:text-6xl font-bold text-white tracking-tighter">
          Let's
          <br />
          <span className="text-red-500">Talk.</span>
        </h1>
        <p className="font-mono text-sm text-gray-500 mt-4">
          Open to full time roles, internships and freelance projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left — contact info */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          {/* Availability */}
          <div className="border border-red-900 bg-neutral-900 p-8 hover:border-red-500 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-sm text-green-400 tracking-widest uppercase">
                Available for opportunities
              </span>
            </div>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              I'm currently open to full time developer roles, internships and
              freelance projects. If you have something interesting — let's
              talk.
            </p>
          </div>

          {/* Contact details */}
          <div className="border border-neutral-800 bg-neutral-900 p-8 hover:border-red-600 transition-colors duration-300">
            <p className="font-mono text-xs text-red-500 tracking-widest mb-6">
              [ CONTACT DETAILS ]
            </p>
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-sm text-white hover:text-red-500 transition-colors"
                >
                  {profile.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-1">
                  GitHub
                </p>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-white hover:text-red-500 transition-colors"
                >
                  {profile.github}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-1">
                  LinkedIn
                </p>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-white hover:text-red-500 transition-colors"
                >
                  {profile.linkedin}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-1">
                  Location
                </p>
                <p className="font-mono text-sm text-white">
                  Pune, India — Remote Friendly
                </p>
              </div>
            </div>
          </div>

          {/* Resume download */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-neutral-800 bg-neutral-900 p-8 hover:border-red-600 transition-colors duration-300 group flex items-center justify-between"
          >
            <div>
              <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-1">
                Resume
              </p>
              <p className="font-mono text-sm text-white group-hover:text-red-500 transition-colors">
                Download my resume
              </p>
            </div>
            <span className="font-mono text-red-500 text-xl group-hover:translate-x-1 transition-transform">
              ↗
            </span>
          </a>
        </motion.div>

        {/* Right — form */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="border border-neutral-800 bg-neutral-900 p-10 hover:border-red-600 transition-colors duration-300"
        >
          <p className="font-mono text-xs text-red-500 tracking-widest mb-8">
            [ SEND A MESSAGE ]
          </p>

          {/* Success state */}
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="w-16 h-16 border-2 border-green-500 flex items-center justify-center">
                <span className="font-mono text-green-500 text-2xl">✓</span>
              </div>
              <p className="font-mono text-lg text-white tracking-tighter">
                Message sent.
              </p>
              <p className="font-mono text-sm text-gray-500 text-center">
                Thanks for reaching out — I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="font-mono text-xs text-red-500 tracking-widest uppercase mt-4 hover:text-white transition-colors"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label className="font-mono text-xs text-gray-600 tracking-widest uppercase block mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-black border border-neutral-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-red-500 transition-colors placeholder-neutral-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-mono text-xs text-gray-600 tracking-widest uppercase block mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-black border border-neutral-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-red-500 transition-colors placeholder-neutral-600"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="font-mono text-xs text-gray-600 tracking-widest uppercase block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full bg-black border border-neutral-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-red-500 transition-colors placeholder-neutral-600"
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-xs text-gray-600 tracking-widest uppercase block mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-black border border-neutral-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-red-500 transition-colors placeholder-neutral-600 resize-none"
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <p className="font-mono text-xs text-red-500 tracking-widest">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="font-mono text-sm tracking-widest uppercase px-6 py-4 bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Bottom note */}
      <div className="mt-16 border-t border-neutral-800 pt-8">
        <p className="font-mono text-xs text-gray-600 tracking-widest text-center">
          [ USUALLY RESPONDS WITHIN 24 HOURS ]
        </p>
      </div>
    </main>
  );
};

export default Contact;
