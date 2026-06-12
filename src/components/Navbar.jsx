import React, { useState, useEffect } from "react";

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar if scrolling up or if near top
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navLinks = [
    { name: "अन्तर", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Craft", href: "#skills" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b border-[rgba(242,235,217,0.03)]
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${lastScrollY > 20 ? "bg-[rgba(8,8,8,0.75)] backdrop-blur-md py-4" : "bg-transparent py-6"}
      `}
      style={{
        backgroundColor: lastScrollY > 20 ? "var(--bg-surface)" : "transparent",
        borderColor: "var(--border)"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          className="font-display font-black text-xl md:text-2xl tracking-tighter text-[var(--text-1)] flex items-center gap-2"
        >
          ANTARA <span className="font-sanskrit text-xs font-normal text-[var(--gold)] ml-1 opacity-80">अन्तर</span>
        </a>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-ui font-medium uppercase tracking-widest text-[var(--text-2)] hover:text-[var(--gold)] transition-colors duration-300 relative py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-[var(--border-gold)] flex items-center justify-center text-[var(--text-1)] hover:bg-[var(--border-gold)] transition-all duration-300"
            aria-label="Toggle visual theme"
            data-hover
          >
            {theme === "dark" ? (
              // Sun Icon (shows when dark, toggles to light)
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            ) : (
              // Moon Icon (shows when light, toggles to dark)
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
