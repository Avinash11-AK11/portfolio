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

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#CDB77F] blur-[160px] opacity-30 top-20 -left-32 rounded-full"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] blur-[140px] opacity-20 bottom-[-150px] right-[-150px] rounded-full"></div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#9B5F3F] via-[#8B5736] to-[#6F4A2D] text-white py-12 md:py-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Get In <span className="text-[#EDE3CF]">Touch</span>
          </h1>
          <p className="max-w-2xl text-lg opacity-90">
            Have a project in mind, an opportunity to share, or just want to say hello? I'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Left — Info */}
          <div className="space-y-10">

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
                className="w-full flex items-center gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-left"
              >
                <div className="w-12 h-12 rounded-full bg-[#9B5F3F] flex items-center justify-center shrink-0">
                  {emailCopied ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <Mail size={20} className="text-white" />
                  )}
                </div>
                <div>
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
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#9B5F3F] flex items-center justify-center shrink-0">
                  <Linkedin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#6F4A2D]/60 font-medium uppercase tracking-wide">LinkedIn</p>
                  <p className="text-[#6F4A2D] font-semibold group-hover:text-[#9B5F3F] transition">Connect with me</p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#9B5F3F] flex items-center justify-center shrink-0">
                  <Github size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#6F4A2D]/60 font-medium uppercase tracking-wide">GitHub</p>
                  <p className="text-[#6F4A2D] font-semibold group-hover:text-[#9B5F3F] transition">View my work</p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#9B5F3F] flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#6F4A2D]/60 font-medium uppercase tracking-wide">Phone</p>
                  <p className="text-[#6F4A2D] font-semibold group-hover:text-[#9B5F3F] transition">{personalInfo.phone}</p>
                </div>
              </a>

            </div>

          </div>

          {/* Right — Form */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10">

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
  );
}

export default ContactPage;
