import React, { useState } from "react";
import { Mail, Linkedin, Github, Phone, Send, Check } from "lucide-react";
import { personalInfo } from "../data/certifications";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailClick = () => {
    // Copy email to clipboard
    navigator.clipboard.writeText(personalInfo.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#D8CFB0] relative overflow-hidden pt-24">

      {/* Animated Background Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-[#CDB77F] blur-[160px] opacity-30 top-20 -left-32 rounded-full animate-contactGradientShift"></div>
        <div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] blur-[140px] opacity-20 bottom-[-150px] right-[-150px] rounded-full animate-contactGradientShift" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Animated Morphing Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-[#CDB77F]/20 to-transparent blur-3xl rounded-full animate-contactBlobMorph1 top-1/4 left-1/3"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-[#9B5F3F]/15 to-transparent blur-3xl rounded-full animate-contactBlobMorph2 bottom-1/4 right-1/4" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Orbital Ring */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] border border-[#CDB77F]/10 rounded-full animate-contactOrbitalRotate"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-25"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 2 === 0 ? "#CDB77F" : "#9B5F3F",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `contactFloatParticle${i + 1} ${4 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#9B5F3F] via-[#8B5736] to-[#6F4A2D] text-white py-12 md:py-20 shadow-xl overflow-hidden">
        {/* Header Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#9B5F3F]/0 via-[#CDB77F]/5 to-[#9B5F3F]/0 animate-contactGradientShift pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 pt-6 relative z-10">
          {/* Animated Decorative Lines */}
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#CDB77F] to-transparent opacity-40 animate-contactExpandLeft w-32"></div>
          <div className="absolute top-0 right-0 h-1 bg-gradient-to-l from-[#CDB77F] to-transparent opacity-40 animate-contactExpandRight w-32"></div>
          
          {/* Pulsing Glow Dot */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#CDB77F] rounded-full animate-contactPulseGlow"></div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 animate-fadeUp">
            Get In <span className="text-[#EDE3CF]">Touch</span>
          </h1>
          <p className="max-w-2xl text-lg opacity-90 animate-fadeUp delay-200">
            Have a project in mind, an opportunity to share, or just want to say hello? I'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Left — Info */}
          <div className="space-y-10 animate-fadeUp delay-300">

            <div>
              <h2 className="text-3xl font-serif font-bold text-[#6F4A2D] mb-4">
                Let's Work <span className="text-[#9B5F3F]">Together</span>
              </h2>
              <p className="text-[#6F4A2D]/80 leading-relaxed text-lg">
                I'm always open to collaborating on exciting projects, internships, and innovative ideas.
                If you have an opportunity or project in mind, feel free to reach out.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-5">

              <button
                onClick={handleEmailClick}
                className="w-full flex items-center gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-left animate-fadeUp delay-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500"></div>
                <div className="w-12 h-12 rounded-full bg-[#9B5F3F] flex items-center justify-center shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {emailCopied ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <Mail size={20} className="text-white" />
                  )}
                </div>
                <div className="relative z-10">
                  <p className="text-xs text-[#6F4A2D]/60 font-medium uppercase tracking-wide">Email</p>
                  <p className="text-[#6F4A2D] font-semibold group-hover:text-[#9B5F3F] transition break-all text-sm">
                    {emailCopied ? "Copied!" : personalInfo.email}
                  </p>
                </div>
              </button>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fadeUp delay-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500"></div>
                <div className="w-12 h-12 rounded-full bg-[#9B5F3F] flex items-center justify-center shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <Linkedin size={20} className="text-white" />
                </div>
                <div className="relative z-10">
                  <p className="text-xs text-[#6F4A2D]/60 font-medium uppercase tracking-wide">LinkedIn</p>
                  <p className="text-[#6F4A2D] font-semibold group-hover:text-[#9B5F3F] transition">Connect with me</p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fadeUp delay-400 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500"></div>
                <div className="w-12 h-12 rounded-full bg-[#9B5F3F] flex items-center justify-center shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <Github size={20} className="text-white" />
                </div>
                <div className="relative z-10">
                  <p className="text-xs text-[#6F4A2D]/60 font-medium uppercase tracking-wide">GitHub</p>
                  <p className="text-[#6F4A2D] font-semibold group-hover:text-[#9B5F3F] transition">View my work</p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fadeUp delay-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500"></div>
                <div className="w-12 h-12 rounded-full bg-[#9B5F3F] flex items-center justify-center shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <Phone size={20} className="text-white" />
                </div>
                <div className="relative z-10">
                  <p className="text-xs text-[#6F4A2D]/60 font-medium uppercase tracking-wide">Phone</p>
                  <p className="text-[#6F4A2D] font-semibold group-hover:text-[#9B5F3F] transition">{personalInfo.phone}</p>
                </div>
              </a>

            </div>

          </div>

          {/* Right — Form */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10 animate-fadeUp delay-400 relative overflow-hidden group">
            {/* Form Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12" style={{ animation: 'shimmer 3s infinite' }}></div>
            </div>

            <div className="relative z-10">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-[#9B5F3F] rounded-full flex items-center justify-center mx-auto">
                  <Send size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#6F4A2D]">Message Sent!</h3>
                <p className="text-[#6F4A2D]/70">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-4 px-6 py-2 rounded-full bg-[#9B5F3F] text-white font-semibold hover:scale-105 transition"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <h3 className="text-2xl font-serif font-bold text-[#6F4A2D] mb-2">Send a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#6F4A2D]">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Avinash Chavda"
                      className="w-full px-4 py-3 rounded-xl bg-[#F4EEDB] text-[#6F4A2D] placeholder-[#6F4A2D]/40 outline-none focus:ring-2 focus:ring-[#9B5F3F] transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#6F4A2D]">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="avinash@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F4EEDB] text-[#6F4A2D] placeholder-[#6F4A2D]/40 outline-none focus:ring-2 focus:ring-[#9B5F3F] transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#6F4A2D]">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Collaboration / Internship / Just Saying Hi"
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EEDB] text-[#6F4A2D] placeholder-[#6F4A2D]/40 outline-none focus:ring-2 focus:ring-[#9B5F3F] transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#6F4A2D]">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EEDB] text-[#6F4A2D] placeholder-[#6F4A2D]/40 outline-none focus:ring-2 focus:ring-[#9B5F3F] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#9B5F3F] text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  <Send size={18} />
                  Send Message
                </button>

              </form>
            )}
            </div>

          </div>

        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        .animate-fadeUp {
          animation: fadeUp 0.9s ease forwards;
          opacity: 0;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-contactGradientShift {
          animation: contactGradientShift 12s ease-in-out infinite;
        }

        @keyframes contactGradientShift {
          0%, 100% {
            opacity: 0.3;
            transform: translate(0, 0) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        .animate-contactBlobMorph1 {
          animation: contactBlobMorph1 16s ease-in-out infinite;
        }

        @keyframes contactBlobMorph1 {
          0%, 100% {
            opacity: 0.15;
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            opacity: 0.25;
            transform: translate(50px, -50px) scale(1.1) rotate(90deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            opacity: 0.15;
            transform: translate(-50px, 50px) scale(0.95) rotate(180deg);
            border-radius: 70% 30% 66% 33% / 33% 66% 33% 66%;
          }
          75% {
            opacity: 0.2;
            transform: translate(40px, 40px) scale(1.05) rotate(270deg);
            border-radius: 40% 60% 30% 70% / 30% 30% 70% 70%;
          }
        }

        .animate-contactBlobMorph2 {
          animation: contactBlobMorph2 18s ease-in-out infinite;
        }

        @keyframes contactBlobMorph2 {
          0%, 100% {
            opacity: 0.1;
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            opacity: 0.18;
            transform: translate(-60px, 40px) scale(0.98) rotate(90deg);
            border-radius: 58% 42% 44% 56% / 34% 53% 47% 66%;
          }
          50% {
            opacity: 0.12;
            transform: translate(60px, -60px) scale(1.08) rotate(180deg);
            border-radius: 70% 30% 66% 33% / 33% 66% 33% 66%;
          }
          75% {
            opacity: 0.16;
            transform: translate(-40px, -40px) scale(1.02) rotate(270deg);
            border-radius: 42% 58% 70% 30% / 58% 44% 56% 42%;
          }
        }

        .animate-contactOrbitalRotate {
          animation: contactOrbitalRotate 20s linear infinite;
        }

        @keyframes contactOrbitalRotate {
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

        .animate-contactPulseGlow {
          animation: contactPulseGlow 2s ease-in-out infinite;
        }

        @keyframes contactPulseGlow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(205, 183, 127, 0.3);
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            box-shadow: 0 0 16px rgba(205, 183, 127, 0.6);
            transform: scale(1.3);
            opacity: 0.9;
          }
        }

        .animate-contactExpandLeft {
          animation: contactExpandLeft 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes contactExpandLeft {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        .animate-contactExpandRight {
          animation: contactExpandRight 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes contactExpandRight {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes contactFloatParticle1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-50px) translateX(50px); opacity: 0.4; }
        }

        @keyframes contactFloatParticle2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-60px) translateX(-60px); opacity: 0.45; }
        }

        @keyframes contactFloatParticle3 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-70px) translateX(30px); opacity: 0.4; }
        }

        @keyframes contactFloatParticle4 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-40px) translateX(-50px); opacity: 0.45; }
        }

        @keyframes contactFloatParticle5 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-65px) translateX(45px); opacity: 0.4; }
        }

        @keyframes contactFloatParticle6 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-55px) translateX(-45px); opacity: 0.4; }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

export default ContactPage;
