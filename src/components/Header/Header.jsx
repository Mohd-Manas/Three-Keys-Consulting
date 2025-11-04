import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from '../../assets/Logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setActivePath(location.pathname);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", sectionId: "/" },
    { label: "Wills for Non-Muslims", sectionId: "/wills-non-muslims" },
    { label: "Sharia-Compliant Wills", sectionId: "/sharia-wills" },
    { label: "Services", sectionId: "/services" },
    { label: "About", sectionId: "/about" },
    { label: "Contacts", sectionId: "/contact" },
  ];

  const handleClick = (path) => {
    setActivePath(path);
    navigate(path);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const closeOnOutside = (e) => {
      if (!e.target.closest('.mobile-drawer') && !e.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutside);
    return () => document.removeEventListener('mousedown', closeOnOutside);
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
      style={{ backgroundColor: '#012269' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleClick('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={Logo}
              alt="Inheritas Logo"
              className="h-24 w-auto filter brightness-0 invert"
            />
          </motion.div>

          {/* Hamburger */}
          <button
            className="mobile-menu-button lg:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span className="w-full h-0.5 bg-white rounded-full"
                animate={isMobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }} />
              <motion.span className="w-full h-0.5 bg-white rounded-full"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }} />
              <motion.span className="w-full h-0.5 bg-white rounded-full"
                animate={isMobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }} />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Primary navigation">
            {menuItems.map(({ label, sectionId }) => (
              <motion.button
                key={sectionId}
                onClick={() => handleClick(sectionId)}
                type="button"
                className={`relative px-4 py-2 text-sm font-semibold text-white rounded-md transition-colors ${activePath === sectionId
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
                {activePath === sectionId && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="mobile-drawer fixed top-0 right-0 w-72 h-full bg-primary-900 shadow-2xl z-50 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="pt-20 px-6">
                <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
                  {menuItems.map(({ label, sectionId }) => (
                    <motion.button
                      key={sectionId}
                      onClick={() => handleClick(sectionId)}
                      type="button"
                      className={`text-left px-4 py-3 text-white font-semibold rounded-lg transition-all ${activePath === sectionId
                        ? 'bg-white/20 border-l-4 border-white'
                        : 'hover:bg-white/10 hover:pl-6'
                        }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {label}
                    </motion.button>
                  ))}

                  <motion.a
                    href="https://tkcfzllc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-4 py-3 text-white font-semibold text-center bg-secondary-600 rounded-lg hover:bg-secondary-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Three Keys Consulting →
                  </motion.a>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
