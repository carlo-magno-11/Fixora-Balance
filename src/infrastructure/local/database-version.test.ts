import { describe, expect, it } from "vitest";
import {
  assertSupportedLocalDatabaseVersion,
  UnsupportedLocalDatabaseVersionError,
} from "./database-version";

describe("local database version compatibility", () => {
  it("accepts a new database", () => {
    expect(() => assertSupportedLocalDatabaseVersion(0, 3)).not.toThrow();
  });

  it("accepts the current schema version", () => {
    expect(() => assertSupportedLocalDatabaseVersion(3, 3)).not.toThrow();
  });

  it("accepts an older schema that can be migrated forward", () => {
    expect(() => assertSupportedLocalDatabaseVersion(1, 3)).not.toThrow();
  });

  it("rejects a database created by a newer app", () => {
    expect(() => assertSupportedLocalDatabaseVersion(4, 3)).toThrow(
      UnsupportedLocalDatabaseVersionError,
    );
  });

  it("rejects invalid schema version markers", () => {
    for (const version of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => assertSupportedLocalDatabaseVersion(version, 3)).toThrow(RangeError);
    }
  });

  it("rejects an invalid supported version", () => {
    expect(() => assertSupportedLocalDatabaseVersion(1, -1)).toThrow(RangeError);
  });
});
