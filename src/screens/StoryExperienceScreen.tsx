import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Image,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';

// ─── Types ─────────────────────────────────────────────────────────────────
interface Choice {
  id: string;
  text: string;
  consequence?: string;
}
interface NarrativeStep {
  type: 'narrative';
  id: string;
  speaker: string;
  narrative: string;
  sceneImage?: string;
}
interface DecisionStep {
  type: 'decision';
  id: string;
  speaker: string;
  narrative: string;
  choices: Choice[];
  sceneImage?: string;
}
type GameStep = NarrativeStep | DecisionStep;

// ─── Scene images by theme ─────────────────────────────────────────────────
const THEME_IMAGES: Record<string, string> = {
  neon: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
  woods: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
};

// ─── Story steps ───────────────────────────────────────────────────────────
const GAME_STEPS: GameStep[] = [
  {
    type: 'narrative',
    id: 's1',
    speaker: 'DM',
    narrative:
      "The world fades in slowly. Your vitals stabilize as your suit adjusts to the pressure differential. Rain-slick streets glow beneath ghostly holograms, each flicker a whisper of the city's forgotten dreams.",
  },
  {
    type: 'decision',
    id: 's2',
    speaker: 'NPC',
    narrative:
      'A distress signal cuts through the static — urgent, repeating, close. From the shadows, a figure watches you. The city holds its breath.',
    choices: [
      {
        id: 'a',
        text: 'Investigate the distress signal with caution',
        consequence:
          'You advance carefully, sensors live, hand resting on your sidearm. A strange electromagnetic hum resonates through your suit plating.',
      },
      {
        id: 'b',
        text: 'Ignore it. Your mission comes first.',
        consequence:
          'You turn away deliberately. The signal fades behind you as the city swallows the sound into its endless noise.',
      },
      {
        id: 'c',
        text: 'Attempt to trace the signal origin remotely',
        consequence:
          'Your neural interface crackles to life. Coordinates resolve — two blocks north, underground. Someone is down there.',
      },
    ],
  },
  {
    type: 'narrative',
    id: 's3',
    speaker: 'DM',
    narrative:
      "Your choice echoes through the narrow alley. The rain intensifies. Whatever path you've chosen, there is no going back now. The quest begins in earnest.",
  },
];

