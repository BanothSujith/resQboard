import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[var(--navbar)] border-t border-[var(--border)] text-[var(--text-light)] px-6 py-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6">
        {/* Left Section - Logo & Info */}
        <div>
          <h2 className="text-xl font-extrabold text-[var(--primary)]">ResQBoard</h2>
          <p className="text-sm max-w-sm mt-1">
            Real-world utility web app using Geolocation, Canvas, Intersection Observer, Network, and Background APIs.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-[var(--primary)]" />
            <a href="tel:+917995037426" className="hover:text-[var(--primary)] transition">
              +91 79950 37426
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-[var(--primary)]" />
            <a
              href="mailto:banothsujith4@gmail.com"
              className="hover:text-[var(--primary)] transition"
            >
              banothsujith4@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaLinkedin className="text-[var(--primary)]" />
            <a
              href="https://www.linkedin.com/in/banothsujith/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary)] transition"
            >
              linkedin.com/in/banothsujith
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaGithub className="text-[var(--primary)]" />
            <a
              href="https://github.com/BanothSujith"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary)] transition"
            >
              github.com/BanothSujith
            </a>
          </div>
        </div>
      </div>

      <p className="text-xs text-center mt-6 text-[var(--text-light)]">
        © {new Date().getFullYear()} ResQBoard — Built by Banoth Sujith
      </p>
    </motion.footer>
  );
};

export default Footer;
