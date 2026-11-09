import { describe, expect, it } from "vitest";
import {
  assertForeignKeyEnforcementEnabled,
  LocalDatabaseConfigurationError,
} from "./database-configuration";

describe("assertForeignKeyEnforcementEnabled", () => {
  it("accepts SQLite reporting foreign-key enforcement enabled", () => {
    expect(() => assertForeignKeyEnforcementEnabled(1)).not.toThrow();
  });

  it.each([0, undefined, 2, -1])(
    "fails closed when SQLite reports an invalid or disabled setting: %s",
    (value) => {
      expect(() => assertForeignKeyEnforcementEnabled(value)).toThrow(
        LocalDatabaseConfigurationError,
      );
    },
  );

  it("provides a stable error name for diagnostics", () => {
    try {
      assertForeignKeyEnforcementEnabled(0);
      throw new Error("Expected the assertion to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(LocalDatabaseConfigurationError);
      expect((error as Error).name).toBe("LocalDatabaseConfigurationError");
    }
  });
});
