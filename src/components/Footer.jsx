// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-[#f2f2f2] text-slate-800 py-4 shadow-[0_-3px_2px_-1px_rgba(0,0,0,0.1)]">
//       <div className="container mx-auto text-center">
//         <p className="text-sm">&copy; {currentYear} LawCodes.in, All Rights Reserved.</p>
//         <p className="text-sm">
//           Made with ❤️ by{" "}
//           <a
//             href="https://heymark.vercel.app"
//             className="text-blue-400 hover:underline"
//           >
//             md_mark
//           </a>
//         </p>
//       </div>
//     </footer>
//   )
// }

// export default Footer;

import logo from '/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f2f2f2] text-slate-800 px-4 py-6 shadow-[0_-3px_2px_-1px_rgba(0,0,0,0.1)]">
      <div className="container max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-sm">

        {/* Logo & About */}
        <div className="flex flex-col justify-between items-center sm:items-start">
          <div>
            <img src={logo} alt="LawCodes Logo" className="w-28 mb-2" />
            <p className="text-left">
              <strong>LawCodes.in</strong> is your free resource for browsing Indian legal codes like IPC, CrPC, IEA, and more. Simplified, fast, and mobile-friendly.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col justify-between items-start sm:items-end sm:mr-8">
          <div>
            <h4 className="font-semibold text-base mb-2">Quick Links</h4>
            <Link to="/" className="hover:underline block mb-1">Home</Link>
            <Link to="/history" className="hover:underline block mb-1">History</Link>
            <Link to="/bookmarks" className="hover:underline block">Bookmarks</Link>
          </div>
        </div>

        {/* Resource Links */}
        <div className="flex flex-col justify-between items-start sm:items-end sm:mr-8">
          <div>
            <h4 className="font-semibold text-base mb-2">Resources</h4>
            <Link to="/blog" className="hover:underline block mb-1">Blog</Link>
            <Link to="/privacy-policy" className="hover:underline block mb-1">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline block">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-xs text-gray-600">
        <p>&copy; {currentYear} LawCodes.in, All Rights Reserved.</p>
        <p className="mt-1">
          Made with ❤️ by{' '}
          <a
            href="https://heymark.vercel.app"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            md_mark
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
