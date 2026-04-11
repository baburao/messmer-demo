import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import { generateStory, StoryChoice, OutputFormat } from '../services/aiService';

const { width } = Dimensions.get('window');
const FORMAT_CARD_WIDTH = (width - Spacing.md * 2 - Spacing.sm) / 2;

type GeneratedStory = {
  title: string;
  desc: string;
  category: string;
  author: string;
  image: string;
};

export default function QuestCompleteScreen({ navigation, route }: any) {
  const { themeId, characterId, skinId, choices } = route.params ?? {};
  const safeChoices: StoryChoice[] = choices ?? [];

  // ── State ──────────────────────────────────────────────────────────────────
  const [generating, setGenerating] = useState(true);
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<OutputFormat | null>(null);

  // ── Animated values ────────────────────────────────────────────────────────
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const badgeScale = useRef(new Animated.Value(0.6)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const loadingDot1 = useRef(new Animated.Value(0)).current;
  const loadingDot2 = useRef(new Animated.Value(0)).current;
  const loadingDot3 = useRef(new Animated.Value(0)).current;

  // ── Entrance animation ─────────────────────────────────────────────────────
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, badgeScale]);

  // ── Loading dot animation ──────────────────────────────────────────────────
  useEffect(() => {
    if (!generating) return;

    const bounce = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 280, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 280, useNativeDriver: true }),
        ]),
      );

    Animated.parallel([
      bounce(loadingDot1, 0),
      bounce(loadingDot2, 140),
      bounce(loadingDot3, 280),
    ]).start();
  }, [generating]);

  // ── Generate story on mount ────────────────────────────────────────────────
  useEffect(() => {
    generateStory(themeId, characterId, safeChoices)
      .then(story => {
        setGeneratedStory(story);
        setGenerating(false);

        // Fade in the story content
        Animated.timing(contentFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      })
      .catch(() => {
        setGenerating(false);
      });
  }, []);

  // ── Handle generate ───────────────────────────────────────────────────────
  const handleGenerate = () => {
    if (!selectedFormat || !generatedStory) return;
    if (selectedFormat === 'storybook') {
      navigation.push('StoryDetail', { story: generatedStory, fromCreate: true });
    } else {
      navigation.push('WatchDetail', { story: generatedStory, fromCreate: true });
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* ── Header safe area ── */}
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Animated.ScrollView
        style={[styles.scrollView, { opacity: fadeAnim }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Quest Complete badge ── */}
        <Animated.View
          style={[styles.badgeContainer, { transform: [{ scale: badgeScale }] }]}
        >
          <Text style={styles.badgeText}>✦ QUEST COMPLETE ✦</Text>
        </Animated.View>

        {/* ── Generating state ── */}
        {generating && (
          <View style={styles.generatingCard}>
            <Text style={styles.generatingLabel}>Compiling your story</Text>
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

        {/* ── Story content (shown after generation) ── */}
        {!generating && generatedStory && (
          <Animated.View style={{ opacity: contentFade }}>
            {/* Story title */}
            <View style={styles.storyTitleCard}>
              <Text style={styles.storyCategory}>{generatedStory.category}</Text>
              <Text style={styles.storyTitle}>{generatedStory.title}</Text>
              <Text style={styles.storyDesc}>{generatedStory.desc}</Text>
              <Text style={styles.storyAuthor}>By {generatedStory.author}</Text>
            </View>

            {/* Journey recap */}
            {safeChoices.length > 0 && (
              <View style={styles.journeySection}>
                <Text style={styles.journeySectionLabel}>YOUR JOURNEY</Text>
                <View style={styles.journeyList}>
                  {safeChoices.map((choice, index) => (
                    <View key={index} style={styles.journeyItem}>
                      <View style={styles.journeyBullet}>
                        <Text style={styles.journeyBulletText}>{choice.round}</Text>
                      </View>
                      <Text style={styles.journeyChoiceText}>{choice.optionText}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Format selection */}
            <Text style={styles.formatLabel}>HOW WOULD YOU LIKE YOUR STORY?</Text>

            <View style={styles.formatRow}>
              {/* Storybook card */}
              <TouchableOpacity
                style={[
                  styles.formatCard,
                  selectedFormat === 'storybook' && styles.formatCardSelected,
                ]}
                onPress={() => setSelectedFormat('storybook')}
                activeOpacity={0.85}
              >
                <Text style={styles.formatEmoji}>📖</Text>
                <Text style={styles.formatName}>STORYBOOK</Text>
                <Text style={styles.formatSub}>Read at your pace</Text>
                {selectedFormat === 'storybook' && (
                  <View style={styles.formatCheck}>
                    <Text style={styles.formatCheckText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Video card */}
              <TouchableOpacity
                style={[
                  styles.formatCard,
                  selectedFormat === 'video' && styles.formatCardSelected,
                ]}
                onPress={() => setSelectedFormat('video')}
                activeOpacity={0.85}
              >
                <Text style={styles.formatEmoji}>▶</Text>
                <Text style={styles.formatName}>VIDEO</Text>
                <Text style={styles.formatSub}>Watch with narration</Text>
                {selectedFormat === 'video' && (
                  <View style={styles.formatCheck}>
                    <Text style={styles.formatCheckText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{ height: 120 }} />
          </Animated.View>
        )}
      </Animated.ScrollView>

      {/* ── Bottom CTA (shown once generated) ── */}
      {!generating && generatedStory && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.generateButton,
              !selectedFormat && styles.generateButtonDisabled,
            ]}
            onPress={handleGenerate}
            disabled={!selectedFormat}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.generateButtonText,
                !selectedFormat && styles.generateButtonTextDisabled,
              ]}
            >
              GENERATE MY STORY →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ── Safe header ──
  safeHeader: {
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingTop:
      Platform.OS === 'android'
        ? (StatusBar.currentHeight ?? 0) + Spacing.sm
        : Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  backArrow: {
    fontSize: 20,
    color: Colors.gold,
  },

  // ── Scroll ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },

  // ── Quest complete badge ──
  badgeContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  badgeText: {
    fontSize: Typography.sizes.sm,
    color: Colors.gold,
    letterSpacing: 3,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // ── Generating card ──
  generatingCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  generatingLabel: {
    fontSize: Typography.sizes.md,
    fontFamily: Typography.fontSerif,
    color: Colors.textSecondary,
    fontStyle: 'italic',
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

  // ── Story title card ──
  storyTitleCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  storyCategory: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    letterSpacing: 2.5,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  storyTitle: {
    fontSize: Typography.sizes.xxl,
    fontFamily: Typography.fontSerif,
    color: Colors.text,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.sm,
    lineHeight: 34,
  },
  storyDesc: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  storyAuthor: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },

  // ── Journey section ──
  journeySection: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  journeySectionLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    letterSpacing: 2.5,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  journeyList: {
    gap: Spacing.sm,
  },
  journeyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  journeyBullet: {
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(201,168,76,0.15)',
    borderWidth: 1,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  journeyBulletText: {
    fontSize: 11,
    color: Colors.gold,
    fontWeight: '700',
  },
  journeyChoiceText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  // ── Format selection ──
  formatLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    letterSpacing: 2.5,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  formatRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  formatCard: {
    width: FORMAT_CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    position: 'relative',
    minHeight: 140,
    justifyContent: 'center',
  },
  formatCardSelected: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(201,168,76,0.06)',
  },
  formatEmoji: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  formatName: {
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  formatSub: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  formatCheck: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatCheckText: {
    fontSize: 11,
    color: Colors.background,
    fontWeight: '700',
  },

  // ── Footer ──
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : Spacing.md,
  },
  generateButton: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: Colors.border,
  },
  generateButtonText: {
    fontSize: Typography.sizes.sm,
    color: Colors.background,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  generateButtonTextDisabled: {
    color: Colors.textMuted,
  },
});
