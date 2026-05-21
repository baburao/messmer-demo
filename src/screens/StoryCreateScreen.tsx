import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Modal, Platform, StatusBar, KeyboardAvoidingView,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';

// ─── Genre suggestions ────────────────────────────────────────────────────
const SUGGESTIONS = [
  { id: 'dark-fantasy', icon: '🌑', label: 'Dark Fantasy',  sub: 'Shadows, sorcery and ancient power',      genre: 'Dark Fantasy' },
  { id: 'mythology',    icon: '⚡', label: 'Mythology',      sub: 'Gods, heroes and forgotten epics',        genre: 'Mythology'    },
  { id: 'sci-fi',       icon: '🚀', label: 'Sci-Fi',         sub: 'Future worlds and first contact',         genre: 'Sci-Fi'       },
  { id: 'noir',         icon: '🕵️', label: 'Noir',           sub: 'Rain-soaked streets and dark secrets',    genre: 'Noir'         },
  { id: 'historical',   icon: '🏛️', label: 'Historical',     sub: 'Lost civilisations and turning points',   genre: 'Historical'   },
  { id: 'romance',      icon: '🌹', label: 'Romance',         sub: 'Love found in the most unlikely places',  genre: 'Romance'      },
  { id: 'horror',       icon: '💀', label: 'Horror',         sub: 'What lurks beyond the light',             genre: 'Horror'       },
  { id: 'thriller',     icon: '⚔️', label: 'Thriller',       sub: 'Tension, stakes and no way out',          genre: 'Thriller'     },
];

const FORMATS = [
  { id: 'read',  icon: '◎', label: 'READ',  sub: 'Written story' },
  { id: 'watch', icon: '▶', label: 'WATCH', sub: 'Visual narrative' },
];
const LENGTHS = ['Short', 'Medium', 'Epic'];
const TONES   = ['Gritty', 'Poetic', 'Cinematic', 'Mysterious', 'Dreamlike', 'Raw'];

