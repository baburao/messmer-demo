import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Modal, Animated, Platform, StatusBar, KeyboardAvoidingView,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import BottomNav from '../components/BottomNav';

// ─── Suggestion rows (ChatGPT-style) ──────────────────────────────────────
const SUGGESTIONS = [
  { id: 'dark-fantasy', icon: '🌑', label: 'Dark Fantasy',       sub: 'Shadows, sorcery and ancient power',      genre: 'Dark Fantasy' },
  { id: 'mythology',    icon: '⚡', label: 'Mythology',           sub: 'Gods, heroes and forgotten epics',        genre: 'Mythology'    },
  { id: 'sci-fi',       icon: '🚀', label: 'Sci-Fi',             sub: 'Future worlds and first contact',         genre: 'Sci-Fi'       },
  { id: 'noir',         icon: '🕵️', label: 'Noir',               sub: 'Rain-soaked streets and dark secrets',    genre: 'Noir'         },
  { id: 'historical',   icon: '🏛️', label: 'Historical',         sub: 'Lost civilisations and turning points',   genre: 'Historical'   },
  { id: 'romance',      icon: '🌹', label: 'Romance',             sub: 'Love found in the most unlikely places',  genre: 'Romance'      },
  { id: 'horror',       icon: '💀', label: 'Horror',             sub: 'What lurks beyond the light',             genre: 'Horror'       },
  { id: 'thriller',     icon: '⚔️', label: 'Thriller',           sub: 'Tension, stakes and no way out',          genre: 'Thriller'     },
];

const FORMATS = [
  { id: 'read',  icon: '◎', label: 'READ',  sub: 'Written story' },
  { id: 'watch', icon: '▶', label: 'WATCH', sub: 'Visual narrative' },
];
const LENGTHS = ['Short', 'Medium', 'Epic'];
const TONES   = ['Gritty', 'Poetic', 'Cinematic', 'Mysterious', 'Dreamlike', 'Raw'];

