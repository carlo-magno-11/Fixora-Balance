import { useEffect, useState } from "react";
import { theme } from "@/theme/tokens";
import { deleteFocusSession, getLatestFocusSession, saveFocusSession } from "@/infrastructure/local/focus-session-repository";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  completeFocusSession,
  getRemainingSeconds,
  pauseFocusSession,
  resumeFocusSession,
  startFocusSession,
  type FocusSession,
} from "@/domain/focus/focus-session";

const DURATIONS = [15, 25, 50] as const;
const COLORS = {
  background: theme.colors.canvas,
  surface: theme.colors.surface,
  ink: theme.colors.textPrimary,
  muted: theme.colors.textSecondary,
  accent: theme.colors.brandBurgundy,
  accentSoft: theme.colors.brandBurgundySoft,
  accentBorder: theme.colors.brandBurgundyBorder,
  gold: theme.colors.accentGold,
  line: theme.colors.border,
  green: theme.colors.primary,
  greenSoft: theme.colors.primarySoft,
  surfaceSubtle: theme.colors.surfaceSubtle,
  surfaceWarm: theme.colors.surfaceWarm,
  white: theme.colors.white,
};

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function HomeScreen() {
  const [durationMinutes, setDurationMinutes] = useState<number>(25);
  const [session, setSession] = useState<FocusSession | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(durationMinutes * 60);
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    let mounted = true;

    getLatestFocusSession()
      .then(async (savedSession) => {
        if (!mounted) return;
        if (savedSession) {
          let restored = savedSession;
          if (savedSession.status === "running") {
            const remaining = getRemainingSeconds(savedSession, Date.now());
            setRemainingSeconds(remaining);
            if (remaining === 0) {
              const completed = completeFocusSession(savedSession, Date.now());
              if (completed.ok) {
                restored = completed.value;
                await saveFocusSession(restored);
              }
            }
          } else {
            setRemainingSeconds(savedSession.remainingSeconds);
          }
          setSession(restored);
        }
        setStorageReady(true);
      })
      .catch(() => {
        if (mounted) {
          setStorageError(true);
          setStorageReady(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!storageReady || !session) return;
    saveFocusSession(session).catch(() => setStorageError(true));
  }, [session, storageReady]);

  useEffect(() => {
    if (!session || session.status !== "running") return;

    const update = () => {
      const remaining = getRemainingSeconds(session, Date.now());
      setRemainingSeconds(remaining);

      if (remaining === 0) {
        const result = completeFocusSession(session, Date.now());
        if (result.ok) setSession(result.value);
      }
    };

    update();
    const interval = setInterval(update, 500);
    return () => clearInterval(interval);
  }, [session]);

  const isRunning = session?.status === "running";
  const isPaused = session?.status === "paused";
  const isCompleted = session?.status === "completed";

  const handleStart = () => {
    const result = startFocusSession({
      id: `focus-${Date.now()}`,
      durationSeconds: durationMinutes * 60,
      now: Date.now(),
    });
    if (!result.ok) return;
    setSession(result.value);
    setRemainingSeconds(result.value.durationSeconds);
  };

  const handlePause = () => {
    if (!session) return;
    const result = pauseFocusSession(session, Date.now());
    if (!result.ok) return;
    setSession(result.value);
    setRemainingSeconds(result.value.remainingSeconds);
  };

  const handleResume = () => {
    if (!session) return;
    const result = resumeFocusSession(session, Date.now());
    if (!result.ok) return;
    setSession(result.value);
  };

  const handleReset = () => {
    setSession(null);
    setRemainingSeconds(durationMinutes * 60);
  };

  const handleDuration = (minutes: number) => {
    setDurationMinutes(minutes);
    setRemainingSeconds(minutes * 60);
    setSession(null);
  };

  const timerLabel = isCompleted
    ? "Sesión completada"
    : isPaused
      ? "En pausa"
      : isRunning
        ? "Tu espacio de enfoque"
        : "Un momento para ti";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>F</Text>
          </View>
          <View style={styles.brandCopy}>
            <Text style={styles.brandName}>FIXORA</Text>
            <Text style={styles.brandSubname}>BALANCE</Text>
          </View>
          <View style={styles.headerSpacer} />
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Tu espacio</Text>
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>BIENESTAR DIGITAL, A TU RITMO</Text>
          <Text style={styles.headline}>Haz espacio para{"\n"}lo que importa.</Text>
          <Text style={styles.subtitle}>
            No se trata de usar menos por obligación. Se trata de elegir mejor en qué pones tu atención.
          </Text>
        </View>

        <View style={styles.focusCard}>
          <View style={styles.focusCardTop}>
            <View>
              <Text style={styles.cardEyebrow}>MODO ENFOQUE</Text>
              <Text style={styles.focusTitle}>{timerLabel}</Text>
            </View>
            <View style={styles.leafBadge}>
              <Text style={styles.leafEmoji}>✦</Text>
            </View>
          </View>

          <View style={styles.timerWrap}>
            <View style={styles.timerOuter}>
              <View style={styles.timerInner}>
                <Text style={styles.timerValue}>
                  {formatTime(session ? remainingSeconds : durationMinutes * 60)}
                </Text>
                <Text style={styles.timerCaption}>
                  {isCompleted ? "TIEMPO BIEN INVERTIDO" : "MINUTOS PARA TI"}
                </Text>
              </View>
            </View>
          </View>

          {!session && (
            <View style={styles.durationPicker}>
              {DURATIONS.map((minutes) => (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: durationMinutes === minutes }}
                  key={minutes}
                  disabled={!storageReady}
                  onPress={() => handleDuration(minutes)}
                  style={[
                    styles.durationOption,
                    durationMinutes === minutes && styles.durationOptionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.durationText,
                      durationMinutes === minutes && styles.durationTextSelected,
                    ]}
                  >
                    {minutes} min
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          <View style={styles.actionRow}>
            {!session && (
              <Pressable accessibilityRole="button" disabled={!storageReady} onPress={handleStart} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Comenzar sesión</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </Pressable>
            )}
            {isRunning && (
              <Pressable accessibilityRole="button" onPress={handlePause} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Pausar sesión</Text>
                <Text style={styles.buttonArrow}>Ⅱ</Text>
              </Pressable>
            )}
            {isPaused && (
              <Pressable accessibilityRole="button" onPress={handleResume} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Continuar</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </Pressable>
            )}
            {isCompleted && (
              <Pressable accessibilityRole="button" onPress={handleReset} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Iniciar otra sesión</Text>
                <Text style={styles.buttonArrow}>↻</Text>
              </Pressable>
            )}
            {(isRunning || isPaused) && (
              <Pressable accessibilityRole="button" onPress={handleReset} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Terminar</Text>
              </Pressable>
            )}
          </View>
          <Text style={styles.focusFootnote}>
            {isCompleted
              ? "Tómate un respiro. Tu progreso se guardará cuando activemos el historial."
              : "Puedes pausar cuando lo necesites. Tu bienestar no es una competencia."}
          </Text>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionEyebrow}>TU CAMINO</Text>
            <Text style={styles.sectionTitle}>Pequeños pasos, grandes cambios.</Text>
          </View>
        </View>

        <View style={styles.emptyProgressCard}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>✧</Text>
          </View>
          <View style={styles.emptyCopy}>
            <Text style={styles.emptyTitle}>Tu historia comienza aquí</Text>
            <Text style={styles.emptyText}>
              Cuando completes tus primeras sesiones y hábitos, verás aquí tu avance real. Sin comparaciones ni presión.
            </Text>
          </View>
        </View>

        <View style={styles.valuesRow}>
          <View style={styles.valueCard}>
            <Text style={styles.valueIcon}>♡</Text>
            <Text style={styles.valueTitle}>A tu ritmo</Text>
            <Text style={styles.valueText}>Metas que se adaptan a tu vida.</Text>
          </View>
          <View style={styles.valueCard}>
            <Text style={styles.valueIcon}>✺</Text>
            <Text style={styles.valueTitle}>Sin culpa</Text>
            <Text style={styles.valueText}>Cada día es una nueva oportunidad.</Text>
          </View>
        </View>

        <Text style={styles.footer}>FIXORA BALANCE · RECUPERA TU ATENCIÓN</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 36, maxWidth: 680, width: "100%", alignSelf: "center" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 34 },
  brandMark: { width: 38, height: 38, borderRadius: 13, backgroundColor: COLORS.accent, alignItems: "center", justifyContent: "center" },
  brandMarkText: { color: COLORS.white, fontSize: 22, fontWeight: "800" },
  brandCopy: { marginLeft: 10 },
  brandName: { color: COLORS.ink, fontSize: 12, fontWeight: "900", letterSpacing: 2.2 },
  brandSubname: { color: COLORS.muted, fontSize: 9, fontWeight: "700", letterSpacing: 2.8, marginTop: 2 },
  headerSpacer: { flex: 1 },
  statusPill: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surfaceSubtle, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 7, gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.green },
  statusText: { color: COLORS.green, fontSize: 11, fontWeight: "700" },
  intro: { marginBottom: 24 },
  eyebrow: { color: COLORS.accent, fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  headline: { color: COLORS.ink, fontSize: 35, lineHeight: 41, fontWeight: "800", letterSpacing: -1.2, marginTop: 11 },
  subtitle: { color: COLORS.muted, fontSize: 14, lineHeight: 22, marginTop: 12, maxWidth: 490 },
  focusCard: { backgroundColor: COLORS.surface, borderRadius: 26, padding: 21, borderWidth: 1, borderColor: COLORS.line, shadowColor: COLORS.ink, shadowOpacity: 0.06, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 2 },
  focusCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardEyebrow: { color: COLORS.accent, fontSize: 9, fontWeight: "900", letterSpacing: 1.8 },
  focusTitle: { color: COLORS.ink, fontSize: 17, fontWeight: "800", marginTop: 5 },
  leafBadge: { width: 34, height: 34, borderRadius: 12, backgroundColor: COLORS.accentSoft, alignItems: "center", justifyContent: "center" },
  leafEmoji: { color: COLORS.accent, fontSize: 20 },
  timerWrap: { alignItems: "center", paddingVertical: 22 },
  timerOuter: { width: 196, height: 196, borderRadius: 98, borderWidth: 8, borderColor: COLORS.accentSoft, alignItems: "center", justifyContent: "center" },
  timerInner: { width: 168, height: 168, borderRadius: 84, backgroundColor: COLORS.surfaceWarm, alignItems: "center", justifyContent: "center" },
  timerValue: { color: COLORS.ink, fontSize: 43, fontWeight: "700", letterSpacing: -1.6, fontVariant: ["tabular-nums"] },
  timerCaption: { color: COLORS.muted, fontSize: 8, fontWeight: "800", letterSpacing: 1.5, marginTop: 5 },
  durationPicker: { flexDirection: "row", justifyContent: "center", gap: 9, marginBottom: 16 },
  durationOption: { borderRadius: 14, borderWidth: 1, borderColor: COLORS.line, paddingHorizontal: 18, paddingVertical: 10 },
  durationOptionSelected: { backgroundColor: COLORS.accentSoft, borderColor: COLORS.accentBorder },
  durationText: { color: COLORS.muted, fontSize: 12, fontWeight: "700" },
  durationTextSelected: { color: COLORS.accent },
  actionRow: { flexDirection: "row", gap: 10 },
  primaryButton: { flex: 1, minHeight: 50, backgroundColor: COLORS.green, borderRadius: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12, paddingHorizontal: 14 },
  primaryButtonText: { color: COLORS.white, fontSize: 13, fontWeight: "800" },
  buttonArrow: { color: COLORS.white, fontSize: 17, fontWeight: "700" },
  secondaryButton: { minHeight: 50, borderRadius: 15, borderWidth: 1, borderColor: COLORS.line, paddingHorizontal: 17, alignItems: "center", justifyContent: "center" },
  secondaryButtonText: { color: COLORS.muted, fontSize: 12, fontWeight: "700" },
  focusFootnote: { color: COLORS.muted, fontSize: 10, lineHeight: 16, textAlign: "center", marginTop: 13 },
  sectionHeading: { marginTop: 31, marginBottom: 13 },
  sectionEyebrow: { color: COLORS.gold, fontSize: 9, fontWeight: "900", letterSpacing: 1.8 },
  sectionTitle: { color: COLORS.ink, fontSize: 18, fontWeight: "800", marginTop: 5 },
  emptyProgressCard: { backgroundColor: COLORS.surfaceSubtle, borderRadius: 20, padding: 17, flexDirection: "row", gap: 13, alignItems: "flex-start" },
  emptyIcon: { width: 37, height: 37, borderRadius: 13, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" },
  emptyIconText: { color: COLORS.gold, fontSize: 22 },
  emptyCopy: { flex: 1 },
  emptyTitle: { color: COLORS.ink, fontSize: 13, fontWeight: "800" },
  emptyText: { color: COLORS.muted, fontSize: 11, lineHeight: 17, marginTop: 5 },
  valuesRow: { flexDirection: "row", gap: 11, marginTop: 13 },
  valueCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 18, padding: 15, borderWidth: 1, borderColor: COLORS.line },
  valueIcon: { color: COLORS.accent, fontSize: 20, marginBottom: 9 },
  valueTitle: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  valueText: { color: COLORS.muted, fontSize: 10, lineHeight: 15, marginTop: 4 },
  footer: { color: COLORS.muted, fontSize: 8, fontWeight: "800", letterSpacing: 1.5, textAlign: "center", marginTop: 28 },
});
