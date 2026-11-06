import { Pressable, StyleSheet, Text, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  style,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.button,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: { opacity: 0.48 },
  pressed: { backgroundColor: theme.colors.primaryPressed },
  label: { color: theme.colors.white, fontSize: 14, fontWeight: "800" },
});
