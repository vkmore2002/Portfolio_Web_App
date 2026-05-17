import { Link } from "react-router-dom";
import profile from "../data/profile.json";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Skills", path: "/skills" },
  { label: "Experience", path: "/experience" },
  { label: "Education", path: "/education" },
  { label: "Certifications", path: "/certifications" },
  { label: "Contact", path: "/contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-neutral-800 px-4 sm:px-8 md:px-16 lg:px-20 py-10 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* Col 1 — Brand */}
        <div>
          <Link
            to="/"
            className="font-mono text-white text-base tracking-widest uppercase"
          >
            VM<span className="text-red-500">.</span>dev
          </Link>
          <p className="font-mono text-xs text-gray-500 mt-3 leading-relaxed max-w-xs">
            Full Stack Developer based in Pune, India. Building things for the
            web with clean code and real problem solving.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-green-400 tracking-widest">
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>

        {/* Col 2 — Nav */}
        <div>
          <p className="font-mono text-xs text-red-500 tracking-widest uppercase mb-4">
            [ Navigation ]
          </p>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="font-mono text-xs text-gray-400 hover:text-white transition-colors tracking-widest uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <p className="font-mono text-xs text-red-500 tracking-widest uppercase mb-4">
            [ Contact ]
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-xs text-gray-400 hover:text-white transition-colors break-all"
            >
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-gray-400 hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-gray-400 hover:text-white transition-colors"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-gray-600 tracking-widest">
          © {year} VIVEK MORE — ALL RIGHTS RESERVED
        </p>
        <p className="font-mono text-xs text-gray-700 tracking-widest">
          [ BUILT WITH REACT + TAILWIND ]
        </p>
      </div>
    </footer>
  );
};

export default Footer;
