import { useEffect, useState } from "react";
import { getHistory, clearHistory } from "../utils/history";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import NotFound from "../components/NotFound";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded"
          >
            <Trash2 size={16} />
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <NotFound page="history" />
      ) : (
        <>
          <h2 className="text-2xl font-bold text-[#5c47c4] dark:text-[#c6bdff]">Recently Viewed Sections</h2>
          <ul className="space-y-4 text-gray-800 dark:text-gray-200">
            {history.map((item, idx) => (
              <li key={idx} className="p-4 border rounded hover:shadow-sm transition-shadow">
                <Link to={`/history/${item.source}/${item.section}`} className="block">
                  <p className="font-semibold">
                    {item.source} - Section {item.section}
                  </p>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Viewed on: {new Date(item.timestamp).toLocaleString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default History;
