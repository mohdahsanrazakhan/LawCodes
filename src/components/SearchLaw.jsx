import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { createFuseIndex, performSearch } from "../utils/search";
import ipc from "../data/ipc.json";
import crpc from "../data/crpc.json";
import iea from "../data/iea.json";

const normalize = (item, source) => ({
  section: item.section,
  title: item.section_title,
  content: item.section_desc,
  source,
});

const allLaws = [
  ...ipc.map((item) => normalize(item, "IPC")),
  ...crpc.map((item) => normalize(item, "CRPC")),
  ...iea.map((item) => normalize(item, "IEA")),
];

const fuse = createFuseIndex(allLaws);

const SearchLaw = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const debouncedSearch = debounce((text) => {
    const result = performSearch(fuse, text);
    setResults(result);
  }, 300);

  useEffect(() => {
    if (query.trim()) debouncedSearch(query);
    else setResults([]);
    return () => debouncedSearch.cancel();
  }, [query]);

  return (
    <div className="flex-1 max-w-2xl m-auto bg-[#f9f9f9] text-black p-4">
      <input
        type="text"
        placeholder="Search IPC, CRPC, IEA..."
        className="border p-2 w-full mb-4"
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((item, idx) => (
          <li key={idx} className="mb-4 border rounded">
            <Link to={`/${item.source}/${item.section}`} className="flex flex-col bg-[#f5f5f5] hover:rounded-lg p-2 rounded">
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
    </div>
  );
}

export default SearchLaw;
