import toast from "react-hot-toast";
import { useRef } from "react";
import { FaPaperPlane, FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdPlace, MdEmail } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import { RiEarthLine } from "react-icons/ri";

const contactDetails = [
  {
    icon: <MdPlace />,
    title: "Address",
    value: "Dhaka, Bangladesh",
    cls: "bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.25)] text-[#f59e0b]",
    cardBorder: "border-[rgba(245,158,11,0.25)]",
  },
  {
    icon: <IoCallSharp />,
    title: "Phone",
    value: "+880 1XXX-XXXXXX",
    cls: "bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)] text-[#10b981]",
    cardBorder: "border-[rgba(16,185,129,0.25)]",
  },
  {
    icon: <MdEmail />,
    title: "Email",
    value: "hello@worldatlas.com",
    cls: "bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.25)] text-[#3b82f6]",
    cardBorder: "border-[rgba(59,130,246,0.25)]",
  },
];

const socials = [
  {
    icon: <FaGithub />, href: "https://github.com/Rakibboshunia", label: "GitHub",
    hoverCls: "hover:text-[#f0f6ff] hover:bg-[rgba(240,246,255,0.08)] hover:border-[rgba(240,246,255,0.25)] hover:shadow-[0_0_15px_rgba(240,246,255,0.2)]",
  },
  {
    icon: <FaTwitter />, href: "#", label: "Twitter",
    hoverCls: "hover:text-[#38bdf8] hover:bg-[rgba(56,189,248,0.08)] hover:border-[rgba(56,189,248,0.25)] hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]",
  },
  {
    icon: <FaLinkedinIn />, href: "#", label: "LinkedIn",
    hoverCls: "hover:text-[#3b82f6] hover:bg-[rgba(59,130,246,0.08)] hover:border-[rgba(59,130,246,0.25)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]",
  },
];

export const Contact = () => {
  const formRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formInputData = Object.fromEntries(formData.entries());
    toast.success(`Thanks, ${formInputData.username}! We'll get back to you soon.`);
    formRef.current.reset();
  };

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="section-label justify-center mx-auto">✦ Contact</span>
        <h1 className="text-white font-bold mb-3 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)]">
          Get in{" "}
          <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-sm max-w-md mx-auto text-[#4a6280]">
          Have a question or just want to say hello? We'd love to hear from you.
        </p>
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {/* Left Panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {contactDetails.map(({ icon, title, value, cls, cardBorder }) => (
            <motion.div
              key={title}
              whileHover={{ x: 4 }}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 bg-[rgba(9,20,40,0.8)] border ${cardBorder}`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl text-base flex-shrink-0 ${cls}`}>
                {icon}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-0.5 text-[#4a6280]">
                  {title}
                </p>
                <p className="text-slate-200 text-sm font-medium">{value}</p>
              </div>
            </motion.div>
          ))}

          {/* Quote card */}
          <div className="mt-1 p-5 rounded-2xl flex-1 bg-[linear-gradient(135deg,rgba(59,130,246,0.1)_0%,rgba(139,92,246,0.06)_100%)] border border-[rgba(59,130,246,0.18)]">
            <div className="flex items-center gap-2 mb-3">
              <RiEarthLine className="text-[#3b82f6] text-[1.1rem]" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">WorldAtlas</span>
            </div>
            <p className="text-sm leading-relaxed italic text-[#8ba3c7]">
              "We typically respond within 24 hours. Your message matters to us!"
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-3 mt-1">
            {socials.map(({ icon, href, label, hoverCls }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.1 }}
                className={`flex items-center justify-center w-10 h-10 rounded-xl text-base transition-all duration-300 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] text-[#4a6280] ${hoverCls}`}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
=======
      <div className="contact-wrapper container">
        <form ref={formRef} onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name."
            name="username"
            required
            autoComplete="off"
          />

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email."
            name="email"
            required
            autoComplete="off"
          />

          <textarea
            className="form-control"
            rows="8"
            placeholder="Enter your message."
            name="message"
            required
            autoComplete="off"
          ></textarea>
>>>>>>> 747bd3e44af3ffebc9bde10947437c6d559a632d

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="lg:col-span-3 flex flex-col gap-4 p-6 rounded-2xl bg-[rgba(9,20,40,0.85)] border border-[rgba(59,130,246,0.12)] backdrop-blur-[14px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-bold text-white text-lg mb-1 font-[family-name:var(--font-heading)]">
            Send a Message
          </h3>
          <p className="text-xs mb-2 text-[#4a6280]">
            Fill in the form and we'll reach out to you shortly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#4a6280] font-[family-name:var(--font-body)]">
                Your Name
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                name="username"
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#4a6280] font-[family-name:var(--font-body)]">
                Email Address
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="john@example.com"
                name="email"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#4a6280] font-[family-name:var(--font-body)]">
              Message
            </label>
            <textarea
              className="input-field resize-none"
              rows={6}
              placeholder="Tell us what's on your mind..."
              name="message"
              required
              autoComplete="off"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary justify-center"
          >
            Send Message <FaPaperPlane className="text-xs" />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};
