import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/tokens";

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: theme.spacing.xs },
  eyebrow: {
    color: theme.colors.brandBurgundy,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: { color: theme.colors.textPrimary, fontSize: 28, lineHeight: 34, fontWeight: "800" },
});
