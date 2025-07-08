import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { createFuseIndex, performSearch } from "../utils/search";
import ipc from "../data/ipc.json";
import crpc from "../data/crpc.json";
import iea from "../data/iea.json";
import sparkles from "../assets/sparkles.svg";
import { Helmet } from "@dr.pogodin/react-helmet";

// Normalize data
const normalize = (item, source) => ({
  section: item.section,
  title: item.section_title,
  content: item.section_desc,
  source,
});

// Prepare full data
const allLawsRaw = [
  ...ipc.map((item) => normalize(item, "IPC")),
  ...crpc.map((item) => normalize(item, "CRPC")),
  ...iea.map((item) => normalize(item, "IEA")),
];

// Initial Fuse instance (default: all selected)
let fuse = createFuseIndex(allLawsRaw);

const phrases = [
  "IPC Section 302 - Punishment for murder",
  "IPC Section 376 - Punishment for rape",
  "Cheating and dishonestly inducing delivery of property",
  "IPC Section 307 - Attempt to murder",
  "IPC Section 498A - Cruelty by husband or relatives",
  "IPC Section 304B - Dowry death",
  "IPC Section 120B - Criminal conspiracy",
  "Deliberate acts to outrage religious feelings",
  "CRPC Section 154 - FIR procedure",
  "CRPC Section 438 - Anticipatory bail",
  "Maintenance for wife, children, and parents",
  "CRPC Section 144",
  "Prosecution of public servants",
  "CRPC Section 313",
  "Confession caused by inducement",
  "Statements by persons who cannot be called as witnesses",
  "Admissibility of electronic records",
  "IEA Section 114",
  "IEA Section 45 - Opinions of experts"
];

const SearchLaw = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [placeholder, setPlaceholder] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [filters, setFilters] = useState({
    IPC: true,
    CRPC: true,
    IEA: true,
  });

  const isVisible = query.trim() !== "";

  // Typing placeholder effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const handleTyping = () => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setPlaceholder(currentPhrase.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (charIndex > 0) {
          setPlaceholder(currentPhrase.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  // Create filtered dataset and Fuse index when filters change
  useEffect(() => {
    const sources = Object.entries(filters)
      .filter(([_, val]) => val)
      .map(([key]) => key);

    const filtered = allLawsRaw.filter((item) => sources.includes(item.source));
    fuse = createFuseIndex(filtered); // recreate Fuse with filtered data

    if (query.trim()) {
      const result = performSearch(fuse, query);
      setResults(result);
    } else {
      setResults([]);
    }
  }, [filters]);

  // Debounced search
  const debouncedSearch = debounce((text) => {
    const result = performSearch(fuse, text);
    setResults(result);
  }, 300);

  useEffect(() => {
    if (query.trim()) debouncedSearch(query);
    else setResults([]);
    return () => debouncedSearch.cancel();
  }, [query]);

  const handleCheckboxChange = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <html lang="en" />
        <title>Legal Codes | Find Indian Laws & Acts Easily</title>
        <meta name="description" content="Search Indian legal codes, laws, and acts effortlessly. LegalCodes.in provides accurate and fast legal search." />
        <meta name="keywords" content="Indianlegalservices, legaladvicesforbusiness, indianlegalcodes, Indian law, Indian legal codes, Indian acts, Constitution of India, Indian Penal Code, RTI Act, GST Act, consumer protection act, labor law India, legal search engine India, find Indian laws, Indian legal database" />
        <link rel="canonical" href="https://www.legalcodes.in/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="LegalCodes.in" />

        {/* Viewport for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph (Facebook, LinkedIn, etc.) */}
        <meta property="og:title" content="Legal Codes | Find Indian Laws & Acts Easily" />
        <meta property="og:description" content="Search Indian legal codes, laws, and acts effortlessly. LegalCodes.in provides accurate and fast legal search." />
        <meta property="og:url" content="https://www.legalcodes.in/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://legalcodes.in/logo.svg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Legal Codes | Find Indian Laws & Acts Easily" />
        <meta name="twitter:description" content="Search Indian legal codes, laws, and acts effortlessly. LegalCodes.in provides accurate and fast legal search." />
        <meta name="twitter:image" content="https://legalcodes.in/logo.svg" />
      </Helmet>

      {/* Checkboxes */}
      <div className="flex justify-left gap-4 mt-6 flex-wrap text-sm sm:text-base max-w-2xl mx-auto text-gray-800 dark:text-slate-200">
        <p>Filter:</p>
        {["IPC", "CRPC", "IEA"].map((key) => (
          <label key={key} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={() => handleCheckboxChange(key)}
              className="accent-[#5c47c4]"
            />
            {key}
          </label>
        ))}
      </div>

      {/* Search input */}
      <div className="relative flex-1 mt-4 w-[95%] max-w-2xl mx-auto p-[4px] rounded-md animated-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow">
        <div className="flex items-center justify-between bg-white rounded-md w-full">
          <input
            type="text"
            placeholder={placeholder}
            className="outline-none w-full p-2 bg-transparent text-sm sm:text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className={`animated-gradient bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-2 m-1 rounded-md transition-all duration-300 ease-in-out transform ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
              }`}
          >
            <img src={sparkles} alt="sparkles icon" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Results */}
      <ul className="max-w-2xl mx-auto mt-4 mb-6 px-4 sm:px-0">
        {results.map((item, idx) => (
          <li key={idx} className="mb-4 border rounded">
            <Link
              to={`/${item.source}/${item.section}`}
              className="flex flex-col bg-[#f5f5f5] hover:rounded-lg p-2 rounded transition hover:bg-[#ebebeb]"
            >
              <p className="font-semibold">
                {item.source} - Section {item.section}
              </p>
              <p className="text-sm">{item.title}</p>
              <p className="text-xs mt-2 text-gray-600 line-clamp-3">
                {item.content}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchLaw;