export default function StoryExperienceScreen({ navigation, route }: any) {
  const themeId = route?.params?.themeId || 'neon';
  const bgImage = THEME_IMAGES[themeId] || THEME_IMAGES.neon;

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [expandedChoice, setExpandedChoice] = useState<string | null>(null);

  const step = GAME_STEPS[stepIndex];
  const isLastStep = stepIndex >= GAME_STEPS.length - 1;

  const handleContinue = () => {
    if (isLastStep) {
      navigation.navigate('GameplayComplete');
    } else {
      setStepIndex(stepIndex + 1);
      setSelectedChoice(null);
      setExpandedChoice(null);
    }
  };

  const handleConfirmChoice = () => {
    if (selectedChoice) {
      if (isLastStep) {
        navigation.navigate('GameplayComplete');
      } else {
        setStepIndex(stepIndex + 1);
        setSelectedChoice(null);
        setExpandedChoice(null);
      }
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedChoice(expandedChoice === id ? null : id);
  };

  const ctaEnabled =
    step.type === 'narrative' ? true : !!selectedChoice;

  return (
    <View style={styles.container}>

      {/* ── Scene Image (fixed top) ─────────────────────── */}
      <View style={styles.heroSection}>
        <Image source={{ uri: bgImage }} style={styles.bgImage} resizeMode="cover" />
        <View style={styles.bgOverlay} />

        {/* Header overlay */}
        <View style={styles.headerOverlay}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>GAMEPLAY</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={styles.settingsIcon}>⚙</Text>
          </TouchableOpacity>
        </View>

        {/* Progress dots */}
        <View style={styles.progressDots}>
          {GAME_STEPS.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === stepIndex && styles.dotActive, i < stepIndex && styles.dotDone]}
            />
          ))}
        </View>

        {/* Speaker badge */}
        <View style={styles.speakerBadge}>
          <Text style={styles.speakerText}>{step.speaker}</Text>
        </View>
      </View>

      {/* ── Scrollable Narrative + Choices ─────────────── */}
      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Narrative */}
        <Text style={styles.narrative}>{step.narrative}</Text>

        {/* Choices (decision step only) */}
        {step.type === 'decision' && (
          <View style={styles.choicesSection}>
            <Text style={styles.choicesLabel}>MAKE A CHOICE</Text>
            <View style={styles.choicesDivider} />

            {step.choices.map((choice) => {
              const isSelected = selectedChoice === choice.id;
              const isExpanded = expandedChoice === choice.id;

              return (
                <TouchableOpacity
                  key={choice.id}
                  style={[styles.choiceCard, isSelected && styles.choiceCardSelected]}
                  onPress={() => setSelectedChoice(choice.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.choiceRow}>
                    {/* Radio */}
                    <View style={[styles.radio, isSelected && styles.radioSelected]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>

                    {/* Text (clamped unless expanded) */}
                    <Text
                      style={[styles.choiceText, isSelected && styles.choiceTextSelected]}
                      numberOfLines={isExpanded ? undefined : 2}
                    >
                      {choice.text}
                    </Text>

                    {/* Expand chevron — expands text, does NOT change selection */}
                    <TouchableOpacity
                      style={styles.chevronBtn}
                      onPress={(e) => { e.stopPropagation && e.stopPropagation(); toggleExpand(choice.id); }}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.chevron}>{isExpanded ? '∧' : '∨'}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Consequence text (only when selected AND expanded) */}
                  {isSelected && isExpanded && choice.consequence && (
                    <Text style={styles.consequence}>{choice.consequence}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* ── Sticky CTA ─────────────────────────────────── */}
      <View style={styles.ctaContainer}>
        {step.type === 'narrative' ? (
          <TouchableOpacity style={styles.ctaBtn} onPress={handleContinue} activeOpacity={0.85}>
            <Text style={styles.ctaBtnText}>
              {isLastStep ? 'COMPLETE QUEST' : 'CONTINUE  →'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.ctaBtn, !ctaEnabled && styles.ctaBtnDisabled]}
            onPress={handleConfirmChoice}
            activeOpacity={ctaEnabled ? 0.85 : 1}
          >
            <Text style={[styles.ctaBtnText, !ctaEnabled && styles.ctaBtnTextDisabled]}>
              {isLastStep && ctaEnabled ? 'COMPLETE QUEST' : 'CONFIRM CHOICE'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // Scene image
  heroSection: { height: 260, position: 'relative' },
  bgImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  bgOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  // Header overlay on image
  headerOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 12,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  backIcon: { color: Colors.text, fontSize: 22 },
  headerTitle: {
    color: Colors.text, fontSize: 13, letterSpacing: 3, fontWeight: '700',
  },
  settingsBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  settingsIcon: { color: Colors.text, fontSize: 18 },

  // Progress dots
  progressDots: {
    position: 'absolute', bottom: 44, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'center', gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { backgroundColor: Colors.gold, width: 18 },
  dotDone: { backgroundColor: 'rgba(255,255,255,0.6)' },

  // Speaker badge
  speakerBadge: {
    position: 'absolute', bottom: 16, left: 20,
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 5,
    borderWidth: 1, borderColor: Colors.gold,
  },
  speakerText: { color: Colors.gold, fontSize: 10, letterSpacing: 2, fontWeight: '700' },

  // Scrollable content
  contentScroll: { flex: 1 },
  contentInner: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 16 },

  narrative: {
    color: Colors.text, fontSize: 15, lineHeight: 26,
    fontFamily: Typography.fontSerif, marginBottom: 24,
  },

  // Choices
  choicesSection: { gap: 10 },
  choicesLabel: {
    color: Colors.textMuted, fontSize: 10, letterSpacing: 3, fontWeight: '700',
  },
  choicesDivider: { height: 1, backgroundColor: Colors.border, marginBottom: 4 },

  choiceCard: {
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.md, padding: 14,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  choiceCardSelected: {
    borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.06)',
  },
  choiceRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: Colors.textMuted,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 1, flexShrink: 0,
  },
  radioSelected: { borderColor: Colors.gold },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.gold },
  choiceText: {
    flex: 1, color: Colors.textSecondary, fontSize: 14, lineHeight: 20,
  },
  choiceTextSelected: { color: Colors.text },
  chevronBtn: { paddingLeft: 4, paddingTop: 2 },
  chevron: { color: Colors.textMuted, fontSize: 12 },
  consequence: {
    color: Colors.textSecondary, fontSize: 12, lineHeight: 18,
    marginTop: 10, paddingLeft: 30, fontStyle: 'italic',
    borderLeftWidth: 1, borderLeftColor: Colors.gold,
    paddingLeft: 12, marginLeft: 30,
  },

  // CTA
  ctaContainer: {
    padding: 20, paddingBottom: 36,
    backgroundColor: Colors.background,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  ctaBtn: {
    backgroundColor: Colors.gold, borderRadius: Radius.md,
    paddingVertical: 18, alignItems: 'center',
  },
  ctaBtnDisabled: { backgroundColor: 'rgba(255,255,255,0.08)' },
  ctaBtnText: {
    color: Colors.background, fontSize: 14, fontWeight: '700', letterSpacing: 2,
  },
  ctaBtnTextDisabled: { color: Colors.textMuted },
});
