import type { ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export function SurfaceCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    padding: theme.spacing.lg,
  },
});
