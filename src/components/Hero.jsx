import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileImage from '../assets/profile/image.jpeg';

function Hero() {

  const roles = ["Web Developer", "App Developer", "Data Analyst"];
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D8CFB0] via-[#CDB77F] to-[#BDAA86] opacity-70 animate-heroGradientShift"></div>

      {/* Animated Morphing Blobs - Left */}
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-[#CDB77F] to-transparent rounded-full blur-[160px] opacity-30 -top-40 -left-40 animate-heroBlobMorph1"></div>
      
      {/* Animated Morphing Blobs - Right */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-bl from-[#9B5F3F] to-transparent rounded-full blur-[150px] opacity-25 bottom-[-150px] right-[-150px] animate-heroBlobMorph2"></div>

      {/* Animated Orbital Ring */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[800px] h-[800px] border border-[#CDB77F]/10 rounded-full animate-heroOrbitalRotate"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-25"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              background: i % 2 === 0 ? "#CDB77F" : "#9B5F3F",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `heroFloatParticle${(i % 6) + 1} ${5 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Animated Depth Shift Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-heroDepthShift pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10 pt-24 md:pt-0">

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8">

            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-[#6F4A2D] leading-tight ${isVisible ? 'animate-slideDown' : 'opacity-0'}`}>
              Hi, I'm <span className="text-[#9B5F3F] inline-block animate-colorPulse">Avinash</span>
            </h1>

            {/* Typing Role */}
            <div className={`text-xl sm:text-2xl md:text-3xl font-semibold text-[#9B5F3F] min-h-[36px] ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <span className="inline-block">{text}</span>
              <span className="animate-cursor">|</span>
            </div>

            <p className={`text-lg text-[#5A4028] max-w-xl leading-relaxed opacity-90 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
              I am a Computer Engineering student passionate about building
              modern web and mobile applications. I enjoy solving real-world
              problems through technology and creating elegant digital
              experiences.
            </p>

            {/* Buttons */}
            <div className={`flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>

              <Link
                to="/projects"
                className="relative px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#9B5F3F] text-white font-semibold shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-110 text-sm sm:text-base overflow-hidden group"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-[#7A4430] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full"></div>
              </Link>

              <Link
                to="/contact"
                className="relative px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-[#9B5F3F] text-[#6F4A2D] font-semibold transition-all duration-500 hover:scale-110 text-sm sm:text-base group overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Contact Me</span>
                <div className="absolute inset-0 bg-[#9B5F3F] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full -z-0"></div>
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className={`flex justify-center md:justify-end mt-4 md:mt-0 ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>

            <div className="relative w-56 h-72 sm:w-72 sm:h-96 md:w-[380px] md:h-[480px] group animate-floatAdvanced">

              {/* Animated Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#CDB77F] to-[#9B5F3F] blur-3xl opacity-40 group-hover:opacity-70 transition duration-700 animate-glowPulse"></div>
              
              {/* Animated Border Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#CDB77F] via-[#9B5F3F] to-[#6F4A2D] rounded-[120px] opacity-0 group-hover:opacity-30 blur-lg transition duration-700 animate-rotateBorder"></div>

              {/* Image Container */}
              <div className="relative w-full h-full rounded-[120px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] transform transition duration-500 group-hover:scale-[1.08] group-hover:shadow-[0_50px_120px_rgba(155,95,63,0.4)]">

                <img
                  src={profileImage}
                  alt="Avinash"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                
                {/* Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition duration-500"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator with enhanced animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-fadeIn" style={{animationDelay: '1s'}}>

        <div className="w-6 h-10 border-2 border-[#6F4A2D] rounded-full flex justify-center hover:border-[#9B5F3F] transition-colors duration-300 group">

          <div className="w-1.5 h-3 bg-[#6F4A2D] rounded-full mt-2 animate-scrollBounce group-hover:bg-[#9B5F3F]"></div>

        </div>

      </div>

      {/* Animations */}
      <style jsx>{`

        /* Entrance Animations */
        .animate-slideDown {
          animation: slideDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        /* Keyframes */
        @keyframes slideDown {
          from {
            transform: translateY(-60px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Background Animations */
        .animate-heroGradientShift {
          animation: heroGradientShift 15s ease-in-out infinite;
        }

        @keyframes heroGradientShift {
          0%, 100% {
            background: linear-gradient(to bottom right, #D8CFB0, #CDB77F, #BDAA86);
            opacity: 0.7;
          }
          50% {
            background: linear-gradient(to bottom right, #CDB77F, #BDAA86, #D8CFB0);
            opacity: 0.8;
          }
        }

        /* Morphing Blob Animations */
        .animate-heroBlobMorph1 {
          animation: heroBlobMorph1 20s ease-in-out infinite;
        }

        @keyframes heroBlobMorph1 {
          0%, 100% {
            opacity: 0.3;
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            opacity: 0.4;
            transform: translate(50px, -50px) scale(1.15) rotate(90deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            opacity: 0.3;
            transform: translate(-50px, 50px) scale(0.9) rotate(180deg);
            border-radius: 70% 30% 66% 33% / 33% 66% 33% 66%;
          }
          75% {
            opacity: 0.35;
            transform: translate(40px, 40px) scale(1.1) rotate(270deg);
            border-radius: 40% 60% 30% 70% / 30% 30% 70% 70%;
          }
        }

        .animate-heroBlobMorph2 {
          animation: heroBlobMorph2 22s ease-in-out infinite;
        }

        @keyframes heroBlobMorph2 {
          0%, 100% {
            opacity: 0.25;
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            opacity: 0.35;
            transform: translate(-60px, 40px) scale(1.1) rotate(90deg);
            border-radius: 58% 42% 44% 56% / 34% 53% 47% 66%;
          }
          50% {
            opacity: 0.2;
            transform: translate(60px, -60px) scale(1.15) rotate(180deg);
            border-radius: 70% 30% 66% 33% / 33% 66% 33% 66%;
          }
          75% {
            opacity: 0.3;
            transform: translate(-40px, -40px) scale(1.05) rotate(270deg);
            border-radius: 42% 58% 70% 30% / 58% 44% 56% 42%;
          }
        }

        /* Orbital Ring Animation */
        .animate-heroOrbitalRotate {
          animation: heroOrbitalRotate 25s linear infinite;
        }

        @keyframes heroOrbitalRotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
            border-color: rgba(205, 183, 127, 0.15);
          }
          50% {
            border-color: rgba(205, 183, 127, 0.25);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
            border-color: rgba(205, 183, 127, 0.15);
          }
        }

        /* Depth Shift Animation */
        .animate-heroDepthShift {
          animation: heroDepthShift 8s ease-in-out infinite;
        }

        @keyframes heroDepthShift {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.05;
          }
        }

        /* Floating Particle Animations */
        @keyframes heroFloatParticle1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-60px) translateX(60px); opacity: 0.4; }
        }

        @keyframes heroFloatParticle2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-70px) translateX(-70px); opacity: 0.45; }
        }

        @keyframes heroFloatParticle3 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-80px) translateX(40px); opacity: 0.4; }
        }

        @keyframes heroFloatParticle4 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-50px) translateX(-60px); opacity: 0.45; }
        }

        @keyframes heroFloatParticle5 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-75px) translateX(50px); opacity: 0.4; }
        }

        @keyframes heroFloatParticle6 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-65px) translateX(-55px); opacity: 0.4; }
        }

        /* Advanced Image Animation */
        .animate-floatAdvanced {
          animation: floatAdvanced 5s cubic-bezier(0.42, 0, 0.58, 1) infinite;
        }

        @keyframes floatAdvanced {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(1deg);
          }
          50% {
            transform: translateY(-15px) rotate(-1deg);
          }
          75% {
            transform: translateY(-20px) rotate(1deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        /* Glow Pulse Animation */
        .animate-glowPulse {
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.4;
            filter: blur(120px);
          }
          50% {
            opacity: 0.6;
            filter: blur(150px);
          }
        }

        /* Rotating Border Animation */
        .animate-rotateBorder {
          animation: rotateBorder 6s linear infinite;
        }

        @keyframes rotateBorder {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Cursor Animation */
        .animate-cursor {
          display: inline-block;
          animation: cursor 1s infinite;
          margin-left: 2px;
        }

        @keyframes cursor {
          0%, 49%, 100% {
            opacity: 1;
          }
          50%, 99% {
            opacity: 0;
          }
        }

        /* Color Pulse for Name */
        .animate-colorPulse {
          animation: colorPulse 4s ease-in-out infinite;
        }

        @keyframes colorPulse {
          0%, 100% {
            color: #9B5F3F;
            text-shadow: 0 0 20px rgba(155, 95, 63, 0.3);
          }
          50% {
            color: #CDB77F;
            text-shadow: 0 0 30px rgba(205, 183, 127, 0.5);
          }
        }

        /* Scroll Bounce Animation */
        .animate-scrollBounce {
          animation: scrollBounce 2s infinite;
        }

        @keyframes scrollBounce {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }

      `}</style>

    </section>
  );
}

export default Hero;


