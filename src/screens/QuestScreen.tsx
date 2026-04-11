import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  Modal,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import {
  getNextScene,
  StoryScene,
  StoryChoice,
  StoryOption,
} from '../services/aiService';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BANNER_HEIGHT = SCREEN_HEIGHT * 0.38;

type Phase = 'loading' | 'narrating' | 'choosing' | 'transitioning';

export default function QuestScreen({ navigation, route }: any) {
  const { themeId, characterId, skinId } = route.params ?? {};

  // ── State ──────────────────────────────────────────────────────────────────
  const [scene, setScene] = useState<StoryScene | null>(null);
  const [round, setRound] = useState(1);
  const [choices, setChoices] = useState<StoryChoice[]>([]);
  const [phase, setPhase] = useState<Phase>('loading');
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const [showEndModal, setShowEndModal] = useState(false);
  const [narrationDone, setNarrationDone] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);
  const [customText, setCustomText] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // ── Animated values ────────────────────────────────────────────────────────
  const bannerOpacity = useRef(new Animated.Value(1)).current;
  const contentFadeIn = useRef(new Animated.Value(0)).current;
  const loadingDot1 = useRef(new Animated.Value(0)).current;
  const loadingDot2 = useRef(new Animated.Value(0)).current;
  const loadingDot3 = useRef(new Animated.Value(0)).current;

  // ── Narration word reveal ──────────────────────────────────────────────────
  const narrationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startNarration = useCallback((text: string) => {
    setNarrationDone(false);
    setVisibleWords(0);
    setExpandedOption(null);
    setShowCustomInput(false);
    setCustomText('');

    const words = text.split(' ');
    let idx = 0;

    if (narrationIntervalRef.current) {
      clearInterval(narrationIntervalRef.current);
    }

    setPhase('narrating');

    narrationIntervalRef.current = setInterval(() => {
      idx += 1;
      setVisibleWords(idx);
      if (idx >= words.length) {
        clearInterval(narrationIntervalRef.current!);
        narrationIntervalRef.current = null;
        setNarrationDone(true);
        setPhase('choosing');
      }
    }, 60);
  }, []);

  // ── Loading dot animation ──────────────────────────────────────────────────
  const animateLoadingDots = useCallback(() => {
    const bounce = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      );

    Animated.parallel([
      bounce(loadingDot1, 0),
      bounce(loadingDot2, 150),
      bounce(loadingDot3, 300),
    ]).start();
  }, [loadingDot1, loadingDot2, loadingDot3]);

  // ── Load a scene ───────────────────────────────────────────────────────────
  const loadScene = useCallback(
    async (roundNum: number, prevChoiceIds: string[]) => {
      setPhase('loading');
      animateLoadingDots();

      try {
        const nextScene = await getNextScene(themeId, roundNum, prevChoiceIds);

        // Crossfade banner
        Animated.sequence([
          Animated.timing(bannerOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(bannerOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start();

        // Fade in content
        contentFadeIn.setValue(0);
        Animated.timing(contentFadeIn, {
          toValue: 1,
          duration: 500,
          delay: 300,
          useNativeDriver: true,
        }).start();

        setScene(nextScene);
        startNarration(nextScene.narration);
      } catch (e) {
        setPhase('choosing');
      }
    },
    [themeId, animateLoadingDots, bannerOpacity, contentFadeIn, startNarration],
  );

  // ── Mount: load first scene ────────────────────────────────────────────────
  useEffect(() => {
    loadScene(1, []);
    return () => {
      if (narrationIntervalRef.current) {
        clearInterval(narrationIntervalRef.current);
      }
    };
  }, []);

  // ── Handle option selection ────────────────────────────────────────────────
  const handleSelectOption = useCallback(
    (option: StoryOption) => {
      if (!scene) return;

      const newChoice: StoryChoice = {
        round,
        sceneId: scene.id,
        optionId: option.id,
        optionText: option.preview,
      };

      const updatedChoices = [...choices, newChoice];
      setChoices(updatedChoices);
      setPhase('transitioning');

      setTimeout(() => {
        const nextRound = round + 1;
        setRound(nextRound);
        loadScene(
          nextRound,
          updatedChoices.map(c => c.optionId),
        );
      }, 1400);
    },
    [scene, round, choices, loadScene],
  );

  // ── Handle custom text submit ──────────────────────────────────────────────
  const handleCustomSubmit = useCallback(() => {
    if (!customText.trim() || !scene) return;
    const fakeOption: StoryOption = {
      id: `custom-${round}`,
      preview: customText.trim(),
      full: customText.trim(),
    };
    handleSelectOption(fakeOption);
  }, [customText, scene, round, handleSelectOption]);

  // ── Handle END & GENERATE ─────────────────────────────────────────────────
  const handleEndAndGenerate = () => {
    setShowEndModal(false);
    navigation.navigate('QuestComplete', {
      themeId,
      characterId,
      skinId,
      choices,
    });
  };

  // ── Rendered narration text ────────────────────────────────────────────────
  const narrationWords = scene ? scene.narration.split(' ') : [];
  const visibleNarration = narrationWords.slice(0, visibleWords).join(' ');

  const isTransitioning = phase === 'transitioning';
  const isLoading = phase === 'loading';

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ═══════════════════════ BANNER (top 38%) ═══════════════════════════ */}
      <View style={[styles.banner, { height: BANNER_HEIGHT }]}>
        {scene ? (
          <Animated.Image
            source={{ uri: scene.image }}
            style={[styles.bannerImage, { opacity: bannerOpacity }]}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.bannerImagePlaceholder} />
        )}

        {/* Dark overlay */}
        <View style={styles.bannerOverlay} />

        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowEndModal(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* END QUEST pill */}
        <TouchableOpacity
          style={styles.endQuestPill}
          onPress={() => setShowEndModal(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.endQuestText}>END QUEST</Text>
        </TouchableOpacity>

        {/* Master badge + round */}
        <View style={styles.masterBadgeContainer}>
          <Text style={styles.masterBadge}>⬡ THE MASTER</Text>
          <Text style={styles.roundLabel}>ROUND {round}</Text>
        </View>
      </View>

      {/* ═══════════════════ SCROLL CONTENT (bottom 62%) ════════════════════ */}
      <KeyboardAvoidingView
        style={styles.contentArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ opacity: contentFadeIn }}>

            {/* ── Loading state ──────────────────────────────────────── */}
            {isLoading && (
              <View style={styles.loadingCard}>
                <Text style={styles.loadingText}>The Master is weaving your story</Text>
                <View style={styles.dotsRow}>
                  {[loadingDot1, loadingDot2, loadingDot3].map((dot, i) => (
                    <Animated.View
                      key={i}
                      style={[
                        styles.dot,
                        {
                          transform: [
                            {
                              translateY: dot.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -6],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* ── Transitioning state ────────────────────────────────── */}
            {isTransitioning && (
              <View style={styles.loadingCard}>
                <Text style={styles.loadingText}>Unfolding what comes next</Text>
                <View style={styles.dotsRow}>
                  {[loadingDot1, loadingDot2, loadingDot3].map((dot, i) => (
                    <Animated.View
                      key={i}
                      style={[
                        styles.dot,
                        {
                          transform: [
                            {
                              translateY: dot.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -6],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* ── Narration card ─────────────────────────────────────── */}
            {scene && !isLoading && !isTransitioning && (
              <View style={styles.narrationCard}>
                <Text style={styles.narrationText}>{visibleNarration}</Text>

                {/* Question + options (shown once narration completes) */}
                {narrationDone && (
                  <>
                    <View style={styles.questionDivider} />
                    <Text style={styles.questionText}>{scene.question}</Text>

                    {/* Accordion options */}
                    <View style={styles.optionsContainer}>
                      {scene.options.map(option => {
                        const isExpanded = expandedOption === option.id;
                        return (
                          <View key={option.id} style={styles.optionWrapper}>
                            <TouchableOpacity
                              style={[styles.optionHeader, isExpanded && styles.optionHeaderExpanded]}
                              onPress={() =>
                                setExpandedOption(isExpanded ? null : option.id)
                              }
                              activeOpacity={0.8}
                            >
                              <Text style={styles.optionPreview}>{option.preview}</Text>
                              <Text style={styles.optionChevron}>
                                {isExpanded ? '▲' : '▼'}
                              </Text>
                            </TouchableOpacity>

                            {isExpanded && (
                              <View style={styles.optionExpanded}>
                                <Text style={styles.optionFull}>{option.full}</Text>
                                <TouchableOpacity
                                  style={styles.selectButton}
                                  onPress={() => handleSelectOption(option)}
                                  activeOpacity={0.85}
                                >
                                  <Text style={styles.selectButtonText}>SELECT THIS →</Text>
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </View>

                    {/* Custom input toggle */}
                    {!showCustomInput ? (
                      <TouchableOpacity
                        style={styles.customToggle}
                        onPress={() => setShowCustomInput(true)}
                        activeOpacity={0.75}
                      >
                        <Text style={styles.customToggleText}>✎  Write your own answer...</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.customInputContainer}>
                        <TextInput
                          style={styles.customInput}
                          value={customText}
                          onChangeText={setCustomText}
                          placeholder="Describe your action..."
                          placeholderTextColor={Colors.textMuted}
                          multiline
                          numberOfLines={3}
                          autoFocus
                        />
                        <View style={styles.customInputActions}>
                          <TouchableOpacity
                            style={styles.customCancelButton}
                            onPress={() => {
                              setShowCustomInput(false);
                              setCustomText('');
                            }}
                          >
                            <Text style={styles.customCancelText}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.customSubmitButton,
                              !customText.trim() && styles.customSubmitButtonDisabled,
                            ]}
                            onPress={handleCustomSubmit}
                            disabled={!customText.trim()}
                          >
                            <Text style={styles.customSubmitText}>SUBMIT →</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </>
                )}
              </View>
            )}

          </Animated.View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ═══════════════════════ END QUEST MODAL ════════════════════════════ */}
      <Modal
        visible={showEndModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEndModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>End your quest here?</Text>
            <Text style={styles.modalSubtitle}>
              Your story will be compiled from{' '}
              <Text style={styles.modalChoiceCount}>{choices.length}</Text>{' '}
              {choices.length === 1 ? 'choice' : 'choices'} made so far.
            </Text>

            <TouchableOpacity
              style={styles.modalContinueButton}
              onPress={() => setShowEndModal(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalContinueText}>CONTINUE QUEST</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalEndButton}
              onPress={handleEndAndGenerate}
              activeOpacity={0.8}
            >
              <Text style={styles.modalEndText}>END & GENERATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ── Banner ──
  banner: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0A0A0F',
  },
  bannerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  bannerImagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.surface,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 8 : 54,
    left: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: Colors.text,
  },
  endQuestPill: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 8 : 54,
    right: Spacing.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(120,20,20,0.75)',
    borderWidth: 1,
    borderColor: 'rgba(192,57,43,0.4)',
  },
  endQuestText: {
    fontSize: Typography.sizes.xs,
    color: '#FF6B6B',
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  masterBadgeContainer: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  masterBadge: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    letterSpacing: 2.5,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  roundLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginTop: 2,
  },

  // ── Content area ──
  contentArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
  },

  // ── Loading ──
  loadingCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  loadingText: {
    fontSize: Typography.sizes.md,
    fontFamily: Typography.fontSerif,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.gold,
  },

  // ── Narration card ──
  narrationCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  narrationText: {
    fontSize: Typography.sizes.md,
    color: Colors.text,
    lineHeight: 24,
    fontFamily: Typography.fontSerif,
  },
  questionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  questionText: {
    fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontSerif,
    color: Colors.goldLight,
    fontStyle: 'italic',
    lineHeight: 26,
    marginBottom: Spacing.md,
  },

  // ── Options ──
  optionsContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  optionWrapper: {
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
  },
  optionHeaderExpanded: {
    backgroundColor: 'rgba(201,168,76,0.08)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  optionPreview: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    fontWeight: '600',
    lineHeight: 20,
    paddingRight: Spacing.sm,
  },
  optionChevron: {
    fontSize: 10,
    color: Colors.gold,
  },
  optionExpanded: {
    backgroundColor: 'rgba(201,168,76,0.05)',
    padding: Spacing.md,
  },
  optionFull: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  selectButton: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: Typography.sizes.sm,
    color: Colors.background,
    fontWeight: '700',
    letterSpacing: 2,
  },

  // ── Custom input ──
  customToggle: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  customToggleText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  customInputContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  customInput: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  customInputActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  customCancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  customCancelText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  customSubmitButton: {
    flex: 2,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.gold,
  },
  customSubmitButtonDisabled: {
    backgroundColor: Colors.border,
  },
  customSubmitText: {
    fontSize: Typography.sizes.sm,
    color: Colors.background,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  // ── End Quest Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.82)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 40 : Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    borderBottomWidth: 0,
  },
  modalTitle: {
    fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontSerif,
    color: Colors.text,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  modalSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },
  modalChoiceCount: {
    color: Colors.gold,
    fontWeight: '700',
  },
  modalContinueButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  modalContinueText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    fontWeight: '700',
    letterSpacing: 2,
  },
  modalEndButton: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalEndText: {
    fontSize: Typography.sizes.sm,
    color: Colors.background,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
