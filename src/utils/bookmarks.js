const BOOKMARK_KEY = "lawcodes_bookmarks";

export const addBookmark = (item) => {
  const existing = JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
  const timestampedItem = { ...item, timestamp: new Date().toISOString() };

  const filtered = existing.filter(
    (i) => !(i.source === item.source && i.section === item.section)
  );

  const updated = [timestampedItem, ...filtered];
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
};

export const removeBookmark = (sectionId, source) => {
  const bookmarks = getBookmarks();
  const updated = bookmarks.filter(
    (item) => !(item.section === sectionId && item.source === source)
  );
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
};

export const getBookmarks = () => {
  return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
};

export const clearBookmarks = () => {
  localStorage.removeItem(BOOKMARK_KEY);
};


// import { initDB } from './db';

// export const addBookmark = async (item) => {
//   const db = await initDB();
//   const store = db.transaction('bookmarks', 'readwrite').objectStore('bookmarks');
//   const all = await store.getAll();
//   const exists = all.find(
//     (i) => i.section === item.section && i.source === item.source
//   );

//   if (exists) {
//     await store.delete(exists.id);
//   }

//   await store.add({ ...item, timestamp: new Date().toISOString() });
// };

// export const getBookmarks = async () => {
//   const db = await initDB();
//   const all = await db.getAll('bookmarks');
//   return all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
// };

// export const removeBookmark = async (section, source) => {
//   const db = await initDB();
//   const all = await db.getAll('bookmarks');
//   const match = all.find((i) => i.section === section && i.source === source);
//   if (match) {
//     await db.delete('bookmarks', match.id);
//   }
// };

// export const clearBookmarks = async () => {
//   const db = await initDB();
//   await db.clear('bookmarks');
// };
