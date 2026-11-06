import { describe, expect, it } from "vitest";
import { theme } from "./tokens";

function getRelativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const linear = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * (linear[0] ?? 0) + 0.7152 * (linear[1] ?? 0) + 0.0722 * (linear[2] ?? 0);
}

function getContrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [
    getRelativeLuminance(foreground),
    getRelativeLuminance(background),
  ].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

const accessibleTextPairs = [
  ["primary text on canvas", theme.colors.textPrimary, theme.colors.canvas],
  ["primary text on surface", theme.colors.textPrimary, theme.colors.surface],
  ["secondary text on canvas", theme.colors.textSecondary, theme.colors.canvas],
  ["secondary text on surface", theme.colors.textSecondary, theme.colors.surface],
  ["secondary text on subtle surface", theme.colors.textSecondary, theme.colors.surfaceSubtle],
  ["secondary text on warm surface", theme.colors.textSecondary, theme.colors.surfaceWarm],
  ["gold text on canvas", theme.colors.accentGoldText, theme.colors.canvas],
  ["gold text on surface", theme.colors.accentGoldText, theme.colors.surface],
  ["gold text on subtle surface", theme.colors.accentGoldText, theme.colors.surfaceSubtle],
  ["primary action on canvas", theme.colors.primary, theme.colors.canvas],
  ["brand on canvas", theme.colors.brandBurgundy, theme.colors.canvas],
  ["danger text on canvas", theme.colors.danger, theme.colors.canvas],
] as const;

describe("theme text contrast", () => {
  it.each(accessibleTextPairs)("%s meets WCAG AA", (_name, foreground, background) => {
    expect(getContrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});
