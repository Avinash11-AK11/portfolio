import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileImage from '../assets/profile/image.jpeg';

function Hero() {

  const roles = ["Web Developer", "App Developer", "Data Analyst"];
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const typingSpeed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {

      if (!deleting) {
        setText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setDeleting(true), 1200);
        }

      } else {
        setText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }

    }, typingSpeed);

    return () => clearTimeout(timeout);

  }, [charIndex, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#D8CFB0]">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D8CFB0] via-[#CDB77F] to-[#BDAA86] opacity-70"></div>

      {/* Glow Shapes */}
      <div className="absolute w-[600px] h-[600px] bg-[#CDB77F] rounded-full blur-[160px] opacity-30 -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] rounded-full blur-[150px] opacity-20 bottom-[-150px] right-[-150px] animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10 pt-24 md:pt-0">

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8">

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-[#6F4A2D] leading-tight animate-slideUp">
              Hi, I'm <span className="text-[#9B5F3F]">Avinash</span>
            </h1>

            {/* Typing Role */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#6F4A2D] min-h-[36px] animate-fadeIn delay-200">
              {text}
              <span className="animate-pulse">|</span>
            </h2>

            <p className="text-lg text-[#5A4028] max-w-xl leading-relaxed opacity-90 animate-fadeIn delay-300">
              I am a Computer Engineering student passionate about building
              modern web and mobile applications. I enjoy solving real-world
              problems through technology and creating elegant digital
              experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6 animate-fadeIn delay-500">

              <Link
                to="/projects"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#9B5F3F] text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                View Projects
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-[#9B5F3F] text-[#6F4A2D] font-semibold hover:bg-[#CDB77F] transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Contact Me
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end mt-4 md:mt-0">

            <div className="relative w-56 h-72 sm:w-72 sm:h-96 md:w-[380px] md:h-[480px] group animate-float">

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#CDB77F] to-[#9B5F3F] blur-3xl opacity-40 group-hover:opacity-60 transition duration-500"></div>

              {/* Image */}
              <div className="relative w-full h-full rounded-[120px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] transform transition duration-500 group-hover:scale-[1.05]">

                <img
                  src={profileImage}
                  alt="Avinash"
                  className="w-full h-full object-cover"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">

        <div className="w-6 h-10 border-2 border-[#6F4A2D] rounded-full flex justify-center">

          <div className="w-1 h-3 bg-[#6F4A2D] rounded-full mt-2 animate-scroll"></div>

        </div>

      </div>

      {/* Animations */}
      <style jsx>{`

        .animate-slideUp {
          animation: slideUp 1s ease forwards;
        }

        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 1.5s ease forwards;
        }

        .delay-200 { animation-delay: .2s }
        .delay-300 { animation-delay: .3s }
        .delay-500 { animation-delay: .5s }

        @keyframes slideUp {
          from { transform: translateY(60px); opacity:0 }
          to { transform: translateY(0); opacity:1 }
        }

        @keyframes fadeIn {
          from { opacity:0; transform: translateY(20px) }
          to { opacity:1; transform: translateY(0) }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0) }
          50% { transform: translateY(-18px) }
          100% { transform: translateY(0) }
        }

        @keyframes scroll {
          0% { transform: translateY(0); opacity:1 }
          100% { transform: translateY(10px); opacity:0 }
        }

        .animate-scroll {
          animation: scroll 1.5s infinite;
        }

      `}</style>

    </section>
  );
}

export default Hero;


