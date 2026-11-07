export type FocusSessionStatus = "running" | "paused" | "completed";

export interface FocusSession {
  readonly id: string;
  readonly durationSeconds: number;
  readonly startedAt: number;
  readonly endsAt: number | null;
  readonly remainingSeconds: number;
  readonly status: FocusSessionStatus;
}

export type FocusSessionError =
  | "invalid_duration"
  | "invalid_timestamp"
  | "session_not_running"
  | "session_not_paused"
  | "invalid_id";

export type FocusSessionResult =
  | { readonly ok: true; readonly value: FocusSession }
  | { readonly ok: false; readonly error: FocusSessionError };

const isValidTimestamp = (value: number): boolean =>
  Number.isSafeInteger(value) && value >= 0;

function clampRemainingSeconds(value: number, durationSeconds: number): number {
  return Math.min(durationSeconds, Math.max(0, Math.ceil(value)));
}

export function startFocusSession(input: {
  id: string;
  durationSeconds: number;
  now: number;
}): FocusSessionResult {
  const { id, durationSeconds, now } = input;

  if (!Number.isInteger(durationSeconds) || durationSeconds < 60 || durationSeconds > 8 * 60 * 60) {
    return { ok: false, error: "invalid_duration" };
  }

  if (!isValidTimestamp(now)) {
    return { ok: false, error: "invalid_timestamp" };
  }

  if (id.trim().length === 0) {
    return { ok: false, error: "invalid_id" };
  }

  const endsAt = now + durationSeconds * 1000;
  if (!isValidTimestamp(endsAt)) {
    return { ok: false, error: "invalid_timestamp" };
  }

  return {
    ok: true,
    value: {
      id,
      durationSeconds,
      startedAt: now,
      endsAt,
      remainingSeconds: durationSeconds,
      status: "running",
    },
  };
}

export function pauseFocusSession(
  session: FocusSession,
  now: number,
): FocusSessionResult {
  if (session.status !== "running" || session.endsAt === null) {
    return { ok: false, error: "session_not_running" };
  }

  if (!isValidTimestamp(now)) {
    return { ok: false, error: "invalid_timestamp" };
  }

  const remainingSeconds = clampRemainingSeconds(
    (session.endsAt - now) / 1000,
    session.durationSeconds,
  );

  if (remainingSeconds === 0) {
    return {
      ok: true,
      value: { ...session, remainingSeconds: 0, endsAt: null, status: "completed" },
    };
  }

  return {
    ok: true,
    value: {
      ...session,
      remainingSeconds,
      endsAt: null,
      status: "paused",
    },
  };
}

export function resumeFocusSession(
  session: FocusSession,
  now: number,
): FocusSessionResult {
  if (session.status !== "paused") {
    return { ok: false, error: "session_not_paused" };
  }

  if (!isValidTimestamp(now)) {
    return { ok: false, error: "invalid_timestamp" };
  }

  const remainingSeconds = clampRemainingSeconds(
    session.remainingSeconds,
    session.durationSeconds,
  );
  if (remainingSeconds === 0) {
    return {
      ok: true,
      value: { ...session, remainingSeconds: 0, endsAt: null, status: "completed" },
    };
  }

  const endsAt = now + remainingSeconds * 1000;
  if (!isValidTimestamp(endsAt)) {
    return { ok: false, error: "invalid_timestamp" };
  }

  return {
    ok: true,
    value: {
      ...session,
      remainingSeconds,
      endsAt,
      status: "running",
    },
  };
}

export function getRemainingSeconds(
  session: FocusSession,
  now: number,
): number {
  if (session.status === "completed") return 0;
  if (session.status === "paused" || session.endsAt === null || !isValidTimestamp(now)) {
    return clampRemainingSeconds(session.remainingSeconds, session.durationSeconds);
  }

  return clampRemainingSeconds(
    (session.endsAt - now) / 1000,
    session.durationSeconds,
  );
}

export function completeFocusSession(
  session: FocusSession,
  now: number,
): FocusSessionResult {
  if (session.status !== "running" || session.endsAt === null) {
    return { ok: false, error: "session_not_running" };
  }

  if (!isValidTimestamp(now)) {
    return { ok: false, error: "invalid_timestamp" };
  }

  if (now < session.endsAt) {
    return { ok: false, error: "session_not_running" };
  }

  return {
    ok: true,
    value: {
      ...session,
      remainingSeconds: 0,
      endsAt: null,
      status: "completed",
    },
  };
}
