import { useCallback, useEffect, useState } from "react";
import { Link } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getLocalDayKey, getLocalWeekStartKey } from "@/domain/habits/habit";
import { createLocalGoal, getGoalSummaries, type GoalSummary } from "@/infrastructure/local/goal-repository";
import type { GoalMetric } from "@/domain/goals/goal";
import { EmptyState } from "@/components/ui/EmptyState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { theme } from "@/theme/tokens";

function getWeekStartMs(dayKey: string): number {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

export default function GoalsScreen() {
  const [goals, setGoals] = useState<GoalSummary[]>([]);
  const [title, setTitle] = useState("");
  const [metric, setMetric] = useState<GoalMetric>("focus_sessions");
  const [target, setTarget] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const todayKey = getLocalDayKey(now);
  const weekStartKey = getLocalWeekStartKey(now);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const rows = await getGoalSummaries({
        weekStartKey,
        todayKey,
        weekStartMs: getWeekStartMs(weekStartKey),
        nowMs: Date.now(),
      });
      setGoals(rows);
    } catch {
      setError("No pudimos cargar tus objetivos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }, [todayKey, weekStartKey]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Escribe un nombre para tu objetivo.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createLocalGoal({
        id: `goal-${Date.now()}`,
        title,
        metric,
        targetPerWeek: target,
        now: Date.now(),
      });
      setTitle("");
      await refresh();
    } catch {
      setError("No pudimos guardar el objetivo. Revisa los datos e inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const metricLabel = (value: GoalMetric) =>
    value === "focus_sessions" ? "Sesiones de enfoque" : "Hábitos completados";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.topBar}>
          <Link href="/" style={styles.backLink}>← Inicio</Link>
          <Text style={styles.brand}>FIXORA BALANCE</Text>
        </View>

        <SectionHeading eyebrow="OBJETIVOS PERSONALES" title="Avanza a tu manera." />
        <Text style={styles.intro}>
          Define una meta semanal que puedas medir. Tu avance se calcula con sesiones y hábitos registrados, no con números inventados.
        </Text>

        <SurfaceCard style={styles.formCard}>
          <Text style={styles.formTitle}>Crear objetivo semanal</Text>
          <TextInput
            accessibilityLabel="Nombre del objetivo"
            value={title}
            onChangeText={setTitle}
            placeholder="Ej. Completar mis sesiones de enfoque"
            placeholderTextColor={theme.colors.textSecondary}
            maxLength={60}
            returnKeyType="done"
            onSubmitEditing={() => void handleCreate()}
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>¿Qué quieres medir?</Text>
          <View style={styles.choiceRow}>
            {(["focus_sessions", "habit_completions"] as const).map((value) => (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: metric === value }}
                key={value}
                onPress={() => setMetric(value)}
                style={[styles.choice, metric === value && styles.choiceSelected]}
              >
                <Text style={[styles.choiceText, metric === value && styles.choiceTextSelected]}>
                  {metricLabel(value)}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Meta semanal</Text>
          <View style={styles.targetRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Reducir meta semanal"
              disabled={target <= 1}
              onPress={() => setTarget((value) => Math.max(1, value - 1))}
              style={[styles.stepper, target <= 1 && styles.stepperDisabled]}
            >
              <Text style={styles.stepperText}>−</Text>
            </Pressable>
            <Text accessibilityLiveRegion="polite" style={styles.targetValue}>{target}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Aumentar meta semanal"
              disabled={target >= 100}
              onPress={() => setTarget((value) => Math.min(100, value + 1))}
              style={[styles.stepper, target >= 100 && styles.stepperDisabled]}
            >
              <Text style={styles.stepperText}>+</Text>
            </Pressable>
            <Text style={styles.targetSuffix}>por semana</Text>
          </View>

          <PrimaryButton
            label={saving ? "Guardando…" : "Agregar objetivo"}
            onPress={() => void handleCreate()}
            disabled={saving || !title.trim()}
            style={styles.addButton}
          />
        </SurfaceCard>

        <View style={styles.listHeading}>
          <Text style={styles.listTitle}>Tus objetivos</Text>
          <Text style={styles.count}>{goals.length}</Text>
        </View>

        {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}

        {loading ? (
          <SurfaceCard><Text style={styles.muted}>Cargando tus objetivos…</Text></SurfaceCard>
        ) : goals.length === 0 ? (
          <SurfaceCard>
            <EmptyState
              title="Una meta a la vez"
              description="Crea un objetivo semanal. El avance aparecerá cuando completes sesiones o hábitos relacionados con esa medida."
            />
          </SurfaceCard>
        ) : (
          <View style={styles.goalList}>
            {goals.map((goal) => {
              const progress = Math.min(goal.currentValue, goal.targetPerWeek);
              const percent = Math.min(100, (progress / goal.targetPerWeek) * 100);
              return (
                <SurfaceCard key={goal.id} style={styles.goalCard}>
                  <View style={styles.goalHeader}>
                    <View style={styles.goalCopy}>
                      <Text style={styles.goalName}>{goal.title}</Text>
                      <Text style={styles.goalMeta}>{metricLabel(goal.metric)}</Text>
                    </View>
                    <Text style={styles.progressText}>{progress}/{goal.targetPerWeek}</Text>
                  </View>
                  <View style={styles.track}>
                    <View style={[styles.fill, { width: `${percent}%` }]} />
                  </View>
                  <Text style={styles.muted}>
                    {goal.currentValue >= goal.targetPerWeek
                      ? "Meta semanal alcanzada. Puedes seguir a tu ritmo."
                      : `Te faltan ${goal.targetPerWeek - goal.currentValue} para alcanzar tu meta.`}
                  </Text>
                </SurfaceCard>
              );
            })}
          </View>
        )}

        <Link href="/habits" style={styles.secondaryLink}>Ir a mis hábitos →</Link>
        <Text style={styles.privacyNote}>
          Tus objetivos y registros permanecen en este dispositivo. La sincronización se diseñará después de validar privacidad y conflictos.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.canvas },
  content: { width: "100%", maxWidth: 680, alignSelf: "center", padding: theme.spacing.lg, paddingBottom: theme.spacing.xxxl, gap: theme.spacing.md },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.md },
  backLink: { color: theme.colors.primary, fontSize: 13, fontWeight: "700" },
  brand: { color: theme.colors.brandBurgundy, fontSize: 10, fontWeight: "900", letterSpacing: 1.5 },
  intro: { color: theme.colors.textSecondary, fontSize: 14, lineHeight: 21, marginBottom: theme.spacing.xs },
  formCard: { gap: theme.spacing.md },
  formTitle: { color: theme.colors.textPrimary, fontSize: 17, fontWeight: "800" },
  input: { minHeight: 48, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.control, paddingHorizontal: theme.spacing.md, color: theme.colors.textPrimary, fontSize: 14, backgroundColor: theme.colors.surfaceWarm },
  fieldLabel: { color: theme.colors.textPrimary, fontSize: 12, fontWeight: "700" },
  choiceRow: { flexDirection: "row", gap: theme.spacing.xs, flexWrap: "wrap" },
  choice: { minHeight: 42, borderRadius: theme.radius.control, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: theme.spacing.md, alignItems: "center", justifyContent: "center" },
  choiceSelected: { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.primary },
  choiceText: { color: theme.colors.textSecondary, fontSize: 12, fontWeight: "700" },
  choiceTextSelected: { color: theme.colors.primary, fontWeight: "800" },
  targetRow: { flexDirection: "row", alignItems: "center", gap: theme.spacing.md },
  stepper: { width: 44, height: 44, borderRadius: 14, backgroundColor: theme.colors.primarySoft, alignItems: "center", justifyContent: "center" },
  stepperDisabled: { opacity: 0.4 },
  stepperText: { color: theme.colors.primary, fontSize: 22, fontWeight: "700" },
  targetValue: { minWidth: 30, textAlign: "center", color: theme.colors.textPrimary, fontSize: 24, fontWeight: "800" },
  targetSuffix: { color: theme.colors.textSecondary, fontSize: 12 },
  addButton: { marginTop: theme.spacing.xs },
  listHeading: { flexDirection: "row", alignItems: "center", gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  listTitle: { color: theme.colors.textPrimary, fontSize: 19, fontWeight: "800" },
  count: { minWidth: 24, height: 24, overflow: "hidden", borderRadius: 12, backgroundColor: theme.colors.brandBurgundySoft, color: theme.colors.brandBurgundy, textAlign: "center", textAlignVertical: "center", fontSize: 11, fontWeight: "800" },
  error: { color: theme.colors.danger, fontSize: 12, lineHeight: 18 },
  muted: { color: theme.colors.textSecondary, fontSize: 12, lineHeight: 18 },
  goalList: { gap: theme.spacing.sm },
  goalCard: { gap: theme.spacing.md },
  goalHeader: { flexDirection: "row", alignItems: "center", gap: theme.spacing.sm },
  goalCopy: { flex: 1, gap: 4 },
  goalName: { color: theme.colors.textPrimary, fontSize: 15, fontWeight: "800" },
  goalMeta: { color: theme.colors.textSecondary, fontSize: 12 },
  progressText: { color: theme.colors.primary, fontSize: 13, fontWeight: "800" },
  track: { height: 7, borderRadius: 4, backgroundColor: theme.colors.surfaceSubtle, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 4, backgroundColor: theme.colors.primary },
  secondaryLink: { minHeight: 44, color: theme.colors.primary, fontSize: 13, fontWeight: "800", textAlign: "center", textAlignVertical: "center", marginTop: theme.spacing.sm },
  privacyNote: { color: theme.colors.textSecondary, fontSize: 11, lineHeight: 17, textAlign: "center", marginTop: theme.spacing.sm },
});
