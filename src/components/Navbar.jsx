// import logo from '../../public/logo.svg';

// const Navbar = () => {
//   return (
//     <div className="bg-[#f2f2f2]">
//     <div className='container m-auto p-4 flex justify-between items-center'>
//       <a href="/" className="font-bold text-xl"><img src={logo} className='w-[120px]' /></a>
//       <div className="flex space-x-4">
//         <a href="/history" className="text-blue-600 hover:underline">History</a>
//         <a href="/bookmarks" className="text-blue-600 hover:underline">Bookmark</a>
//         <a href="/blog" className="text-blue-600 hover:underline">Blog</a>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Navbar;

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '/logo.svg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false); // close on link click

  return (
    <header className="bg-[#f2f2f2] shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container m-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-[120px]" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex space-x-6">
          <a href="/about" className="text-blue-600 hover:underline">About Us</a>
          <a href="/history" className="text-blue-600 hover:underline">History</a>
          <a href="/bookmarks" className="text-blue-600 hover:underline">Bookmark</a>
          <a href="/blog" className="text-blue-600 hover:underline">Blog</a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-gray-800"
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
          <a href="/history" className="text-blue-600 hover:underline">History</a>
          <a href="/bookmarks" className="text-blue-600 hover:underline">Bookmark</a>
          <a href="/blog" className="text-blue-600 hover:underline">Blog</a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