// ─── Options sheet ────────────────────────────────────────────────────────
function OptionsSheet({ visible, onClose, format, setFormat, length, setLength, tone, setTone }: any) {
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={opt.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={opt.sheet}>
        <View style={opt.handle} />
        <Text style={opt.sheetTitle}>STORY OPTIONS</Text>

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

        <Text style={opt.sectionLabel}>TONE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={opt.chipRow}>
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

        <TouchableOpacity style={opt.doneBtn} onPress={onClose} activeOpacity={0.85}>
          <Text style={opt.doneBtnText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const opt = StyleSheet.create({
  backdrop:      { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet:         { backgroundColor: '#141210', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderTopWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.md, paddingBottom: 36 },
  handle:        { width: 36, height: 4, borderRadius: 2, backgroundColor: Colors.border, alignSelf: 'center', marginTop: 12, marginBottom: 16 },
  sheetTitle:    { fontSize: Typography.sizes.xs, color: Colors.gold, letterSpacing: 3, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  sectionLabel:  { fontSize: Typography.sizes.xs, color: Colors.textMuted, letterSpacing: 2, fontWeight: '600', marginBottom: Spacing.sm, marginTop: Spacing.md },
  row:           { flexDirection: 'row', gap: Spacing.sm },
  formatCard:    { flex: 1, paddingVertical: 16, borderRadius: Radius.md, alignItems: 'center', gap: 4, backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border },
  formatCardSel: { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.08)' },
  formatIcon:    { fontSize: 22, color: Colors.textMuted },
  formatIconSel: { color: Colors.gold },
  formatLabel:   { fontSize: Typography.sizes.sm, color: Colors.textMuted, fontWeight: '700', letterSpacing: 2 },
  formatLabelSel:{ color: Colors.gold },
  formatSub:     { fontSize: Typography.sizes.xs, color: Colors.textMuted },
  chipRow:       { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  chip:          { paddingHorizontal: 16, paddingVertical: 9, borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface },
  chipSel:       { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.12)' },
  chipText:      { fontSize: Typography.sizes.sm, color: Colors.textSecondary, fontWeight: '600' },
  chipTextSel:   { color: Colors.gold },
  doneBtn:       { marginTop: 24, backgroundColor: Colors.gold, borderRadius: Radius.md, paddingVertical: 14, alignItems: 'center' },
  doneBtnText:   { fontSize: Typography.sizes.sm, color: Colors.background, fontWeight: '700', letterSpacing: 2.5 },
});

// ─── End Story sheet ──────────────────────────────────────────────────────
function EndStorySheet({
  visible, onClose, onAction,
}: { visible: boolean; onClose: () => void; onAction: (a: string) => void }) {
  const OPTIONS = [
    { id: 'profile', icon: '★', label: 'Save to My Profile', color: Colors.gold    },
    { id: 'draft',   icon: '◈', label: 'Save as Draft',      color: Colors.textSecondary },
    { id: 'new',     icon: '✦', label: 'Start New Story',    color: Colors.textSecondary },
    { id: 'home',    icon: '⌂', label: 'Go Home',            color: Colors.textSecondary },
    { id: 'discard', icon: '✕', label: 'Discard',            color: '#E05C5C'       },
  ];
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={es.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={es.sheet}>
        <View style={es.handle} />
        <Text style={es.title}>END STORY</Text>
        <Text style={es.sub}>What would you like to do?</Text>
        {OPTIONS.map((o, i) => (
          <TouchableOpacity
            key={o.id}
            style={[es.row, i < OPTIONS.length - 1 && es.rowBorder]}
            onPress={() => { onAction(o.id); onClose(); }}
            activeOpacity={0.75}
          >
            <Text style={[es.oIcon, { color: o.color }]}>{o.icon}</Text>
            <Text style={[es.oLabel, o.id === 'discard' && es.oDiscard]}>{o.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}

const es = StyleSheet.create({
  backdrop:  { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  sheet:     { backgroundColor: '#141210', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderTopWidth: 1, borderColor: Colors.border, paddingHorizontal: 20, paddingBottom: 44 },
  handle:    { width: 36, height: 4, borderRadius: 2, backgroundColor: Colors.border, alignSelf: 'center', marginTop: 12, marginBottom: 16 },
  title:     { fontSize: Typography.sizes.xs, color: Colors.gold, letterSpacing: 3, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  sub:       { fontSize: Typography.sizes.sm, color: Colors.textMuted, textAlign: 'center', marginBottom: 20 },
  row:       { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  oIcon:     { fontSize: 18, width: 28, textAlign: 'center' },
  oLabel:    { fontSize: 16, color: Colors.text, fontWeight: '500' },
  oDiscard:  { color: '#E05C5C' },
});

// ─── Main Screen ──────────────────────────────────────────────────────────
export default function StoryCreateScreen({ navigation }: any) {
  const [createMode,   setCreateMode]   = useState<'story' | 'video' | null>(null);
  const [prompt,       setPrompt]       = useState('');
  const [format,       setFormat]       = useState<'read' | 'watch'>('read');
  const [length,       setLength]       = useState<string>('Short');
  const [tone,         setTone]         = useState<string>('Cinematic');
  const [sheetVisible, setSheetVisible] = useState(false);
  const [endVisible,   setEndVisible]   = useState(false);
  const inputRef = useRef<any>(null);

  const handleSuggestion = (s: typeof SUGGESTIONS[0]) => {
    setPrompt(s.label);
    inputRef.current?.focus();
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    const matched = SUGGESTIONS.find(s =>
      prompt.toLowerCase().includes(s.label.toLowerCase())
    );
    navigation.navigate('StoryResult', {
      genre:       matched?.genre ?? prompt.trim(),
      format:      createMode === 'video' ? 'watch' : format,
      length,
      tone,
      protagonist: '',
    });
  };

  const handleEndAction = (action: string) => {
    switch (action) {
      case 'profile':
      case 'draft':
        navigation.navigate('Home');
        break;
      case 'new':
        setCreateMode(null);
        setPrompt('');
        break;
      case 'home':
        navigation.navigate('Home');
        break;
      case 'discard':
        setPrompt('');
        setCreateMode(null);
        break;
    }
  };

  const canGenerate = prompt.trim().length > 0;
  const isVideo     = createMode === 'video';

  // ── Mode selection ──────────────────────────────────────────────────────
  if (createMode === null) {
    return (
      <View style={s.root}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={s.header as any}>
          <TouchableOpacity style={s.navBtn} onPress={() => navigation.navigate('Home')} activeOpacity={0.7}>
            <Text style={s.navBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={s.headerTitle}>CREATE</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={s.modeScroll} showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View style={s.modeHero}>
            <Text style={s.modeHeroIcon}>✦</Text>
            <Text style={s.modeHeroTitle}>What will you{'\n'}create today?</Text>
            <Text style={s.modeHeroSub}>Choose your creation format to begin</Text>
          </View>

          {/* Write a Story card */}
          <TouchableOpacity
            style={[s.modeCard, s.modeCardStory]}
            onPress={() => setCreateMode('story')}
            activeOpacity={0.85}
          >
            <View style={s.modeCardTop}>
              <View style={s.modeCardIconWrap}>
                <Text style={s.modeCardIconStory}>✍</Text>
              </View>
              <Text style={s.modeCardArrow}>›</Text>
            </View>
            <Text style={s.modeCardLabel}>WRITE A STORY</Text>
            <Text style={s.modeCardSub}>
              Craft a text-based narrative with genres, tone, and your imagination
            </Text>
          </TouchableOpacity>

          {/* Create a Video card */}
          <TouchableOpacity
            style={[s.modeCard, s.modeCardVideo]}
            onPress={() => setCreateMode('video')}
            activeOpacity={0.85}
          >
            <View style={s.modeCardTop}>
              <View style={[s.modeCardIconWrap, s.modeCardIconWrapVideo]}>
                <Text style={s.modeCardIconVideo}>▶</Text>
              </View>
              <Text style={s.modeCardArrow}>›</Text>
            </View>
            <Text style={[s.modeCardLabel, s.modeCardLabelVideo]}>CREATE A VIDEO</Text>
            <Text style={s.modeCardSub}>
              Generate a cinematic visual story experience
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // ── Create flow ─────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={s.header as any}>
        <TouchableOpacity style={s.navBtn} onPress={() => setCreateMode(null)} activeOpacity={0.7}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>{isVideo ? 'CREATE VIDEO' : 'WRITE A STORY'}</Text>
        <TouchableOpacity style={s.endBtn} onPress={() => setEndVisible(true)} activeOpacity={0.7}>
          <Text style={s.endBtnText}>END</Text>
        </TouchableOpacity>
      </View>

      {/* Format / length pill — story only */}
      {!isVideo && (
        <View style={s.pillRow as any}>
          <TouchableOpacity style={s.optBtn} onPress={() => setSheetVisible(true)} activeOpacity={0.7}>
            <Text style={s.optBtnText}>{format === 'watch' ? '▶' : '◎'}{'  '}{length}</Text>
            <Text style={s.optChevron}>⌄</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Suggestions */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.emptyHeader}>
          <Text style={s.emptyIcon}>{isVideo ? '▶' : '✦'}</Text>
          <Text style={s.emptyTitle}>
            {isVideo ? 'What story shall\nwe visualise?' : 'What story shall\nwe craft today?'}
          </Text>
          <Text style={s.emptySub}>
            {isVideo
              ? 'Choose a genre or describe your video idea'
              : 'Choose a genre or describe your idea below'}
          </Text>
        </View>

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

      {/* Input bar */}
      <View style={s.inputBar as any}>
        <TouchableOpacity
          style={s.addBtn}
          onPress={() => { if (!isVideo) setSheetVisible(true); }}
          activeOpacity={0.8}
        >
          <Text style={s.addBtnText}>＋</Text>
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          style={s.input as any}
          value={prompt}
          onChangeText={setPrompt}
          placeholder={isVideo ? 'Describe your video concept...' : 'Describe your story...'}
          placeholderTextColor={Colors.textMuted}
          multiline
          returnKeyType="default"
          maxLength={200}
        />

        <TouchableOpacity
          style={[s.sendBtn, canGenerate && s.sendBtnActive]}
          onPress={handleGenerate}
          disabled={!canGenerate}
          activeOpacity={0.85}
        >
          <Text style={[s.sendBtnText, canGenerate && s.sendBtnTextActive]}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Sheets */}
      <OptionsSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        format={format} setFormat={setFormat}
        length={length} setLength={setLength}
        tone={tone}     setTone={setTone}
      />
      <EndStorySheet
        visible={endVisible}
        onClose={() => setEndVisible(false)}
        onAction={handleEndAction}
      />
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 14 : 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(18px)', backgroundColor: 'rgba(10,10,10,0.85)' }
      : {}),
  },
  headerTitle: {
    fontSize: Typography.sizes.sm, color: Colors.text,
    letterSpacing: 3, fontWeight: '700',
  },
  navBtn:     { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  navBtnText: { fontSize: 18, color: Colors.textMuted },
  backArrow:  { fontSize: 22, color: Colors.gold },
  endBtn: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1, borderColor: 'rgba(224,92,92,0.5)',
    backgroundColor: 'rgba(224,92,92,0.08)',
  },
  endBtnText: { fontSize: Typography.sizes.xs, color: '#E05C5C', letterSpacing: 1.5, fontWeight: '700' },

  // ── Mode selection ──────────────────────────────────────────────────────
  modeScroll: { paddingBottom: 36 },
  modeHero: {
    alignItems: 'center', paddingHorizontal: 24,
    paddingTop: 40, paddingBottom: 32, gap: 8,
  },
  modeHeroIcon:  { fontSize: 32, color: Colors.gold, marginBottom: 4 },
  modeHeroTitle: {
    fontSize: Typography.sizes.xxl, fontFamily: Typography.fontSerif,
    color: Colors.text, textAlign: 'center', lineHeight: 36,
  },
  modeHeroSub: {
    fontSize: Typography.sizes.sm, color: Colors.textMuted,
    textAlign: 'center', letterSpacing: 0.3,
  },

  modeCard: {
    marginHorizontal: 20, marginBottom: 14,
    borderRadius: Radius.lg, borderWidth: 1.5,
    padding: 22,
  },
  modeCardStory: {
    borderColor: 'rgba(201,168,76,0.35)',
    backgroundColor: 'rgba(201,168,76,0.05)',
  },
  modeCardVideo: {
    borderColor: 'rgba(80,120,255,0.35)',
    backgroundColor: 'rgba(80,120,255,0.05)',
  },
  modeCardTop: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 12,
  },
  modeCardIconWrap: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: 'rgba(201,168,76,0.12)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  modeCardIconWrapVideo: {
    backgroundColor: 'rgba(80,120,255,0.12)',
    borderColor: 'rgba(80,120,255,0.4)',
  },
  modeCardIconStory: { fontSize: 22, color: Colors.gold },
  modeCardIconVideo: { fontSize: 18, color: '#5078FF' },
  modeCardArrow:     { fontSize: 24, color: Colors.textMuted },
  modeCardLabel: {
    fontSize: Typography.sizes.sm, color: Colors.gold,
    fontWeight: '700', letterSpacing: 2, marginBottom: 6,
  },
  modeCardLabelVideo: { color: '#5078FF' },
  modeCardSub: {
    fontSize: Typography.sizes.sm, color: Colors.textMuted, lineHeight: 20,
  },

  // ── Options pill row ────────────────────────────────────────────────────
  pillRow: {
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    flexDirection: 'row',
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(18px)', backgroundColor: 'rgba(10,10,10,0.85)' }
      : {}),
  },
  optBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  optBtnText:  { fontSize: Typography.sizes.xs, color: Colors.gold, fontWeight: '600', letterSpacing: 1 },
  optChevron:  { fontSize: 14, color: Colors.textMuted },

  // ── Suggestions ─────────────────────────────────────────────────────────
  scroll:        { flex: 1 },
  scrollContent: { paddingTop: 32, paddingBottom: 8 },
  emptyHeader: {
    alignItems: 'center', paddingHorizontal: 24,
    paddingBottom: 36, gap: 8,
  },
  emptyIcon:  { fontSize: 32, color: Colors.gold, marginBottom: 4 },
  emptyTitle: {
    fontSize: Typography.sizes.xxl, fontFamily: Typography.fontSerif,
    color: Colors.text, textAlign: 'center', lineHeight: 36,
  },
  emptySub: {
    fontSize: Typography.sizes.sm, color: Colors.textMuted,
    textAlign: 'center', letterSpacing: 0.3,
  },

  suggRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 14,
  },
  suggRowLast: { borderBottomWidth: 0 },
  suggIconWrap: {
    width: 44, height: 44, borderRadius: Radius.md,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  suggIcon:  { fontSize: 20 },
  suggText:  { flex: 1, gap: 2 },
  suggLabel: { fontSize: Typography.sizes.md, color: Colors.text, fontWeight: '600' },
  suggSub:   { fontSize: Typography.sizes.sm, color: Colors.textMuted },
  suggArrow: { fontSize: 20, color: Colors.border },

  // ── Input bar ────────────────────────────────────────────────────────────
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: 12, paddingVertical: 10,
    borderTopWidth: 1, borderTopColor: Colors.border,
    backgroundColor: Colors.background, gap: 8,
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(18px)', backgroundColor: 'rgba(10,10,10,0.9)' }
      : {}),
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
  sendBtn:          { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  sendBtnActive:    { backgroundColor: Colors.gold, borderColor: Colors.gold },
  sendBtnText:      { fontSize: 18, color: Colors.textMuted, fontWeight: '700' },
  sendBtnTextActive:{ color: Colors.background },
});
