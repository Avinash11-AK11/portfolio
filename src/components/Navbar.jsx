import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#9B5F3F] z-[60] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#6F4A2D]/70 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-5">

          <div className="flex justify-between items-center">

            {/* Logo */}
            <Link
              to="/"
              className={`text-2xl md:text-3xl font-serif font-bold transition duration-300 hover:scale-105 ${
                scrolled ? "text-white" : "text-[#6F4A2D]"
              }`}
            >
              Avinash
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-10">

              <NavItem to="/" label="Home" scrolled={scrolled} isActive={isActive("/")} />
              <NavItem to="/projects" label="Projects" scrolled={scrolled} isActive={isActive("/projects")} />
              <NavItem to="/skills" label="Skills" scrolled={scrolled} isActive={isActive("/skills")} />
              <NavItem to="/certifications" label="Certifications" scrolled={scrolled} isActive={isActive("/certifications")} />
              <NavItem to="/resume" label="Resume" scrolled={scrolled} isActive={isActive("/resume")} />

              <Link
                to="/contact"
                className={`nav-link ${scrolled ? "scrolled-nav-link" : ""} ${isActive("/contact") ? "active-nav-link" : ""}`}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden transition hover:scale-110 ${
                scrolled ? "text-white" : "text-[#6F4A2D]"
              }`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              isOpen ? "max-h-[500px] mt-4" : "max-h-0"
            }`}
          >
            <div className="bg-[#EDE3CF] rounded-2xl shadow-2xl overflow-hidden" style={{ border: "1px solid rgba(155,95,63,0.15)" }}>

              {[
                { to: "/",              label: "Home" },
                { to: "/projects",     label: "Projects" },
                { to: "/skills",       label: "Skills" },
                { to: "/certifications", label: "Certifications" },
                { to: "/resume",       label: "Resume" },
                { to: "/contact",      label: "Contact" },
              ].map(({ to, label }, i) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-6 py-4 text-[#6F4A2D] font-semibold text-base transition-all duration-200 ${
                    isActive(to)
                      ? "bg-[#D6C59A] text-[#9B5F3F] font-bold"
                      : "hover:bg-[#D8CFB0] hover:text-[#9B5F3F]"
                  }`}
                  style={{ borderBottom: i < 5 ? "1px solid rgba(155,95,63,0.10)" : "none" }}
                >
                  {label}
                  <span className="text-[#CDB77F] text-lg leading-none">›</span>
                </Link>
              ))}

            </div>
          </div>
        </div>
      </nav>

      {/* Styles */}
      <style jsx>{`
        .nav-link {
          position: relative;
          color: #6f4a2d;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
        }

        .scrolled-nav-link {
          color: #ffffff;
        }

        .nav-link:hover {
          color: #9b5f3f;
          background-color: rgba(155, 95, 63, 0.1);
        }

        .scrolled-nav-link:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .nav-link.active-nav-link {
          color: #9b5f3f;
          font-weight: 600;
          background-color: rgba(155, 95, 63, 0.15);
        }

        .scrolled-nav-link.active-nav-link {
          color: #ffffff;
          font-weight: 600;
          background-color: rgba(255, 255, 255, 0.15);
        }

        .mobile-link {
          display: block;
          font-weight: 500;
          color: #6f4a2d;
          transition: color 0.3s;
        }

        .mobile-link:hover {
          color: #9b5f3f;
        }
      `}</style>
    </>
  );
}

function NavItem({ to, label, scrolled, isActive }) {
  return (
    <Link to={to} className={`nav-link ${scrolled ? "scrolled-nav-link" : ""} ${isActive ? "active-nav-link" : ""}`}>
      {label}
    </Link>
  );
}

export default Navbar;