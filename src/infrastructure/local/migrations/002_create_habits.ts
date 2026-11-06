import type { SQLiteDatabase } from "expo-sqlite";

export async function applyLocalMigration002(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 60),
      frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly')),
      target_per_week INTEGER NOT NULL CHECK (target_per_week BETWEEN 1 AND 7),
      created_at_ms INTEGER NOT NULL CHECK (created_at_ms >= 0),
      archived_at_ms INTEGER,
      CHECK (frequency != 'daily' OR target_per_week = 7)
    );

    CREATE TABLE IF NOT EXISTS habit_completions (
      id TEXT PRIMARY KEY NOT NULL,
      habit_id TEXT NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
      day_key TEXT NOT NULL CHECK (
        length(day_key) = 10
        AND day_key GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
      ),
      occurred_at_ms INTEGER NOT NULL CHECK (occurred_at_ms >= 0),
      UNIQUE (habit_id, day_key)
    );

    CREATE INDEX IF NOT EXISTS idx_habits_active_created
      ON habits (archived_at_ms, created_at_ms DESC);

    CREATE INDEX IF NOT EXISTS idx_habit_completions_day
      ON habit_completions (day_key, habit_id);
  `);
}
