import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";
import { applyLocalMigration001 } from "./migrations/001_create_focus_sessions";
import { applyLocalMigration002 } from "./migrations/002_create_habits";
import { applyLocalMigration003 } from "./migrations/003_create_goals";
import { assertSupportedLocalDatabaseVersion } from "./database-version";

const DATABASE_NAME = "fixora-balance.db";
const LOCAL_DATABASE_VERSION = 3;

let databasePromise: Promise<SQLiteDatabase> | undefined;

async function migrate(db: SQLiteDatabase): Promise<void> {
  const current = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  const currentVersion = current?.user_version ?? 0;

  assertSupportedLocalDatabaseVersion(currentVersion, LOCAL_DATABASE_VERSION);

  if (currentVersion < LOCAL_DATABASE_VERSION) {
    // The database is not exposed to repositories until initialization resolves.
    // Use the same connection where foreign_keys was enabled: Expo's exclusive
    // transaction opens a separate connection and does not inherit that setting.
    await db.withTransactionAsync(async () => {
      if (currentVersion < 1) {
        await applyLocalMigration001(db);
        await db.execAsync("PRAGMA user_version = 1");
      }

      if (currentVersion < 2) {
        await applyLocalMigration002(db);
        await db.execAsync("PRAGMA user_version = 2");
      }

      if (currentVersion < 3) {
        await applyLocalMigration003(db);
        await db.execAsync("PRAGMA user_version = 3");
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
