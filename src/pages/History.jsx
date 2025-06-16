import { useEffect, useState } from "react";
import { getHistory, clearHistory } from "../utils/history";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

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
        <h2 className="text-2xl font-bold">Recently Viewed Sections</h2>
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
        <p className="text-gray-500">No history found.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item, idx) => (
            <li key={idx} className="p-4 border rounded hover:shadow-sm transition-shadow">
              <Link to={`/history/${item.source}/${item.section}`} className="block">
                <p className="font-semibold">
                  {item.source} - Section {item.section}
                </p>
                <p className="text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Viewed on: {new Date(item.timestamp).toLocaleString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
