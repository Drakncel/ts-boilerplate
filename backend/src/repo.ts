import type { SQLOutputValue } from "node:sqlite";
import { DB } from "./db.js";
import { type Link, linkSchema } from "./types.js";
import { PAGE_SIZE } from "./constants.js";

const validateLink = (dbObject?: Record<string, SQLOutputValue>): Link =>
  linkSchema.parse(dbObject);

export const initDB = () => {
  const db = DB.getDB();

  db.exec(`
      CREATE TABLE link(
        id INTEGER PRIMARY KEY,
        key TEXT,
        value TEXT
      ) STRICT
    `);
};

export const getCount = () => {
  const db = DB.getDB();

  return db.prepare("SELECT count(*) as count FROM link").get();
};

export const getLinkByKey = (key: string): Link | null => {
  const db = DB.getDB();

  const link = db.prepare("SELECT * FROM link WHERE key = ?").get(key);

  try {
    const result = validateLink(link);

    return result;
  } catch {
    return null;
  }
};

export const getLinkPage = (page: number): Link[] => {
  const db = DB.getDB();

  const all = db
    .prepare("SELECT * FROM link order by id limit ? offset ?")
    .all(PAGE_SIZE, (page - 1) * PAGE_SIZE);

  return all.map((l) => linkSchema.parse(l));
};

export const insertLink = (link: Link) => {
  const db = DB.getDB();

  db.prepare("INSERT INTO link (key, value) VALUES (?, ?)").run(
    link.key,
    link.value,
  );
};

export const seedDB = () => {
  const db = DB.getDB();

  db.prepare("DELETE FROM link").run();
  for (const i in new Array(1000).fill(0)) {
    const key = "test-" + String(i);
    const value = "http://localhost:3000/app";

    console.log(key);

    db.prepare("INSERT INTO link (key, value) VALUES (?, ?)").run(key, value);
  }
};
