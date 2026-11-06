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
import {
  getLocalDayKey,
  getLocalWeekStartKey,
  type HabitFrequency,
} from "@/domain/habits/habit";
import {
  completeHabitToday,
  createLocalHabit,
  getHabitSummaries,
  undoHabitCompletion,
  type HabitSummary,
} from "@/infrastructure/local/habit-repository";
import { EmptyState } from "@/components/ui/EmptyState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { theme } from "@/theme/tokens";

function getDateKeys(now: Date) {
  return {
    today: getLocalDayKey(now),
    weekStart: getLocalWeekStartKey(now),
  };
}

export default function HabitsScreen() {
  const [habits, setHabits] = useState<HabitSummary[]>([]);
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [weeklyTarget, setWeeklyTarget] = useState(3);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const { today, weekStart } = getDateKeys(now);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const summaries = await getHabitSummaries(weekStart, today);
      setHabits(summaries);
    } catch {
      setError("No pudimos cargar tus hábitos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }, [today, weekStart]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleCreate = async () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Escribe un nombre para tu hábito.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await createLocalHabit({
        id: `habit-${Date.now()}`,
        title: cleanTitle,
        frequency,
        targetPerWeek: frequency === "daily" ? 7 : weeklyTarget,
        now: Date.now(),
      });
      setTitle("");
      await refresh();
    } catch {
      setError("No pudimos guardar el hábito. Revisa el nombre e inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const handleCompletion = async (habit: HabitSummary) => {
    setError(null);
    try {
      if (habit.completedToday) {
        await undoHabitCompletion(habit.id, today);
      } else {
        await completeHabitToday({
          habitId: habit.id,
          dayKey: today,
          occurredAt: Date.now(),
        });
      }
      await refresh();
    } catch {
      setError("No pudimos actualizar el registro de hoy. Intenta nuevamente.");
    }
  };

  const dateLabel = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.topBar}>
          <Link href="/" style={styles.backLink}>← Inicio</Link>
          <Text style={styles.brand}>FIXORA BALANCE</Text>
        </View>

        <SectionHeading eyebrow="HÁBITOS CONSCIENTES" title="Pequeños pasos que cuentan." />
        <Text style={styles.date}>{dateLabel}</Text>
        <Text style={styles.intro}>
          Elige acciones que tengan sentido para ti. Puedes ajustar tu ritmo sin perder tu progreso.
        </Text>

        <SurfaceCard style={styles.formCard}>
          <Text style={styles.formTitle}>Crear un hábito</Text>
          <TextInput
            accessibilityLabel="Nombre del hábito"
            value={title}
            onChangeText={setTitle}
            placeholder="Ej. Leer 10 minutos"
            placeholderTextColor={theme.colors.textSecondary}
            maxLength={60}
            returnKeyType="done"
            onSubmitEditing={() => void handleCreate()}
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>¿Con qué frecuencia?</Text>
          <View style={styles.choiceRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: frequency === "daily" }}
              onPress={() => setFrequency("daily")}
              style={[styles.choice, frequency === "daily" && styles.choiceSelected]}
            >
              <Text style={[styles.choiceText, frequency === "daily" && styles.choiceTextSelected]}>
                Cada día
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: frequency === "weekly" }}
              onPress={() => setFrequency("weekly")}
              style={[styles.choice, frequency === "weekly" && styles.choiceSelected]}
            >
              <Text style={[styles.choiceText, frequency === "weekly" && styles.choiceTextSelected]}>
                Por semana
              </Text>
            </Pressable>
          </View>

          {frequency === "weekly" && (
            <>
              <Text style={styles.fieldLabel}>Meta semanal</Text>
              <View style={styles.choiceRow}>
                {[2, 3, 4, 5, 6, 7].map((target) => (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: weeklyTarget === target }}
                    key={target}
                    onPress={() => setWeeklyTarget(target)}
                    style={[styles.targetChoice, weeklyTarget === target && styles.choiceSelected]}
                  >
                    <Text style={[styles.choiceText, weeklyTarget === target && styles.choiceTextSelected]}>
                      {target}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          <PrimaryButton
            label={saving ? "Guardando…" : "Agregar hábito"}
            onPress={() => void handleCreate()}
            disabled={saving || !title.trim()}
            style={styles.addButton}
          />
        </SurfaceCard>

        <View style={styles.listHeading}>
          <Text style={styles.listTitle}>Tus hábitos</Text>
          <Text style={styles.count}>{habits.length}</Text>
        </View>

        {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}

        {loading ? (
          <SurfaceCard><Text style={styles.muted}>Cargando tus hábitos…</Text></SurfaceCard>
        ) : habits.length === 0 ? (
          <SurfaceCard>
            <EmptyState
              title="Aquí empieza tu rutina"
              description="Agrega un hábito pequeño y registra tus avances día a día. Todo queda guardado en este dispositivo."
            />
          </SurfaceCard>
        ) : (
          <View style={styles.habitList}>
            {habits.map((habit) => {
              const progress = Math.min(habit.completedThisWeek, habit.targetPerWeek);
              const complete = habit.completedToday;
              return (
                <SurfaceCard key={habit.id} style={styles.habitCard}>
                  <View style={styles.habitHeader}>
                    <View style={styles.habitCopy}>
                      <Text style={styles.habitName}>{habit.title}</Text>
                      <Text style={styles.habitMeta}>
                        {habit.frequency === "daily" ? "Todos los días" : `${habit.targetPerWeek} veces por semana`}
                      </Text>
                    </View>
                    <Text style={styles.progressText}>{progress}/{habit.targetPerWeek}</Text>
                  </View>
                  <View style={styles.track}>
                    <View style={[styles.fill, { width: `${(progress / habit.targetPerWeek) * 100}%` }]} />
                  </View>
                  <Pressable
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: complete }}
                    accessibilityLabel={complete ? `Desmarcar ${habit.title} de hoy` : `Marcar ${habit.title} como completado hoy`}
                    onPress={() => void handleCompletion(habit)}
                    style={[styles.checkButton, complete && styles.checkButtonDone]}
                  >
                    <Text style={[styles.checkText, complete && styles.checkTextDone]}>
                      {complete ? "✓  Completado hoy" : "Marcar como hecho"}
                    </Text>
                  </Pressable>
                </SurfaceCard>
              );
            })}
          </View>
        )}

        <Text style={styles.privacyNote}>
          Tus hábitos permanecen localmente en este dispositivo por ahora. La sincronización de cuenta se implementará después de revisar permisos y conflictos.
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
  date: { color: theme.colors.textSecondary, fontSize: 13, textTransform: "capitalize" },
  intro: { color: theme.colors.textSecondary, fontSize: 14, lineHeight: 21, marginBottom: theme.spacing.xs },
  formCard: { gap: theme.spacing.md },
  formTitle: { color: theme.colors.textPrimary, fontSize: 17, fontWeight: "800" },
  input: { minHeight: 48, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.control, paddingHorizontal: theme.spacing.md, color: theme.colors.textPrimary, fontSize: 14, backgroundColor: theme.colors.surfaceWarm },
  fieldLabel: { color: theme.colors.textPrimary, fontSize: 12, fontWeight: "700" },
  choiceRow: { flexDirection: "row", gap: theme.spacing.xs, flexWrap: "wrap" },
  choice: { minHeight: 42, borderRadius: theme.radius.control, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: theme.spacing.md, alignItems: "center", justifyContent: "center" },
  targetChoice: { minWidth: 42, minHeight: 42, borderRadius: theme.radius.control, borderWidth: 1, borderColor: theme.colors.border, alignItems: "center", justifyContent: "center" },
  choiceSelected: { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.primary },
  choiceText: { color: theme.colors.textSecondary, fontSize: 12, fontWeight: "700" },
  choiceTextSelected: { color: theme.colors.primary, fontWeight: "800" },
  addButton: { marginTop: theme.spacing.xs },
  listHeading: { flexDirection: "row", alignItems: "center", gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  listTitle: { color: theme.colors.textPrimary, fontSize: 19, fontWeight: "800" },
  count: { minWidth: 24, height: 24, overflow: "hidden", borderRadius: 12, backgroundColor: theme.colors.brandBurgundySoft, color: theme.colors.brandBurgundy, textAlign: "center", textAlignVertical: "center", fontSize: 11, fontWeight: "800" },
  error: { color: theme.colors.danger, fontSize: 12, lineHeight: 18 },
  muted: { color: theme.colors.textSecondary, fontSize: 13 },
  habitList: { gap: theme.spacing.sm },
  habitCard: { gap: theme.spacing.md },
  habitHeader: { flexDirection: "row", alignItems: "center", gap: theme.spacing.sm },
  habitCopy: { flex: 1, gap: 4 },
  habitName: { color: theme.colors.textPrimary, fontSize: 15, fontWeight: "800" },
  habitMeta: { color: theme.colors.textSecondary, fontSize: 12 },
  progressText: { color: theme.colors.primary, fontSize: 12, fontWeight: "800" },
  track: { height: 7, borderRadius: 4, backgroundColor: theme.colors.surfaceSubtle, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 4, backgroundColor: theme.colors.primary },
  checkButton: { minHeight: 44, borderRadius: theme.radius.button, borderWidth: 1, borderColor: theme.colors.primary, alignItems: "center", justifyContent: "center" },
  checkButtonDone: { backgroundColor: theme.colors.primarySoft },
  checkText: { color: theme.colors.primary, fontSize: 12, fontWeight: "800" },
  checkTextDone: { color: theme.colors.primaryPressed },
  privacyNote: { color: theme.colors.textSecondary, fontSize: 11, lineHeight: 17, textAlign: "center", marginTop: theme.spacing.sm },
});
