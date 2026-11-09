from pathlib import Path
import sqlite3


ROOT = Path(__file__).resolve().parents[1]
MIGRATIONS = (
    ROOT / "src/infrastructure/local/migrations/001_create_focus_sessions.ts",
    ROOT / "src/infrastructure/local/migrations/002_create_habits.ts",
    ROOT / "src/infrastructure/local/migrations/003_create_goals.ts",
)


def migration_sql(path: Path) -> str:
    source = path.read_text(encoding="utf-8")
    start_marker = "db.execAsync(\x60"
    end_marker = "\x60);"
    if start_marker not in source:
        raise AssertionError(f"No se encontró el bloque execAsync en {path}")
    remainder = source.split(start_marker, 1)[1]
    if end_marker not in remainder:
        raise AssertionError(f"No se encontró el cierre execAsync en {path}")
    return remainder.split(end_marker, 1)[0]


def expect_integrity_error(connection: sqlite3.Connection, sql: str, params: tuple) -> None:
    try:
        connection.execute(sql, params)
    except sqlite3.IntegrityError:
        return
    raise AssertionError(f"Se esperaba rechazo de constraint: {sql}")


def main() -> None:
    database_source = (ROOT / "src/infrastructure/local/database.ts").read_text(encoding="utf-8")
    assert "PRAGMA foreign_keys = ON" in database_source, "La conexión local debe habilitar claves foráneas"
    assert "withTransactionAsync" in database_source, "Las migraciones deben usar la conexión configurada"
    assert "withExclusiveTransactionAsync" not in database_source, (
        "La transacción exclusiva abre otra conexión y no hereda foreign_keys"
    )
    assert "assertSupportedLocalDatabaseVersion" in database_source, (
        "El arranque debe rechazar versiones de esquema incompatibles"
    )

    connection = sqlite3.connect(":memory:")
    connection.execute("PRAGMA foreign_keys = ON")

    connection.executescript(migration_sql(MIGRATIONS[0]))
    connection.execute(
        """INSERT INTO focus_sessions
        (id, started_at_ms, duration_seconds, ends_at_ms, remaining_seconds, status, updated_at_ms)
        VALUES (?, ?, ?, ?, ?, ?, ?)""",
        ("focus-preserved", 1_000, 1_500, None, 1_500, "paused", 1_000),
    )

    connection.executescript(migration_sql(MIGRATIONS[1]))
    connection.execute(
        """INSERT INTO habits
        (id, title, frequency, target_per_week, created_at_ms, archived_at_ms)
        VALUES (?, ?, ?, ?, ?, NULL)""",
        ("habit-1", "Leer", "weekly", 3, 2_000),
    )

    completion_sql = """INSERT OR IGNORE INTO habit_completions
        (id, habit_id, day_key, occurred_at_ms) VALUES (?, ?, ?, ?)"""
    first = connection.execute(
        completion_sql, ("habit-1:2026-11-07", "habit-1", "2026-11-07", 3_000)
    )
    duplicate = connection.execute(
        completion_sql, ("habit-1:2026-11-07", "habit-1", "2026-11-07", 4_000)
    )
    assert first.rowcount == 1, "El primer check-in debe insertarse"
    assert duplicate.rowcount == 0, "El check-in duplicado debe ignorarse"
    assert connection.execute("SELECT COUNT(*) FROM habit_completions").fetchone()[0] == 1

    expect_integrity_error(
        connection,
        """INSERT INTO habits
        (id, title, frequency, target_per_week, created_at_ms, archived_at_ms)
        VALUES (?, ?, ?, ?, ?, NULL)""",
        ("habit-invalid", "Diario", "daily", 3, 2_000),
    )
    expect_integrity_error(
        connection,
        completion_sql.replace("INSERT OR IGNORE", "INSERT"),
        ("orphan:2026-11-07", "missing-habit", "2026-11-07", 3_000),
    )

    connection.executescript(migration_sql(MIGRATIONS[2]))
    connection.execute(
        """INSERT INTO goals
        (id, title, metric, target_per_week, created_at_ms, archived_at_ms)
        VALUES (?, ?, ?, ?, ?, NULL)""",
        ("goal-1", "Enfocarme", "focus_sessions", 5, 5_000),
    )
    expect_integrity_error(
        connection,
        """INSERT INTO goals
        (id, title, metric, target_per_week, created_at_ms, archived_at_ms)
        VALUES (?, ?, ?, ?, ?, NULL)""",
        ("goal-invalid", "Meta", "unknown_metric", 5, 5_000),
    )

    preserved = connection.execute(
        "SELECT status FROM focus_sessions WHERE id = ?",
        ("focus-preserved",),
    ).fetchone()
    assert preserved == ("paused",), "La migración debe conservar sesiones anteriores"

    indexes = {
        row[0]
        for row in connection.execute(
            "SELECT name FROM sqlite_master WHERE type = 'index'"
        )
    }
    expected_indexes = {
        "idx_focus_sessions_started_at",
        "idx_habits_active_created",
        "idx_habit_completions_day",
        "idx_goals_active_created",
    }
    assert expected_indexes.issubset(indexes), "Falta uno o más índices esperados"

    connection.execute("DELETE FROM habits WHERE id = ?", ("habit-1",))
    assert connection.execute("SELECT COUNT(*) FROM habit_completions").fetchone()[0] == 0

    connection.close()
    print("SQLite schema smoke tests passed: migrations v1-v3, constraints, indexes, idempotency, FK cascade and session preservation.")


if __name__ == "__main__":
    main()
