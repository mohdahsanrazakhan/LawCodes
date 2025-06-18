import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ipc from "../data/ipc.json";
import crpc from "../data/crpc.json";
import iea from "../data/iea.json";
import { addBookmark, getBookmarks, removeBookmark } from "../utils/bookmarks";
import { addToHistory } from "../utils/history";
import { Bookmark, ChevronLeft } from "lucide-react";

const sources = {
  IPC: ipc,
  CRPC: crpc,
  IEA: iea,
};

const Detail = () => {
  const { source, section } = useParams();
  const rawData = sources[source.toUpperCase()] || [];
  const law = rawData.find((item) => item.section.toString() === section);

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = getBookmarks();
    const exists = bookmarks.some(
      (b) => b.section.toString() === section && b.source === source.toUpperCase()
    );
    setIsBookmarked(exists);
  }, [source, section]);

  const toggleBookmark = () => {
    const item = {
      section: law.section,
      title: law.section_title,
      content: law.section_desc,
      source: source.toUpperCase(),
      timestamp: Date.now(),
    };
    if (isBookmarked) {
      removeBookmark(item.section, item.source);
      setIsBookmarked(false);
    } else {
      addBookmark(item);
      setIsBookmarked(true);
    }
  };

  // Add to history when law is found
  useEffect(() => {
    if (law) {
      addToHistory({
        section: law.section,
        title: law.section_title,
        content: law.section_desc,
        source: source.toUpperCase(),
      });
    }
  }, [law, source]);

  if (!law) return <p className="p-4 text-gray-500 dark:text-gray-200">Section not found.</p>;

  const { section_title, section_desc } = law;

  return (
    <div className="min-h-screen max-w-2xl m-auto text-gray-800 dark:text-gray-200 p-4">
      <div className="flex items-center justify-between bg-[#f2f2f2] dark:bg-[#222831] py-2 px-4 rounded">
        <div className="flex items-center group px-2 pr-4 py-1 rounded transition-colors duration-200 hover:bg-purple-200">
          <Link to="/" className="text-[#5c47c4] dark:text-[#c6bdff] hover:dark:text-[#5c47c4] underline flex items-center">
            <ChevronLeft />
          </Link>
          <span
            className="ml-1 opacity-0 translate-x-[-4px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-[#5c47c4]"
          >
            Back to Search
          </span>
        </div>

        <button
          onClick={toggleBookmark}
          className={`px-4 py-2 rounded cursor-pointer ${isBookmarked
            ? "bg-purple-200"
            : "bg-purple-100 dark:bg-[#c6bdff]"
            }`}
        >
          {isBookmarked ? <Bookmark stroke="#5c47c4" fill="#5c47c4" /> : <Bookmark stroke="#5c47c4" />}
        </button>
      </div>
      <h1 className="text-xl font-bold mt-4">
        {source.toUpperCase()} - Section {section}: {section_title}
      </h1>
      <p className="mt-4 whitespace-pre-line text-gray-700 dark:text-gray-200">{section_desc}</p>
    </div>
  );
};

export default Detail;
