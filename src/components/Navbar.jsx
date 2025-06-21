import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import logo from '/logo.svg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false); // close on link click

  const navLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'History', path: '/history' },
    { name: 'Bookmark', path: '/bookmarks' },
    { name: 'Blog', path: '/blog' },
  ]

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#f2f2f2] dark:bg-[#222831] shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container max-w-5xl m-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-32" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`relative inline-block text-[#5c47c4] dark:text-[#c6bdff] hover:font-semibold transition-all duration-200 ${isActive(link.path)
                ? "font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[2px] after:h-[10px] after:w-full after:bg-[#5c47c44d] after:opacity-50 after:z-[-1] after:rounded-[1px]"
                : ""
                }`}

            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-gray-800 dark:text-gray-200"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          className="sm:hidden px-4 pb-4 flex flex-col gap-2 animate-slide-down"
          onClick={closeMenu}
        >
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`relative inline-block text-[#5c47c4] dark:text-[#c6bdff] hover:underline transition-all duration-200 ${isActive('/about')
                ? 'font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#5c47c4] after:dark:bg-[#b6aaff] after:opacity-50 after:translate-y-1/2 after:z-[-1]'
                : ''
                }`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
