import type { SQLiteDatabase } from "expo-sqlite";

export async function applyLocalMigration003(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 60),
      metric TEXT NOT NULL CHECK (metric IN ('focus_sessions', 'habit_completions')),
      target_per_week INTEGER NOT NULL CHECK (target_per_week BETWEEN 1 AND 100),
      created_at_ms INTEGER NOT NULL CHECK (created_at_ms >= 0),
      archived_at_ms INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_goals_active_created
      ON goals (archived_at_ms, created_at_ms DESC);
  `);
}
