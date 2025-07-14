import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GiRingingBell } from "react-icons/gi";

const dummyAlerts = [
  "Meeting with team at 3 PM",
  "Submit your assignment",
  "Network may be slow",
  "Battery low, please plug in",
  "Update your profile settings",
];

const Alerts = () => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const alertRefs = useRef([]);
  const [Message, setMessage] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting && !visibleAlerts.includes(index)) {
            setVisibleAlerts((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    alertRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      alertRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [visibleAlerts]);

  useEffect(() => {
    const scheduleTask = async () => {
      if ("scheduler" in navigator) {
        try {
          await navigator.scheduler.postTask(() => {
            setMessage({
              message: " Background task executed: Alert reminder",
              type: "info",
            });
          });
        } catch (error) {
          setMessage({
            message: "Scheduler failed",
            type: "danger",
          });
        }
      } else {
        setMessage({
          message: " Background Tasks API not supported.",
          type: "warning",
        });
      }
    };

    scheduleTask();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [Message]);

  return (
    <div className="relative w-full min-h-screen bg-[var(--bg-body)] text-[var(--text)] px-6 py-8 md:px-12">
      <AnimatePresence>
        {Message && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 left-1/2 z-50 bg-[var(--bg-card)] border border-[var(--border)] shadow-[var(--shadow)] p-4 rounded-lg"
          >
            <p className="text-base font-semibold text-[var(--text-light)]">
              {Message.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3">
        <GiRingingBell /> Alerts
      </h1>

      <div className="space-y-6">
        {dummyAlerts.map((text, index) => (
          <div
            key={index}
            ref={(el) => (alertRefs.current[index] = el)}
            data-index={index}
            className={`transition-all duration-500 ease-out transform ${
              visibleAlerts.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } bg-[var(--bg-card)] border border-[var(--border)] shadow-[var(--shadow)] p-4 rounded-lg`}
          >
            <p className="text-lg font-medium text-[var(--text-light)]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
