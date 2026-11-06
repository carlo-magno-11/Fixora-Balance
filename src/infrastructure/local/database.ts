import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";
import {
  applyLocalMigration001,
  LOCAL_MIGRATION_VERSION,
} from "./migrations/001_create_focus_sessions";

const DATABASE_NAME = "fixora-balance.db";

let databasePromise: Promise<SQLiteDatabase> | undefined;

async function migrate(db: SQLiteDatabase): Promise<void> {
  const current = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  const currentVersion = current?.user_version ?? 0;

  if (currentVersion < LOCAL_MIGRATION_VERSION) {
    await db.withExclusiveTransactionAsync(async (transaction) => {
      if (currentVersion < 1) {
        await applyLocalMigration001(transaction);
        await transaction.execAsync("PRAGMA user_version = 1");
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
