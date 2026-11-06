import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/tokens";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.symbol}>✧</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxxl,
    gap: theme.spacing.sm,
  },
  symbol: { color: theme.colors.accentGold, fontSize: 28 },
  title: { color: theme.colors.textPrimary, fontSize: 16, fontWeight: "800", textAlign: "center" },
  description: { color: theme.colors.textSecondary, fontSize: 13, lineHeight: 20, textAlign: "center" },
});
