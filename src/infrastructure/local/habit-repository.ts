import {
  createHabit,
  createHabitCompletion,
  type HabitFrequency,
} from "@/domain/habits/habit";
import { getLocalDatabase } from "./database";
import { enqueueLocalWrite } from "./write-queue";

export interface HabitSummary {
  id: string;
  title: string;
  frequency: HabitFrequency;
  targetPerWeek: number;
  completedThisWeek: number;
  completedToday: boolean;
}

interface HabitSummaryRow {
  id: string;
  title: string;
  frequency: HabitFrequency;
  target_per_week: number;
  completed_this_week: number;
  completed_today: number;
}

export async function createLocalHabit(input: {
  id: string;
  title: string;
  frequency: HabitFrequency;
  targetPerWeek: number;
  now: number;
}): Promise<void> {
  const result = createHabit(input);
  if (!result.ok) throw new Error(result.error);

  await enqueueLocalWrite(async () => {
    const db = await getLocalDatabase();
    await db.runAsync(
      `INSERT INTO habits (
        id, title, frequency, target_per_week, created_at_ms, archived_at_ms
      ) VALUES (?, ?, ?, ?, ?, NULL)`,
      result.value.id,
      result.value.title,
      result.value.frequency,
      result.value.targetPerWeek,
      result.value.createdAt,
    );
  });
}

export async function getHabitSummaries(
  weekStartKey: string,
  todayKey: string,
): Promise<HabitSummary[]> {
  const db = await getLocalDatabase();
  const rows = await db.getAllAsync<HabitSummaryRow>(
    `SELECT
      h.id,
      h.title,
      h.frequency,
      h.target_per_week,
      COUNT(c.id) AS completed_this_week,
      MAX(CASE WHEN c.day_key = ? THEN 1 ELSE 0 END) AS completed_today
    FROM habits h
    LEFT JOIN habit_completions c
      ON c.habit_id = h.id
      AND c.day_key BETWEEN ? AND ?
    WHERE h.archived_at_ms IS NULL
    GROUP BY h.id, h.title, h.frequency, h.target_per_week
    ORDER BY h.created_at_ms DESC`,
    todayKey,
    weekStartKey,
    todayKey,
  );

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    frequency: row.frequency,
    targetPerWeek: row.target_per_week,
    completedThisWeek: row.completed_this_week,
    completedToday: row.completed_today === 1,
  }));
}

export async function completeHabitToday(input: {
  habitId: string;
  dayKey: string;
  occurredAt: number;
}): Promise<boolean> {
  const result = createHabitCompletion(input);
  if (!result.ok) throw new Error(result.error);

  return enqueueLocalWrite(async () => {
    const db = await getLocalDatabase();
    const inserted = await db.runAsync(
      `INSERT OR IGNORE INTO habit_completions (
        id, habit_id, day_key, occurred_at_ms
      ) VALUES (?, ?, ?, ?)`,
      result.value.id,
      result.value.habitId,
      result.value.dayKey,
      result.value.occurredAt,
    );

    return inserted.changes > 0;
  });
}

export async function undoHabitCompletion(
  habitId: string,
  dayKey: string,
): Promise<boolean> {
  return enqueueLocalWrite(async () => {
    const db = await getLocalDatabase();
    const result = await db.runAsync(
      "DELETE FROM habit_completions WHERE habit_id = ? AND day_key = ?",
      habitId,
      dayKey,
    );
    return result.changes > 0;
  });
}
