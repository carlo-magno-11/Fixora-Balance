export class LocalDatabaseConfigurationError extends Error {
  constructor() {
    super("SQLite foreign-key enforcement is disabled; refusing to continue with an unsafe database connection.");
    this.name = "LocalDatabaseConfigurationError";
  }
}

export function assertForeignKeyEnforcementEnabled(
  enabled: number | undefined,
): void {
  if (enabled !== 1) {
    throw new LocalDatabaseConfigurationError();
  }
}
