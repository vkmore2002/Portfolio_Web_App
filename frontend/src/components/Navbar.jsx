import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-mono text-white text-xs sm:text-base tracking-widest uppercase flex-shrink-0"
        >
          VM<span className="text-red-500">.</span>dev
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`font-mono text-xs lg:text-sm tracking-widest uppercase transition-colors duration-200
                  ${
                    location.pathname === link.path
                      ? "text-red-500"
                      : "text-gray-400 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Available badge */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="font-mono text-xs lg:text-sm text-green-400 tracking-widest">
            AVAILABLE
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-mono text-xs sm:text-sm text-gray-400 hover:text-white flex-shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-red-600 px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-4 sm:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`font-mono text-xs sm:text-sm tracking-widest uppercase
                ${
                  location.pathname === link.path
                    ? "text-red-500"
                    : "text-gray-400 hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
