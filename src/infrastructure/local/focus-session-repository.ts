import type { FocusSession } from "@/domain/focus/focus-session";
import { getLocalDatabase } from "./database";
import { createWriteQueue } from "./write-queue";

const enqueueWrite = createWriteQueue();
interface FocusSessionRow {
  id: string;
  started_at_ms: number;
  duration_seconds: number;
  ends_at_ms: number | null;
  remaining_seconds: number;
  status: FocusSession["status"];
}

function toDomain(row: FocusSessionRow): FocusSession {
  return {
    id: row.id,
    startedAt: row.started_at_ms,
    durationSeconds: row.duration_seconds,
    endsAt: row.ends_at_ms,
    remainingSeconds: row.remaining_seconds,
    status: row.status,
  };
}

export function saveFocusSession(session: FocusSession): Promise<void> {
  return enqueueWrite(async () => {
    const db = await getLocalDatabase();
    await db.runAsync(
      `INSERT INTO focus_sessions (
        id, started_at_ms, duration_seconds, ends_at_ms,
        remaining_seconds, status, updated_at_ms
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        ends_at_ms = excluded.ends_at_ms,
        remaining_seconds = excluded.remaining_seconds,
        status = excluded.status,
        updated_at_ms = excluded.updated_at_ms`,
      session.id,
      session.startedAt,
      session.durationSeconds,
      session.endsAt,
      session.remainingSeconds,
      session.status,
      Date.now(),
    );
  });
}

export async function getLatestFocusSession(): Promise<FocusSession | null> {
  const db = await getLocalDatabase();
  const row = await db.getFirstAsync<FocusSessionRow>(
    `SELECT id, started_at_ms, duration_seconds, ends_at_ms,
      remaining_seconds, status
     FROM focus_sessions
     ORDER BY started_at_ms DESC
     LIMIT 1`,
  );

  return row ? toDomain(row) : null;
}

export function deleteFocusSession(id: string): Promise<void> {
  return enqueueWrite(async () => {
    const db = await getLocalDatabase();
    await db.runAsync("DELETE FROM focus_sessions WHERE id = ?", id);
  });
}
