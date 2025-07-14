import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuestionCircle,
  FaChevronDown,
  FaEnvelope,
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const faqs = [
  {
    question: "What is this app about?",
    answer:
      "This project demonstrates usage of various modern Web APIs like Geolocation, Canvas, Background Tasks, Intersection Observer, and Network Info in real-world scenarios.",
  },
  {
    question: "Which APIs are used in this app?",
    answer:
      "The app uses Geolocation API for location, Canvas API for drawing, Network Information API to fetch speed/type, Intersection Observer API to animate visibility, and Background Tasks API for low-priority tasks.",
  },
  {
    question: "Why doesn’t Background Tasks API work in Chrome?",
    answer:
      "Because it's still experimental. We simulate its behavior using fallbacks, and log appropriate messages if unsupported.",
  },
  {
    question: "How can I customize the drawing board?",
    answer:
      "Go to the Draw page. You can choose your brush color, opacity, and background color dynamically before drawing.",
  },
  {
    question: "Why is my location not showing?",
    answer:
      "You may need to allow location access in your browser. Also, GPS-based devices give better accuracy (e.g., phones).",
  },
  {
    question: "How accurate is the Geolocation?",
    answer:
      "It depends on your device, GPS, and internet connection. Accuracy is usually higher on mobile devices with GPS enabled.",
  },
  {
    question: "Why is network speed N/A?",
    answer:
      "Some browsers like Safari and older Chrome versions don't support the Network Information API on desktops.",
  },
  {
    question: "Is this project mobile-friendly?",
    answer:
      "Yes! The entire UI is responsive, tested on multiple screen sizes, and styled with CSS variables for light/dark modes.",
  },
  {
    question: "How can I contact the developer?",
    answer: "CONTACT_ME",
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const renderAnswer = (answer) => {
    if (answer !== "CONTACT_ME") {
      return <p className="text-[var(--text-light)] text-base">{answer}</p>;
    }

    return (
      <div className="space-y-2 text-[var(--text-light)] text-base">
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-[var(--info)]" />
          <a
            href="mailto:banothsujith4@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text)]"
          >
            banothsujith4@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-[var(--success)]" />
          <a
            href="tel:7995037426"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text)]"
          >
            7995037426
          </a>
        </div>
        <div className="flex items-center gap-3">
          <FaGithub className="text-[var(--text-light)] " />
          <a
            href="https://github.com/BanothSujith"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text)] hover:underline"
          >
            github.com/Sujithbanoth
          </a>
        </div>
        <div className="flex items-center gap-3">
          <FaLinkedin className="text-[var(--primary)]" />
          <a
            href="https://www.linkedin.com/in/banothsujith/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text)] hover:underline"
          >
            linkedin.com/in/banoth-sujith
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg-body)] text-[var(--text)] px-6 py-8 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6 flex gap-3 items-center">
        <FaQuestionCircle /> Help & FAQs
      </h1>

      <div className="space-y-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-[var(--shadow)] "
            >
              <button
                className="flex justify-between items-center w-full text-left text-xl font-semibold text-[var(--text)]"
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
                <FaChevronDown
                  className={`text-[var(--primary)] transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3"
                  >
                    {renderAnswer(item.answer)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Help;
