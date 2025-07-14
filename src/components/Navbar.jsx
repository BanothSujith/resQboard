import { NavLink } from "react-router-dom";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme((prev) => (prev === "bright" ? "dark" : "bright"));
  };

  return (
    <nav className="bg-[var(--navbar)] shadow-md p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center w-full mx-auto flex-wrap">
        <motion.h1
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-xl font-bold text-[var(--primary)] cursor-pointer"
        >
          ResQBoard
        </motion.h1>

        <div className="flex items-center gap-6 pr-4 mt-4 sm:mt-0 flex-wrap">
          <button
            onClick={toggleTheme}
            className="text-[var(--text)] hover:opacity-70 transition hidden md:block"
            title="Toggle Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: 180, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -180, scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {theme === "bright" ? (
                  <BsMoonFill size={20} />
                ) : (
                  <BsSunFill size={20} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>

          {[
            { to: "/", label: "Home" },
            { to: "/draw", label: "Draw" },
            { to: "/alerts", label: "Alerts" },
            { to: "/help", label: "Help" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--primary)] hover:after:w-full after:transition-all after:duration-300 ${
                  isActive
                    ? "text-[var(--primary)]"
                    : "text-[var(--text)] hover:text-[var(--primary)]"
                } font-bold px-1`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
