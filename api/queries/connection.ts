import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

const sqlite = new Database("data/app.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema: fullSchema });

export function getDb() {
  return db;
}
