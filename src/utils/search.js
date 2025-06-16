import Fuse from "fuse.js";

// Reusable function to create a Fuse instance
export function createFuseIndex(data) {
  return new Fuse(data, {
    keys: ["title", "content", "section"],
    threshold: 0.3,
  });
}

// Debounced search handler
export function performSearch(fuseInstance, query) {
  if (!query.trim()) return [];
  return fuseInstance.search(query).map(result => result.item);
}
