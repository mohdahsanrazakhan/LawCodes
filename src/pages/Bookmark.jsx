import { useEffect, useState } from "react";
import { getBookmarks, removeBookmark, clearBookmarks } from "../utils/bookmarks";
import { Link } from "react-router-dom";
import { BookmarkX } from "lucide-react";

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
    <div className="container max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Bookmarked Sections</h2>
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
        <p className="text-gray-500">No bookmarks found.</p>
      ) : (
        <ul className="space-y-4">
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
                  <p className="text-xs text-gray-500 mt-1">
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
      )}
    </div>
  );
};

export default Bookmark;
