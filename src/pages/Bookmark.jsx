import { useEffect, useState } from "react";
import { getBookmarks, removeBookmark, clearBookmarks } from "../utils/bookmarks";
import { Link } from "react-router-dom";
import { BookmarkX } from "lucide-react";
import NotFound from "../components/NotFound";
import { Helmet } from "@dr.pogodin/react-helmet";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleClearBookmarks = () => {
    clearBookmarks();
    setBookmarks([]);
  };

  const handleRemoveBookmark = (section, source) => {
    removeBookmark(section, source);
    setBookmarks(getBookmarks());
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Bookmarks | Legal Codes</title>
        <meta name="description" content="Access your bookmarked Indian legal codes and laws easily at LegalCodes.in." />
        <link rel="canonical" href="https://www.legalcodes.in/bookmarks" />
      </Helmet>

      <div className="container max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          {bookmarks.length > 0 && (
            <button
              onClick={handleClearBookmarks}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded"
            >
              <BookmarkX size={16} />
              Clear
            </button>
          )}
        </div>

        {bookmarks.length === 0 ? (
          <NotFound page="bookmarks" />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#5c47c4] dark:text-[#c6bdff]">Bookmarked Sections</h2>
            <ul className="space-y-4 text-gray-800 dark:text-gray-200">
              {bookmarks.map((item, idx) => (
                <li key={idx} className="p-4 border rounded hover:shadow-sm transition-shadow">
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/bookmarks/${item.source}/${item.section}`}
                      className="block"
                    >
                      <p className="font-semibold">
                        {item.source} - Section {item.section}
                      </p>
                      <p className="text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Bookmarked on: {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </Link>
                    <button
                      onClick={() => handleRemoveBookmark(item.section, item.source)}
                      className="self-start text-red-600 text-sm underline hover:text-red-800"
                    >
                      Remove Bookmark
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Bookmark;
