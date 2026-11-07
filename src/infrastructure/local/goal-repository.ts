import {
  createGoal,
  type GoalMetric,
} from "@/domain/goals/goal";
import { getLocalDatabase } from "./database";
import { enqueueLocalWrite } from "./write-queue";

export interface GoalSummary {
  id: string;
  title: string;
  metric: GoalMetric;
  targetPerWeek: number;
  currentValue: number;
}

interface GoalSummaryRow {
  id: string;
  title: string;
  metric: GoalMetric;
  target_per_week: number;
  current_value: number;
}

export async function createLocalGoal(input: {
  id: string;
  title: string;
  metric: GoalMetric;
  targetPerWeek: number;
  now: number;
}): Promise<void> {
  const result = createGoal(input);
  if (!result.ok) throw new Error(result.error);

  await enqueueLocalWrite(async () => {
    const db = await getLocalDatabase();
    await db.runAsync(
      `INSERT INTO goals (
        id, title, metric, target_per_week, created_at_ms, archived_at_ms
      ) VALUES (?, ?, ?, ?, ?, NULL)`,
      result.value.id,
      result.value.title,
      result.value.metric,
      result.value.targetPerWeek,
      result.value.createdAt,
    );
  });
}

export async function getGoalSummaries(input: {
  weekStartKey: string;
  todayKey: string;
  weekStartMs: number;
  nowMs: number;
}): Promise<GoalSummary[]> {
  const db = await getLocalDatabase();
  const rows = await db.getAllAsync<GoalSummaryRow>(
    `SELECT
      g.id,
      g.title,
      g.metric,
      g.target_per_week,
      CASE g.metric
        WHEN 'focus_sessions' THEN (
          SELECT COUNT(*)
          FROM focus_sessions f
          WHERE f.status = 'completed'
            AND f.updated_at_ms BETWEEN ? AND ?
        )
        WHEN 'habit_completions' THEN (
          SELECT COUNT(*)
          FROM habit_completions h
          WHERE h.day_key BETWEEN ? AND ?
        )
        ELSE 0
      END AS current_value
    FROM goals g
    WHERE g.archived_at_ms IS NULL
    ORDER BY g.created_at_ms DESC`,
    input.weekStartMs,
    input.nowMs,
    input.weekStartKey,
    input.todayKey,
  );

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    metric: row.metric,
    targetPerWeek: row.target_per_week,
    currentValue: row.current_value,
  }));
}