// ─── Options bottom sheet ─────────────────────────────────────────────────
function OptionsSheet({
  visible, onClose,
  format, setFormat,
  length, setLength,
  tone, setTone,
}: any) {
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={opt.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={opt.sheet}>
        <View style={opt.handle} />
        <Text style={opt.sheetTitle}>STORY OPTIONS</Text>

        {/* Format */}
        <Text style={opt.sectionLabel}>FORMAT</Text>
        <View style={opt.row}>
          {FORMATS.map(f => {
            const sel = format === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                style={[opt.formatCard, sel && opt.formatCardSel]}
                onPress={() => setFormat(f.id)}
                activeOpacity={0.8}
              >
                <Text style={[opt.formatIcon, sel && opt.formatIconSel]}>{f.icon}</Text>
                <Text style={[opt.formatLabel, sel && opt.formatLabelSel]}>{f.label}</Text>
                <Text style={opt.formatSub}>{f.sub}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Length */}
        <Text style={opt.sectionLabel}>LENGTH</Text>
        <View style={opt.chipRow}>
          {LENGTHS.map(l => {
            const sel = length === l;
            return (
              <TouchableOpacity
                key={l}
                style={[opt.chip, sel && opt.chipSel]}
                onPress={() => setLength(l)}
                activeOpacity={0.8}
              >
                <Text style={[opt.chipText, sel && opt.chipTextSel]}>{l}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tone */}
        <Text style={opt.sectionLabel}>TONE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={opt.chipRow}>
          {TONES.map(t => {
            const sel = tone === t;
            return (
              <TouchableOpacity
                key={t}
                style={[opt.chip, sel && opt.chipSel]}
                onPress={() => setTone(t)}
                activeOpacity={0.8}
              >
                <Text style={[opt.chipText, sel && opt.chipTextSel]}>{t}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Done */}
        <TouchableOpacity style={opt.doneBtn} onPress={onClose} activeOpacity={0.85}>
          <Text style={opt.doneBtnText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const opt = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    backgroundColor: '#141210',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    borderTopWidth: 1, borderColor: Colors.border,
    paddingHorizontal: Spacing.md, paddingBottom: 36,
  },
  handle: {
    width: 36, height: 4, borderRadius: 2,
    backgroundColor: Colors.border, alignSelf: 'center',
    marginTop: 12, marginBottom: 16,
  },
  sheetTitle: {
    fontSize: Typography.sizes.xs, color: Colors.gold,
    letterSpacing: 3, fontWeight: '700', textAlign: 'center', marginBottom: 20,
  },
  sectionLabel: {
    fontSize: Typography.sizes.xs, color: Colors.textMuted,
    letterSpacing: 2, fontWeight: '600', marginBottom: Spacing.sm, marginTop: Spacing.md,
  },
  row: { flexDirection: 'row', gap: Spacing.sm },
  formatCard: {
    flex: 1, paddingVertical: 16, borderRadius: Radius.md,
    alignItems: 'center', gap: 4,
    backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border,
  },
  formatCardSel: { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.08)' },
  formatIcon: { fontSize: 22, color: Colors.textMuted },
  formatIconSel: { color: Colors.gold },
  formatLabel: { fontSize: Typography.sizes.sm, color: Colors.textMuted, fontWeight: '700', letterSpacing: 2 },
  formatLabelSel: { color: Colors.gold },
  formatSub: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
  chipRow: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 16, paddingVertical: 9, borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface,
  },
  chipSel: { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.12)' },
  chipText: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, fontWeight: '600' },
  chipTextSel: { color: Colors.gold },
  doneBtn: {
    marginTop: 24, backgroundColor: Colors.gold,
    borderRadius: Radius.md, paddingVertical: 14, alignItems: 'center',
  },
  doneBtnText: { fontSize: Typography.sizes.sm, color: Colors.background, fontWeight: '700', letterSpacing: 2.5 },
});

// ─── Main Screen ───────────────────────────────────────────────────────────
export default function StoryCreateScreen({ navigation }: any) {
  const [prompt,       setPrompt]       = useState('');
  const [format,       setFormat]       = useState<'read' | 'watch'>('read');
  const [length,       setLength]       = useState<string>('Short');
  const [tone,         setTone]         = useState<string>('Cinematic');
  const [sheetVisible, setSheetVisible] = useState(false);
  const inputRef = useRef<any>(null);

  const handleSuggestion = (s: typeof SUGGESTIONS[0]) => {
    setPrompt(s.label);
    inputRef.current?.focus();
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    // Map free-text prompt to genre for mock story lookup
    const matched = SUGGESTIONS.find(s =>
      prompt.toLowerCase().includes(s.label.toLowerCase())
    );
    navigation.navigate('StoryResult', {
      genre:  matched?.genre ?? prompt.trim(),
      format,
      length,
      tone,
      protagonist: '',
    });
  };

  const canGenerate = prompt.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />

      {/* ── Header ─────────────────────────────────────────── */}
      <View style={s.header as any}>
        <Text style={s.headerTitle}>CREATE</Text>
        <TouchableOpacity style={s.optBtn} onPress={() => setSheetVisible(true)} activeOpacity={0.7}>
          <Text style={s.optBtnText}>
            {format === 'watch' ? '▶' : '◎'}{'  '}{length}
          </Text>
          <Text style={s.optChevron}>⌄</Text>
        </TouchableOpacity>
      </View>

      {/* ── Suggestions list ────────────────────────────────── */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Empty state header */}
        <View style={s.emptyHeader}>
          <Text style={s.emptyIcon}>✦</Text>
          <Text style={s.emptyTitle}>What story shall{'\n'}we craft today?</Text>
          <Text style={s.emptySub}>Choose a genre or describe your idea below</Text>
        </View>

        {/* Suggestion rows */}
        {SUGGESTIONS.map((item, idx) => (
          <TouchableOpacity
            key={item.id}
            style={[s.suggRow, idx === SUGGESTIONS.length - 1 && s.suggRowLast]}
            onPress={() => handleSuggestion(item)}
            activeOpacity={0.7}
          >
            <View style={s.suggIconWrap}>
              <Text style={s.suggIcon}>{item.icon}</Text>
            </View>
            <View style={s.suggText}>
              <Text style={s.suggLabel}>{item.label}</Text>
              <Text style={s.suggSub}>{item.sub}</Text>
            </View>
            <Text style={s.suggArrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* ── Input bar ───────────────────────────────────────── */}
      <View style={s.inputBar as any}>
        {/* + Options button */}
        <TouchableOpacity style={s.addBtn} onPress={() => setSheetVisible(true)} activeOpacity={0.8}>
          <Text style={s.addBtnText}>＋</Text>
        </TouchableOpacity>

        {/* Text input */}
        <TextInput
          ref={inputRef}
          style={s.input as any}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Describe your story..."
          placeholderTextColor={Colors.textMuted}
          multiline
          returnKeyType="default"
          maxLength={200}
        />

        {/* Generate button */}
        <TouchableOpacity
          style={[s.sendBtn, canGenerate && s.sendBtnActive]}
          onPress={handleGenerate}
          disabled={!canGenerate}
          activeOpacity={0.85}
        >
          <Text style={[s.sendBtnText, canGenerate && s.sendBtnTextActive]}>→</Text>
        </TouchableOpacity>
      </View>

      {/* ── Bottom Nav ──────────────────────────────────────── */}
      <BottomNav active="create" onNavigate={(sc) => navigation.navigate(sc)} />

      {/* ── Options sheet ───────────────────────────────────── */}
      <OptionsSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        format={format} setFormat={setFormat}
        length={length} setLength={setLength}
        tone={tone}     setTone={setTone}
      />
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: 14,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 14 : 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(18px)', backgroundColor: 'rgba(10,10,10,0.85)' } : {}),
  },
  headerTitle: {
    fontSize: Typography.sizes.sm, color: Colors.text,
    letterSpacing: 3, fontWeight: '700',
  },
  optBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  optBtnText: { fontSize: Typography.sizes.xs, color: Colors.gold, fontWeight: '600', letterSpacing: 1 },
  optChevron: { fontSize: 14, color: Colors.textMuted },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 32, paddingBottom: 8 },

  // Empty state header
  emptyHeader: {
    alignItems: 'center', paddingHorizontal: Spacing.md,
    paddingBottom: 36, gap: 8,
  },
  emptyIcon: { fontSize: 32, color: Colors.gold, marginBottom: 4 },
  emptyTitle: {
    fontSize: Typography.sizes.xxl, fontFamily: Typography.fontSerif,
    color: Colors.text, textAlign: 'center', lineHeight: 36,
  },
  emptySub: {
    fontSize: Typography.sizes.sm, color: Colors.textMuted,
    textAlign: 'center', letterSpacing: 0.3,
  },

  // Suggestion rows
  suggRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    gap: 14,
  },
  suggRowLast: { borderBottomWidth: 0 },
  suggIconWrap: {
    width: 44, height: 44, borderRadius: Radius.md,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  suggIcon: { fontSize: 20 },
  suggText: { flex: 1, gap: 2 },
  suggLabel: {
    fontSize: Typography.sizes.md, color: Colors.text,
    fontWeight: '600',
  },
  suggSub: {
    fontSize: Typography.sizes.sm, color: Colors.textMuted,
  },
  suggArrow: { fontSize: 20, color: Colors.border },

  // Input bar
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: 12, paddingVertical: 10,
    borderTopWidth: 1, borderTopColor: Colors.border,
    backgroundColor: Colors.background, gap: 8,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(18px)', backgroundColor: 'rgba(10,10,10,0.9)' } : {}),
  },
  addBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { fontSize: 20, color: Colors.textSecondary, lineHeight: 24 },
  input: {
    flex: 1,
    minHeight: 38, maxHeight: 100,
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border,
    color: Colors.text, fontSize: Typography.sizes.md,
    outlineStyle: 'none',
  },
  sendBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnActive: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  sendBtnText: { fontSize: 18, color: Colors.textMuted, fontWeight: '700' },
  sendBtnTextActive: { color: Colors.background },
});
