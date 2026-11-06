import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";
import { applyLocalMigration001 } from "./migrations/001_create_focus_sessions";
import { applyLocalMigration002 } from "./migrations/002_create_habits";

const DATABASE_NAME = "fixora-balance.db";
const LOCAL_DATABASE_VERSION = 2;

let databasePromise: Promise<SQLiteDatabase> | undefined;

async function migrate(db: SQLiteDatabase): Promise<void> {
  const current = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  const currentVersion = current?.user_version ?? 0;

  if (currentVersion < LOCAL_DATABASE_VERSION) {
    await db.withExclusiveTransactionAsync(async (transaction) => {
      if (currentVersion < 1) {
        await applyLocalMigration001(transaction);
        await transaction.execAsync("PRAGMA user_version = 1");
      }

      if (currentVersion < 2) {
        await applyLocalMigration002(transaction);
        await transaction.execAsync("PRAGMA user_version = 2");
      }
    });
  }
}

export async function getLocalDatabase(): Promise<SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = openDatabaseAsync(DATABASE_NAME)
      .then(async (db) => {
        await db.execAsync("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
        await migrate(db);
        return db;
      })
      .catch((error: unknown) => {
        databasePromise = undefined;
        throw error;
      });
  }

  return databasePromise;
}
