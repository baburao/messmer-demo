import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import GoldButton from '../components/GoldButton';

const MODES = [
  {
    id: 'story',
    icon: '📖',
    title: 'Story Mode',
    subtitle: 'Guided Narrative',
    desc: 'Immerse yourself in a guided story. The narrative unfolds with suggested choices and rich descriptions.',
    badge: null,
  },
  {
    id: 'project',
    icon: '✦',
    title: 'Project Mode',
    subtitle: 'Full Agency',
    desc: 'Complete control. Shape every detail of your journey. For those who wish to co-author the story itself.',
    badge: 'PREMIUM',
  },
  {
    id: 'screenplay',
    icon: '🎬',
    title: 'Screenplay',
    subtitle: 'Script Format',
    desc: 'Experience the story as a screenplay. Ideal for writers and filmmakers seeking cinematic inspiration.',
    badge: null,
  },
];

export default function ModeSelectScreen({ navigation }: any) {
  const [selected, setSelected] = useState<string>('story');

  return (
    <View style={styles.container}>
      {/* Atmospheric BG */}
      <View style={styles.bgAccent} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerSub}>SELECT MODE</Text>
        <Text style={styles.headerTitle}>How do you want to experience the story?</Text>
        <View style={styles.headerLine} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {MODES.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={[styles.card, selected === mode.id && styles.cardSelected]}
            onPress={() => setSelected(mode.id)}
            activeOpacity={0.85}
          >
            <View style={styles.cardTop}>
              <View style={styles.iconCircle}>
                <Text style={styles.modeIcon}>{mode.icon}</Text>
              </View>
              <View style={styles.cardTitles}>
                <Text style={styles.modeSubtitle}>{mode.subtitle.toUpperCase()}</Text>
                <Text style={styles.modeTitle}>{mode.title}</Text>
              </View>
              {mode.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{mode.badge}</Text>
                </View>
              )}
              {selected === mode.id && (
                <View style={styles.checkCircle}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </View>
            <Text style={styles.modeDesc}>{mode.desc}</Text>

            {selected === mode.id && (
              <View style={styles.selectedBar} />
            )}
          </TouchableOpacity>
        ))}

        {/* Additional options */}
        <View style={styles.optionsSection}>
          <Text style={styles.optionsTitle}>ADDITIONAL OPTIONS</Text>
          {[
            { label: 'Enable Sound Effects', icon: '🔊' },
            { label: 'Show Chapter Word Count', icon: '📝' },
            { label: 'Haptic Feedback', icon: '📳' },
          ].map((opt) => (
            <View key={opt.label} style={styles.optionRow}>
              <Text style={styles.optionIcon}>{opt.icon}</Text>
              <Text style={styles.optionLabel}>{opt.label}</Text>
              <View style={styles.toggle}>
                <View style={styles.toggleThumb} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.cta}>
          <GoldButton
            title="Enter the Story"
            onPress={() => navigation.navigate('StoryExperience')}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  bgAccent: {
    position: 'absolute', top: 0, right: 0,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(201,168,76,0.04)',
  },
  header: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 24, gap: 10 },
  back: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, letterSpacing: 1, marginBottom: 8 },
  headerSub: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 4 },
  headerTitle: {
    color: Colors.text, fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontSerif, lineHeight: 28,
  },
  headerLine: { width: 40, height: 2, backgroundColor: Colors.gold },

  scroll: { paddingHorizontal: 24, paddingTop: 4 },

  card: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCard, padding: 18, marginBottom: 14,
    overflow: 'hidden', position: 'relative',
  },
  cardSelected: { borderColor: Colors.gold },
  selectedBar: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
    backgroundColor: Colors.gold,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(201,168,76,0.1)', alignItems: 'center', justifyContent: 'center',
  },
  modeIcon: { fontSize: 22 },
  cardTitles: { flex: 1 },
  modeSubtitle: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 2 },
  modeTitle: {
    color: Colors.text, fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontSerif,
  },
  badge: {
    backgroundColor: 'rgba(201,168,76,0.15)', borderRadius: Radius.sm,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  badgeText: { color: Colors.gold, fontSize: 9, letterSpacing: 1, fontWeight: '700' },
  checkCircle: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  checkText: { color: Colors.background, fontSize: 12, fontWeight: '700' },
  modeDesc: {
    color: Colors.textSecondary, fontSize: Typography.sizes.sm, lineHeight: 20,
    paddingLeft: 62,
  },

  optionsSection: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCard, padding: 18, marginTop: 4, marginBottom: 20, gap: 16,
  },
  optionsTitle: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 3 },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  optionIcon: { fontSize: 18, width: 28 },
  optionLabel: { color: Colors.text, fontSize: Typography.sizes.md, flex: 1 },
  toggle: {
    width: 44, height: 24, borderRadius: 12,
    backgroundColor: Colors.gold, justifyContent: 'center', paddingHorizontal: 3,
  },
  toggleThumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.background, alignSelf: 'flex-end' },

  cta: { marginBottom: 8 },
});
