import type { SQLiteDatabase } from "expo-sqlite";

export const LOCAL_MIGRATION_VERSION = 1;

export async function applyLocalMigration001(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS focus_sessions (
      id TEXT PRIMARY KEY NOT NULL,
      started_at_ms INTEGER NOT NULL CHECK (started_at_ms >= 0),
      duration_seconds INTEGER NOT NULL CHECK (duration_seconds BETWEEN 60 AND 28800),
      ends_at_ms INTEGER,
      remaining_seconds INTEGER NOT NULL CHECK (remaining_seconds BETWEEN 0 AND 28800),
      status TEXT NOT NULL CHECK (status IN ('running', 'paused', 'completed')),
      updated_at_ms INTEGER NOT NULL CHECK (updated_at_ms >= 0)
    );

    CREATE INDEX IF NOT EXISTS idx_focus_sessions_started_at
      ON focus_sessions (started_at_ms DESC);
  `);
}
