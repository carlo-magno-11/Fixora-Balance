import { describe, expect, it } from "vitest";
import { createGoal } from "./goal";

describe("goal domain", () => {
  it("creates a weekly focus goal and trims its title", () => {
    const result = createGoal({
      id: "goal-1",
      title: "  Enfocarme  ",
      metric: "focus_sessions",
      targetPerWeek: 5,
      now: 1_000,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.title).toBe("Enfocarme");
    expect(result.value.targetPerWeek).toBe(5);
  });

  it("creates a weekly habit completion goal", () => {
    const result = createGoal({
      id: "goal-2",
      title: "Practicar mis hábitos",
      metric: "habit_completions",
      targetPerWeek: 7,
      now: 2_000,
    });
    expect(result.ok).toBe(true);
  });

  it("rejects invalid titles, targets and timestamps", () => {
    expect(createGoal({
      id: "goal-1",
      title: " ",
      metric: "focus_sessions",
      targetPerWeek: 5,
      now: 1,
    })).toEqual({ ok: false, error: "invalid_title" });

    expect(createGoal({
      id: "goal-2",
      title: "Meta",
      metric: "focus_sessions",
      targetPerWeek: 101,
      now: 1,
    })).toEqual({ ok: false, error: "invalid_target" });

    expect(createGoal({
      id: "goal-3",
      title: "Meta",
      metric: "focus_sessions",
      targetPerWeek: 1,
      now: -1,
    })).toEqual({ ok: false, error: "invalid_timestamp" });
  });
});
