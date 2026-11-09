export class UnsupportedLocalDatabaseVersionError extends Error {
  constructor(currentVersion: number, supportedVersion: number) {
    super(
      `Local database version ${currentVersion} is newer than this app supports (${supportedVersion}). Update the app before opening this database.`,
    );
    this.name = "UnsupportedLocalDatabaseVersionError";
  }
}

/**
 * Fails closed when a downgrade or corrupt schema marker is detected.
 * Returning normally means the current app can safely evaluate migrations.
 */
export function assertSupportedLocalDatabaseVersion(
  currentVersion: number,
  supportedVersion: number,
): void {
  if (
    !Number.isSafeInteger(currentVersion) ||
    currentVersion < 0 ||
    !Number.isSafeInteger(supportedVersion) ||
    supportedVersion < 0
  ) {
    throw new RangeError("Local database versions must be non-negative safe integers.");
  }

  if (currentVersion > supportedVersion) {
    throw new UnsupportedLocalDatabaseVersionError(currentVersion, supportedVersion);
  }
}
