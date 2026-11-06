import { describe, expect, it } from "vitest";
import {
  createHabit,
  createHabitCompletion,
  getLocalDayKey,
  getLocalWeekStartKey,
} from "./habit";

describe("habit domain", () => {
  it("normalizes a valid habit title", () => {
    const result = createHabit({
      id: "habit-1",
      title: "  Leer  ",
      frequency: "daily",
      targetPerWeek: 7,
      now: 1_000,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.title).toBe("Leer");
    expect(result.value.archivedAt).toBeNull();
  });

  it("rejects invalid title, target and timestamp", () => {
    expect(createHabit({
      id: "habit-1",
      title: " ",
      frequency: "daily",
      targetPerWeek: 7,
      now: 1,
    })).toEqual({ ok: false, error: "invalid_title" });

    expect(createHabit({
      id: "habit-2",
      title: "Caminar",
      frequency: "daily",
      targetPerWeek: 3,
      now: 1,
    })).toEqual({ ok: false, error: "invalid_target" });

    expect(createHabit({
      id: "habit-3",
      title: "Caminar",
      frequency: "weekly",
      targetPerWeek: 8,
      now: 1,
    })).toEqual({ ok: false, error: "invalid_target" });

    expect(createHabit({
      id: "habit-4",
      title: "Caminar",
      frequency: "weekly",
      targetPerWeek: 3,
      now: -1,
    })).toEqual({ ok: false, error: "invalid_timestamp" });
  });

  it("creates a stable completion identity for one habit and local day", () => {
    const result = createHabitCompletion({
      habitId: "habit-1",
      dayKey: "2026-11-06",
      occurredAt: 123_000,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.id).toBe("habit-1:2026-11-06");
  });

  it("rejects impossible calendar dates", () => {
    expect(createHabitCompletion({
      habitId: "habit-1",
      dayKey: "2026-02-30",
      occurredAt: 123,
    })).toEqual({ ok: false, error: "invalid_day_key" });
  });

  it("uses local calendar dates and Monday as week start", () => {
    const date = new Date(2026, 10, 6, 12, 0, 0);
    expect(getLocalDayKey(date)).toBe("2026-11-06");
    expect(getLocalWeekStartKey(date)).toBe("2026-11-02");
  });
});
