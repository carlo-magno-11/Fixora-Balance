export type HabitFrequency = "daily" | "weekly";

export interface Habit {
  readonly id: string;
  readonly title: string;
  readonly frequency: HabitFrequency;
  readonly targetPerWeek: number;
  readonly createdAt: number;
  readonly archivedAt: number | null;
}

export interface HabitCompletion {
  readonly id: string;
  readonly habitId: string;
  readonly dayKey: string;
  readonly occurredAt: number;
}

export type HabitError =
  | "invalid_id"
  | "invalid_title"
  | "invalid_frequency"
  | "invalid_target"
  | "invalid_timestamp"
  | "invalid_day_key";

export type HabitResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: HabitError };

const isValidTimestamp = (value: number): boolean =>
  Number.isSafeInteger(value) && value >= 0;

export function createHabit(input: {
  id: string;
  title: string;
  frequency: HabitFrequency;
  targetPerWeek: number;
  now: number;
}): HabitResult<Habit> {
  const title = input.title.trim();

  if (!input.id.trim()) return { ok: false, error: "invalid_id" };
  if (!title || title.length > 60) return { ok: false, error: "invalid_title" };
  if (input.frequency !== "daily" && input.frequency !== "weekly") {
    return { ok: false, error: "invalid_frequency" };
  }
  if (!Number.isInteger(input.targetPerWeek) || input.targetPerWeek < 1 || input.targetPerWeek > 7) {
    return { ok: false, error: "invalid_target" };
  }
  if (input.frequency === "daily" && input.targetPerWeek !== 7) {
    return { ok: false, error: "invalid_target" };
  }
  if (!isValidTimestamp(input.now)) return { ok: false, error: "invalid_timestamp" };

  return {
    ok: true,
    value: {
      id: input.id,
      title,
      frequency: input.frequency,
      targetPerWeek: input.targetPerWeek,
      createdAt: input.now,
      archivedAt: null,
    },
  };
}

function isValidDayKey(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function createHabitCompletion(input: {
  habitId: string;
  dayKey: string;
  occurredAt: number;
}): HabitResult<HabitCompletion> {
  if (!input.habitId.trim()) return { ok: false, error: "invalid_id" };
  if (!isValidDayKey(input.dayKey)) return { ok: false, error: "invalid_day_key" };
  if (!isValidTimestamp(input.occurredAt)) return { ok: false, error: "invalid_timestamp" };

  return {
    ok: true,
    value: {
      id: `${input.habitId}:${input.dayKey}`,
      habitId: input.habitId,
      dayKey: input.dayKey,
      occurredAt: input.occurredAt,
    },
  };
}

export function getLocalDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getLocalWeekStartKey(date: Date): string {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const weekday = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - weekday);
  return getLocalDayKey(start);
}
