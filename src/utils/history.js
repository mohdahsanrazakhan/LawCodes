const HISTORY_KEY = "lawcodes_history";
const MAX_HISTORY = 10;

export const addToHistory = (item) => {
  const existing = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  const timestampedItem = { ...item, timestamp: new Date().toISOString() };

  const filtered = existing.filter(
    (i) => !(i.source === item.source && i.section === item.section)
  );

  const updated = [timestampedItem, ...filtered].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};


// import { initDB } from './db';

// const MAX_HISTORY = 10;

// export const addToHistory = async (item) => {
//   const db = await initDB();
//   const tx = db.transaction('history', 'readwrite');
//   const store = tx.objectStore('history');

//   const all = await store.getAll();
//   const exists = all.find(
//     (i) => i.section === item.section && i.source === item.source
//   );

//   if (exists) {
//     await store.delete(exists.id);
//   }

//   await store.add({ ...item, timestamp: new Date().toISOString() });

//   // Trim history
//   const updated = await store.getAll();
//   if (updated.length > MAX_HISTORY) {
//     const sorted = updated.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
//     await store.delete(sorted[0].id);
//   }

//   await tx.done;
// };

// export const getHistory = async () => {
//   const db = await initDB();
//   const all = await db.getAll('history');
//   return all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
// };

// export const clearHistory = async () => {
//   const db = await initDB();
//   await db.clear('history');
// };
