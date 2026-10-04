import { DatabaseSync } from "node:sqlite";

export class DB {
  static #db: DatabaseSync;

  private constructor() {}

  static getDB(): DatabaseSync {
    if (DB.#db) {
      return DB.#db;
    }

    DB.#db = new DatabaseSync(":memory:");
    return DB.#db;
  }
}
