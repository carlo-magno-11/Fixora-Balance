import { describe, expect, it } from "vitest";
import {
  completeFocusSession,
  getRemainingSeconds,
  pauseFocusSession,
  resumeFocusSession,
  startFocusSession,
} from "./focus-session";

describe("focus session domain", () => {
  it("starts a valid session with a deterministic end time", () => {
    const result = startFocusSession({
      id: "session-1",
      durationSeconds: 25 * 60,
      now: 1_000,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.endsAt).toBe(1_501_000);
    expect(result.value.status).toBe("running");
  });

  it("rejects durations outside the supported range", () => {
    expect(startFocusSession({ id: "x", durationSeconds: 0, now: 1 }).ok).toBe(false);
    expect(startFocusSession({ id: "x", durationSeconds: 31, now: 1 }).ok).toBe(false);
    expect(startFocusSession({ id: "x", durationSeconds: 60, now: 1 }).ok).toBe(true);
    expect(startFocusSession({ id: "x", durationSeconds: 28_801, now: 1 }).ok).toBe(false);
  });

  it("pauses and resumes without losing remaining time", () => {
    const started = startFocusSession({
      id: "session-2",
      durationSeconds: 600,
      now: 10_000,
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;

    const paused = pauseFocusSession(started.value, 130_000);
    expect(paused.ok).toBe(true);
    if (!paused.ok) return;
    expect(paused.value.remainingSeconds).toBe(480);
    expect(paused.value.status).toBe("paused");

    const resumed = resumeFocusSession(paused.value, 500_000);
    expect(resumed.ok).toBe(true);
    if (!resumed.ok) return;
    expect(resumed.value.endsAt).toBe(980_000);
    expect(getRemainingSeconds(resumed.value, 740_000)).toBe(240);
  });

  it("completes an expired session and prevents negative time", () => {
    const started = startFocusSession({
      id: "session-3",
      durationSeconds: 60,
      now: 5_000,
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;

    expect(getRemainingSeconds(started.value, 90_000)).toBe(0);
    const completed = completeFocusSession(started.value, 90_000);
    expect(completed.ok).toBe(true);
    if (!completed.ok) return;
    expect(completed.value.status).toBe("completed");
  });

  it("rejects invalid state transitions", () => {
    const started = startFocusSession({
      id: "session-4",
      durationSeconds: 120,
      now: 0,
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;

    expect(resumeFocusSession(started.value, 10).ok).toBe(false);
    const paused = pauseFocusSession(started.value, 30_000);
    expect(paused.ok).toBe(true);
    if (!paused.ok) return;
    expect(pauseFocusSession(paused.value, 40_000).ok).toBe(false);
  });
});
