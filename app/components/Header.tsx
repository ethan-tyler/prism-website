import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { Bell, ChevronDown, Menu, X, Search, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 72;
      const targetPosition =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        20;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-lg shadow-black/5"
          : "bg-white/90 backdrop-blur-lg border-b border-gray-100/50"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              to="/"
              className="flex items-center gap-3 font-bold text-xl text-gray-900 group"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="/prism_logo.svg"
                  alt="PRISM Analytics"
                  className="w-8 h-8 relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                PRISM Analytics
              </span>
            </Link>
          </motion.div>

          {/* Enhanced Navigation */}
          <nav className="hidden lg:flex items-center mx-8">
            {[
              { label: "Platform", id: "features", hasDropdown: true },
              { label: "Solutions", id: "metrics", hasDropdown: true },
              { label: "Company", id: "team", hasDropdown: true },
              { label: "Resources", id: "roadmap", hasDropdown: true },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 text-gray-600 font-medium rounded-lg transition-all duration-200 hover:text-gray-900 hover:bg-gray-50 group"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <span className="flex items-center gap-1">
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  )}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
                  layoutId="navUnderline"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Enhanced Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <motion.button
              className="hidden md:flex w-10 h-10 items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Enhanced Notifications */}
            <motion.button
              className="relative w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                3
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Settings */}
            <motion.button
              className="hidden md:flex w-10 h-10 items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            {/* Enhanced User Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    EU
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                </div>
                <span className="hidden sm:block text-gray-700 font-medium">Ethan Urbanski</span>
                <motion.div
                  animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-900">Ethan Urbanski</p>
                      <p className="text-sm text-gray-500">ethan@prismanalytics.com</p>
                    </div>
                    {[
                      { label: "Profile Settings", icon: Settings },
                      { label: "Notifications", icon: Bell },
                    ].map((item) => (
                      <motion.button
                        key={item.label}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-6 py-4 space-y-2">
                {[
                  { label: "Platform", id: "features" },
                  { label: "Solutions", id: "metrics" },
                  { label: "Company", id: "team" },
                  { label: "Resources", id: "roadmap" },
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
