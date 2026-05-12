import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  ImageBackground, TextInput, Animated, Platform, StatusBar, Dimensions,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');
const CARD_W = (width - Spacing.md * 2 - Spacing.sm) / 2;

// ─── Data ─────────────────────────────────────────────────────────────────
const GENRES = [
  { id: 'dark-fantasy', label: 'Dark Fantasy',  emoji: '🌑', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80' },
  { id: 'mythology',    label: 'Mythology',      emoji: '⚡', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80' },
  { id: 'sci-fi',       label: 'Sci-Fi',         emoji: '🚀', image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80' },
  { id: 'noir',         label: 'Noir',           emoji: '🕵️', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id: 'historical',   label: 'Historical',     emoji: '🏛️', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80' },
  { id: 'romance',      label: 'Romance',        emoji: '🌹', image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80' },
  { id: 'horror',       label: 'Horror',         emoji: '💀', image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80' },
  { id: 'thriller',     label: 'Thriller',       emoji: '⚔️', image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&q=80' },
];

const LENGTHS  = ['Short', 'Medium', 'Epic'];
const TONES    = ['Gritty', 'Poetic', 'Cinematic', 'Mysterious', 'Dreamlike', 'Raw'];
const ARCHETYPES = ['A Lone Wanderer', 'A Fallen Scholar', 'A Masked Oracle', 'An Exiled Queen'];

// ─── Step indicator ────────────────────────────────────────────────────────
function StepBar({ step, total }: { step: number; total: number }) {
  return (
    <View style={sb.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[sb.seg, i < step && sb.segActive]} />
      ))}
    </View>
  );
}
const sb = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4, paddingHorizontal: Spacing.md, paddingBottom: 12 },
  seg: { flex: 1, height: 2, borderRadius: 1, backgroundColor: Colors.border },
  segActive: { backgroundColor: Colors.gold },
});

// ─── Screen ────────────────────────────────────────────────────────────────
export default function StoryCreateScreen({ navigation }: any) {
  const [step, setStep] = useState(1);

  // Selections
  const [genre,       setGenre]       = useState<string | null>(null);
  const [format,      setFormat]      = useState<'read' | 'watch' | null>(null);
  const [length,      setLength]      = useState<string | null>(null);
  const [tone,        setTone]        = useState<string | null>(null);
  const [protagonist, setProtagonist] = useState('');

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const transition = (next: number) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setStep(next), 150);
  };

  const goNext = () => transition(step + 1);
  const goBack = () => {
    if (step === 1) navigation.goBack();
    else transition(step - 1);
  };

  const canContinueStep1 = !!genre;
  const canContinueStep2 = !!format && !!length && !!tone;

  const handleGenerate = () => {
    const selectedGenre = GENRES.find(g => g.id === genre);
    navigation.navigate('StoryResult', {
      genre:       selectedGenre?.label ?? genre,
      genreImage:  selectedGenre?.image ?? '',
      format,
      length,
      tone,
      protagonist: protagonist.trim(),
    });
  };

  // ─── Step titles ─────────────────────────────────────────────────────────
  const STEP_TITLES = ['', 'CHOOSE YOUR GENRE', 'SHAPE YOUR STORY', 'YOUR PROTAGONIST'];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={s.header as any}>
        <TouchableOpacity style={s.backBtn} onPress={goBack} activeOpacity={0.7}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>{STEP_TITLES[step]}</Text>
        <View style={s.backBtn} />
      </View>

      {/* Step bar */}
      <StepBar step={step} total={3} />

      {/* Animated body */}
      <Animated.View style={[s.body, { opacity: fadeAnim }]}>

        {/* ── STEP 1: Genre ───────────────────────────────────── */}
        {step === 1 && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
            <Text style={s.subLabel}>SELECT A REALM TO ENTER</Text>
            <View style={s.grid}>
              {GENRES.map(g => {
                const sel = genre === g.id;
                return (
                  <TouchableOpacity
                    key={g.id}
                    style={[s.genreCard, sel && s.genreCardSel]}
                    onPress={() => setGenre(g.id)}
                    activeOpacity={0.85}
                  >
                    <ImageBackground
                      source={{ uri: g.image }}
                      style={s.genreImg}
                      imageStyle={{ borderRadius: Radius.md }}
                      resizeMode="cover"
                    >
                      <View style={s.genreOverlay} />
                      <Text style={s.genreEmoji}>{g.emoji}</Text>
                      <Text style={s.genreLabel}>{g.label}</Text>
                      {sel && (
                        <View style={s.checkBadge}>
                          <Text style={s.checkIcon}>✓</Text>
                        </View>
                      )}
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{ height: 120 }} />
          </ScrollView>
        )}

        {/* ── STEP 2: Shape ───────────────────────────────────── */}
        {step === 2 && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

            {/* Format */}
            <Text style={s.sectionLabel}>FORMAT</Text>
            <View style={s.formatRow}>
              {(['read', 'watch'] as const).map(f => {
                const sel = format === f;
                return (
                  <TouchableOpacity
                    key={f}
                    style={[s.formatCard, sel && s.formatCardSel]}
                    onPress={() => setFormat(f)}
                    activeOpacity={0.85}
                  >
                    <Text style={[s.formatIcon, sel && s.formatIconSel]}>
                      {f === 'read' ? '◎' : '▶'}
                    </Text>
                    <Text style={[s.formatTitle, sel && s.formatTitleSel]}>
                      {f === 'read' ? 'READ' : 'WATCH'}
                    </Text>
                    <Text style={s.formatSub}>
                      {f === 'read' ? 'Written story' : 'Visual narrative'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Length */}
            <Text style={s.sectionLabel}>LENGTH</Text>
            <View style={s.chipRow}>
              {LENGTHS.map(l => {
                const sel = length === l;
                return (
                  <TouchableOpacity
                    key={l}
                    style={[s.chip, sel && s.chipSel]}
                    onPress={() => setLength(l)}
                    activeOpacity={0.8}
                  >
                    <Text style={[s.chipText, sel && s.chipTextSel]}>{l}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Tone */}
            <Text style={s.sectionLabel}>TONE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.toneRow}>
              {TONES.map(t => {
                const sel = tone === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[s.chip, sel && s.chipSel]}
                    onPress={() => setTone(t)}
                    activeOpacity={0.8}
                  >
                    <Text style={[s.chipText, sel && s.chipTextSel]}>{t}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={{ height: 120 }} />
          </ScrollView>
        )}

        {/* ── STEP 3: Protagonist ─────────────────────────────── */}
        {step === 3 && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}
            keyboardShouldPersistTaps="handled">
            <Text style={s.subLabel}>OPTIONAL — SKIP TO GENERATE</Text>

            <Text style={s.sectionLabel}>NAME YOUR HERO</Text>
            <View style={s.inputWrap}>
              <TextInput
                style={s.input as any}
                value={protagonist}
                onChangeText={setProtagonist}
                placeholder="Enter a name or archetype..."
                placeholderTextColor={Colors.textMuted}
                autoCapitalize="words"
                returnKeyType="done"
                maxLength={40}
              />
            </View>

            <Text style={s.sectionLabel}>POPULAR ARCHETYPES</Text>
            <View style={s.archetypeGrid}>
              {ARCHETYPES.map(a => (
                <TouchableOpacity
                  key={a}
                  style={[s.archetypeChip, protagonist === a && s.chipSel]}
                  onPress={() => setProtagonist(protagonist === a ? '' : a)}
                  activeOpacity={0.8}
                >
                  <Text style={[s.archetypeText, protagonist === a && s.chipTextSel]}>{a}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Summary card */}
            <View style={s.summaryCard}>
              <Text style={s.summaryTitle}>YOUR STORY</Text>
              {[
                { label: 'Genre',  value: GENRES.find(g => g.id === genre)?.label },
                { label: 'Format', value: format === 'read' ? '◎ READ' : '▶ WATCH' },
                { label: 'Length', value: length },
                { label: 'Tone',   value: tone },
                protagonist.trim()
                  ? { label: 'Hero', value: protagonist.trim() }
                  : null,
              ].filter(Boolean).map(row => (
                <View key={row!.label} style={s.summaryRow}>
                  <Text style={s.summaryLabel}>{row!.label}</Text>
                  <Text style={s.summaryValue}>{row!.value}</Text>
                </View>
              ))}
            </View>

            <View style={{ height: 120 }} />
          </ScrollView>
        )}

      </Animated.View>

      {/* Footer CTA */}
      <View style={s.footer}>
        {step < 3 ? (
          <TouchableOpacity
            style={[s.cta, !(step === 1 ? canContinueStep1 : canContinueStep2) && s.ctaDisabled]}
            onPress={goNext}
            disabled={step === 1 ? !canContinueStep1 : !canContinueStep2}
            activeOpacity={0.85}
          >
            <Text style={[s.ctaText, !(step === 1 ? canContinueStep1 : canContinueStep2) && s.ctaTextDisabled]}>
              CONTINUE →
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={s.cta} onPress={handleGenerate} activeOpacity={0.85}>
            <Text style={s.ctaText}>✦  GENERATE STORY</Text>
          </TouchableOpacity>
        )}
      </View>

      <BottomNav active="create" onNavigate={(sc) => navigation.navigate(sc)} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + Spacing.md : Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(18px)', backgroundColor: 'rgba(10,10,10,0.85)' } : {}),
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 22, color: Colors.gold },
  headerTitle: { fontSize: Typography.sizes.sm, color: Colors.text, letterSpacing: 3, fontWeight: '700' },

  body: { flex: 1 },
  scroll: { paddingHorizontal: Spacing.md, paddingTop: Spacing.lg },
  subLabel: {
    fontSize: Typography.sizes.xs, color: Colors.textMuted,
    letterSpacing: 2.5, fontWeight: '600', marginBottom: Spacing.md, textAlign: 'center',
  },
  sectionLabel: {
    fontSize: Typography.sizes.xs, color: Colors.gold,
    letterSpacing: 2.5, fontWeight: '700', marginBottom: Spacing.sm, marginTop: Spacing.md,
  },

  // Genre grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  genreCard: {
    width: CARD_W, height: 140, borderRadius: Radius.md,
    overflow: 'hidden', borderWidth: 2, borderColor: Colors.border,
  },
  genreCardSel: { borderColor: Colors.gold },
  genreImg: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  genreOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  genreEmoji: { fontSize: 28, marginBottom: 4 },
  genreLabel: {
    color: Colors.text, fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontSerif, fontWeight: '700',
    letterSpacing: 1, marginBottom: 12, textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute', top: 8, right: 8,
    width: 24, height: 24, borderRadius: Radius.full,
    backgroundColor: Colors.gold, alignItems: 'center', justifyContent: 'center',
  },
  checkIcon: { fontSize: 12, color: Colors.background, fontWeight: '700' },

  // Format
  formatRow: { flexDirection: 'row', gap: Spacing.sm },
  formatCard: {
    flex: 1, paddingVertical: 20, borderRadius: Radius.md,
    alignItems: 'center', gap: 6,
    backgroundColor: Colors.surface, borderWidth: 2, borderColor: Colors.border,
  },
  formatCardSel: { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.08)' },
  formatIcon: { fontSize: 26, color: Colors.textMuted },
  formatIconSel: { color: Colors.gold },
  formatTitle: { fontSize: Typography.sizes.sm, color: Colors.textMuted, fontWeight: '700', letterSpacing: 2 },
  formatTitleSel: { color: Colors.gold },
  formatSub: { fontSize: Typography.sizes.xs, color: Colors.textMuted, letterSpacing: 1 },

  // Chips
  chipRow: { flexDirection: 'row', gap: Spacing.sm },
  toneRow: { gap: Spacing.sm, paddingRight: Spacing.md },
  chip: {
    paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  chipSel: { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.12)' },
  chipText: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, fontWeight: '600' },
  chipTextSel: { color: Colors.gold },

  // Protagonist
  inputWrap: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: Colors.surface, paddingHorizontal: 14,
  },
  input: {
    height: 48, color: Colors.text, fontSize: Typography.sizes.md,
    outlineStyle: 'none',
  },
  archetypeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  archetypeChip: {
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  archetypeText: { fontSize: Typography.sizes.xs, color: Colors.textSecondary, letterSpacing: 0.5 },

  // Summary
  summaryCard: {
    marginTop: Spacing.lg, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.borderGold,
    backgroundColor: 'rgba(201,168,76,0.06)', padding: Spacing.md, gap: 10,
  },
  summaryTitle: {
    fontSize: Typography.sizes.xs, color: Colors.gold,
    letterSpacing: 3, fontWeight: '700', marginBottom: 4,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: Typography.sizes.xs, color: Colors.textMuted, letterSpacing: 1.5 },
  summaryValue: { fontSize: Typography.sizes.sm, color: Colors.text, fontWeight: '600' },

  // Footer
  footer: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 16 : Spacing.md,
    borderTopWidth: 1, borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  cta: {
    backgroundColor: Colors.gold, borderRadius: Radius.md,
    paddingVertical: 16, alignItems: 'center',
  },
  ctaDisabled: { backgroundColor: Colors.border },
  ctaText: { fontSize: Typography.sizes.sm, color: Colors.background, fontWeight: '700', letterSpacing: 2.5 },
  ctaTextDisabled: { color: Colors.textMuted },
});
