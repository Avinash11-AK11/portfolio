import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

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

              <NavItem to="/" label="Home" scrolled={scrolled} />
              <NavItem to="/projects" label="Projects" scrolled={scrolled} />
              <NavItem to="/skills" label="Skills" scrolled={scrolled} />
              <NavItem to="/certifications" label="Certifications" scrolled={scrolled} />
              <NavItem to="/resume" label="Resume" scrolled={scrolled} />

              <Link
                to="/contact"
                className={`nav-link ${scrolled ? "scrolled-nav-link" : ""}`}
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
                  className="flex items-center justify-between px-6 py-4 text-[#6F4A2D] font-semibold text-base hover:bg-[#D8CFB0] hover:text-[#9B5F3F] transition-all duration-200"
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
          transition: color 0.3s ease;
        }

        .scrolled-nav-link {
          color: #ffffff;
        }

        .nav-link:hover {
          color: #9b5f3f;
        }

        .scrolled-nav-link:hover {
          color: #e8d4c0;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          left: 0;
          bottom: -6px;
          background: #9b5f3f;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
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

function NavItem({ to, label, scrolled }) {
  return (
    <Link to={to} className={`nav-link ${scrolled ? "scrolled-nav-link" : ""}`}>
      {label}
    </Link>
  );
}

export default Navbar;