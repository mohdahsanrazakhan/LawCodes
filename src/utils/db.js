// src/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'lawcodes_db';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('history')) {
        const store = db.createObjectStore('history', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('section_source', ['section', 'source'], { unique: true });
      }

      if (!db.objectStoreNames.contains('bookmarks')) {
        const store = db.createObjectStore('bookmarks', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('section_source', ['section', 'source'], { unique: true });
      }
    },
  });
};
