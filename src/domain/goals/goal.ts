export type GoalMetric = "focus_sessions" | "habit_completions";

export interface Goal {
  readonly id: string;
  readonly title: string;
  readonly metric: GoalMetric;
  readonly targetPerWeek: number;
  readonly createdAt: number;
  readonly archivedAt: number | null;
}

export type GoalError =
  | "invalid_id"
  | "invalid_title"
  | "invalid_metric"
  | "invalid_target"
  | "invalid_timestamp";

export type GoalResult =
  | { readonly ok: true; readonly value: Goal }
  | { readonly ok: false; readonly error: GoalError };

export function createGoal(input: {
  id: string;
  title: string;
  metric: GoalMetric;
  targetPerWeek: number;
  now: number;
}): GoalResult {
  const title = input.title.trim();

  if (!input.id.trim()) return { ok: false, error: "invalid_id" };
  if (!title || title.length > 60) return { ok: false, error: "invalid_title" };
  if (input.metric !== "focus_sessions" && input.metric !== "habit_completions") {
    return { ok: false, error: "invalid_metric" };
  }
  if (!Number.isInteger(input.targetPerWeek) || input.targetPerWeek < 1 || input.targetPerWeek > 100) {
    return { ok: false, error: "invalid_target" };
  }
  if (!Number.isSafeInteger(input.now) || input.now < 0) {
    return { ok: false, error: "invalid_timestamp" };
  }

  return {
    ok: true,
    value: {
      id: input.id,
      title,
      metric: input.metric,
      targetPerWeek: input.targetPerWeek,
      createdAt: input.now,
      archivedAt: null,
    },
  };
}
