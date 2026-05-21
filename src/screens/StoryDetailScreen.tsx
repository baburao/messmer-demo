import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, Modal, Platform, StatusBar, useWindowDimensions,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import { HugeiconsIcon } from '@hugeicons/react';
import { Share02Icon } from '@hugeicons/core-free-icons';

// ─── Quest data ────────────────────────────────────────────────────────────
type Quest = {
  id: string; number: string; title: string; desc: string;
  image: string; rating: string;
};

const STORY_QUESTS: Record<string, Quest[]> = {
  default: [
    {
      id: 'q1', number: '01', rating: '4.8',
      title: 'The First Crossing',
      desc: 'You arrive at the edge of the forgotten district. A stranger offers you a lantern. Do you trust them?',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    },
    {
      id: 'q2', number: '02', rating: '4.6',
      title: 'Mirrors & Shadows',
      desc: 'Deep inside the labyrinth, the walls reflect choices you never made. A door appears where none existed.',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    },
    {
      id: 'q3', number: '03', rating: '4.9',
      title: "The Cartographer's Secret",
      desc: 'The map reveals a hidden chamber beneath the city. What you find there will change everything.',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
    },
    {
      id: 'q4', number: '04', rating: '4.7',
      title: 'Echoes of the Fallen',
      desc: 'The memories of those who came before guide your next step — or mislead you entirely.',
      image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
    },
  ],
};

// ─── Share sheet ──────────────────────────────────────────────────────────
function ShareSheet({ onClose }: { onClose: () => void }) {
  const OPTS = [
    { id: 'o1', icon: '🔗', label: 'Copy Link' },
    { id: 'o2', icon: '🔖', label: 'Save Story' },
    { id: 'o3', icon: '📚', label: 'Add to Reading List' },
  ];
  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={ss.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={ss.sheet}>
        <View style={ss.handle} />
        {OPTS.map((o, i) => (
          <TouchableOpacity
            key={o.id}
            style={[ss.row, i < OPTS.length - 1 && ss.rowBorder]}
            onPress={onClose}
          >
            <Text style={ss.optIcon}>{o.icon}</Text>
            <Text style={ss.optLabel}>{o.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={ss.done} onPress={onClose}>
          <Text style={ss.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────
export default function StoryDetailScreen({ navigation, route }: any) {
  const story      = route?.params?.story;
  const fromCreate = route?.params?.fromCreate === true;
  const choices    = route?.params?.choices ?? [];

  const { width: W, height: H } = useWindowDimensions();

  // Layout constants
  const BANNER_H  = Math.round(H * 0.28);   // compact story header ~28% screen
  const CARD_H    = Math.round(H * 0.75);   // each quest card = 75% of screen
  const CARD_GAP  = 10;

  const [likedIds,   setLikedIds]   = useState<Set<string>>(new Set());
  const [shareOpen,  setShareOpen]  = useState(false);

  const image    = story?.image    || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80';
  const title    = story?.title    || 'The Architecture of Silent Echoes';
  const desc     = story?.desc     || 'A labyrinthine journey through memory and forgotten spaces.';
  const category = story?.category || 'FICTION / DARK';

  const quests: Quest[] = STORY_QUESTS[story?.id] || STORY_QUESTS.default;

  // Snap to: 0 (banner view), then one offset per quest card
  const snapOffsets = useMemo(() => {
    const arr: number[] = [0];
    for (let i = 0; i < quests.length; i++) {
      arr.push(BANNER_H + i * (CARD_H + CARD_GAP));
    }
    return arr;
  }, [BANNER_H, CARD_H, CARD_GAP, quests.length]);

  const toggleLike = (id: string) =>
    setLikedIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <View style={[s.root, { width: W }]}>
      <StatusBar barStyle="light-content" />

      {/* ── Floating back button — always visible ── */}
      <TouchableOpacity
        style={s.backBtn as any}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={s.backIcon}>←</Text>
      </TouchableOpacity>

      <ScrollView
        style={s.scroll}
        showsVerticalScrollIndicator={false}
        snapToOffsets={snapOffsets}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {/* ── Story Banner ────────────────────────────────────── */}
        <View style={[s.banner, { height: BANNER_H }]}>
          <Image source={{ uri: image }} style={s.bannerImg} resizeMode="cover" />
          <View style={s.bannerOverlay} />
          <View style={s.bannerContent}>
            <Text style={s.bannerCategory}>{category}</Text>
            <Text style={s.bannerTitle} numberOfLines={2}>{title}</Text>
            <Text style={s.bannerDesc} numberOfLines={2}>{desc}</Text>
            <View style={s.bannerRow}>
              <View style={s.typeBadge}>
                <Text style={s.typeBadgeText}>◎  READ</Text>
              </View>
              <Text style={s.questCountText}>{quests.length} QUESTS</Text>
            </View>
          </View>
        </View>

        {/* ── Quest Cards — Shorts style ───────────────────────── */}
        {quests.map((quest, idx) => {
          const isLiked = likedIds.has(quest.id);
          return (
            <View
              key={quest.id}
              style={[
                s.card,
                {
                  height: CARD_H,
                  width: W,
                  marginTop: idx === 0 ? 0 : CARD_GAP,
                },
              ]}
            >
              {/* Full-bleed background image */}
              <Image source={{ uri: quest.image }} style={s.cardImg} resizeMode="cover" />

              {/* Top cinematic vignette */}
              <View style={s.cardFadeTop} />
              {/* Bottom cinematic vignette */}
              <View style={s.cardFadeBottom} />

              {/* Quest number badge — top left */}
              <View style={s.questBadge}>
                <Text style={s.questBadgeText}>QUEST {quest.number}</Text>
              </View>

              {/* ── Right-side action column (YouTube Shorts style) ── */}
              <View style={s.sideBar}>
                {/* Like */}
                <TouchableOpacity
                  style={s.sideItem}
                  onPress={() => toggleLike(quest.id)}
                  activeOpacity={0.8}
                >
                  <View style={[s.sideCircle, isLiked && s.sideCircleActive]}>
                    <Text style={[s.sideIconText, isLiked && s.sideIconGold]}>
                      {isLiked ? '♥' : '♡'}
                    </Text>
                  </View>
                  <Text style={[s.sideLabel, isLiked && s.sideLabelGold]}>
                    {isLiked ? 'Liked' : 'Like'}
                  </Text>
                </TouchableOpacity>

                {/* Share */}
                <TouchableOpacity
                  style={s.sideItem}
                  onPress={() => setShareOpen(true)}
                  activeOpacity={0.8}
                >
                  <View style={s.sideCircle}>
                    <HugeiconsIcon icon={Share02Icon} size={20} color={Colors.text} />
                  </View>
                  <Text style={s.sideLabel}>Share</Text>
                </TouchableOpacity>

                {/* Rating */}
                <View style={s.sideItem}>
                  <View style={s.sideCircle}>
                    <Text style={s.sideRatingStar}>★</Text>
                  </View>
                  <Text style={[s.sideLabel, s.sideLabelGold]}>{quest.rating}</Text>
                </View>

                {/* Edit */}
                <TouchableOpacity
                  style={s.sideItem}
                  onPress={() =>
                    navigation.navigate('StoryExperience', {
                      themeId: story?.id || 'dark',
                      questId: quest.id,
                      editMode: true,
                    })
                  }
                  activeOpacity={0.8}
                >
                  <View style={s.sideCircle}>
                    <Text style={s.sideIconText}>✎</Text>
                  </View>
                  <Text style={s.sideLabel}>Edit</Text>
                </TouchableOpacity>
              </View>

              {/* ── Bottom-left: title + description + CTA ── */}
              <View style={[s.cardContent, { maxWidth: W - 96 }]}>
                <Text style={s.cardTitle}>{quest.title}</Text>
                <Text style={s.cardDesc} numberOfLines={3}>{quest.desc}</Text>
                <TouchableOpacity
                  style={s.ctaBtn}
                  onPress={() =>
                    navigation.navigate('StoryExperience', {
                      themeId: story?.id || 'dark',
                      questId: quest.id,
                    })
                  }
                  activeOpacity={0.85}
                >
                  <Text style={s.ctaBtnText}>START QUEST  →</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={{ height: 60 }} />
      </ScrollView>

      {shareOpen && <ShareSheet onClose={() => setShareOpen(false)} />}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },

  // Floating back button
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 12 : 52,
    left: 16,
    zIndex: 300,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.52)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    } : {}),
  } as any,
  backIcon: { color: Colors.text, fontSize: 18 },

  // ── Story Banner ──────────────────────────────────────────────────────
  banner: { position: 'relative', overflow: 'hidden' },
  bannerImg: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
  },
  bannerOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.68)',
  },
  bannerContent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingBottom: 18, paddingTop: 60, gap: 4,
  },
  bannerCategory:  { color: Colors.gold, fontSize: 9, letterSpacing: 2.5, fontWeight: '700' },
  bannerTitle: {
    color: Colors.text, fontSize: 20,
    fontFamily: Typography.fontSerif, lineHeight: 26,
  },
  bannerDesc:    { color: 'rgba(255,255,255,0.6)', fontSize: 12, lineHeight: 18 },
  bannerRow:     { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  typeBadge: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(201,168,76,0.18)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.5)',
  },
  typeBadgeText:  { color: Colors.gold, fontSize: 9, letterSpacing: 1.5, fontWeight: '700' },
  questCountText: { color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: 1 },

  // ── Quest Card ────────────────────────────────────────────────────────
  card: { position: 'relative', overflow: 'hidden', backgroundColor: '#000' },
  cardImg: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
  },

  // Cinematic vignettes — top and bottom darkening
  cardFadeTop: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 140,
    backgroundColor: 'rgba(0,0,0,0.50)',
  },
  cardFadeBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 300,
    backgroundColor: 'rgba(0,0,0,0.78)',
  },

  // Quest badge — top left
  questBadge: {
    position: 'absolute', top: 20, left: 70, zIndex: 10,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(201,168,76,0.15)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.6)',
  },
  questBadgeText: { color: Colors.gold, fontSize: 9, letterSpacing: 2.5, fontWeight: '700' },

  // ── Right-side icon column ─────────────────────────────────────────────
  sideBar: {
    position: 'absolute',
    right: 14,
    bottom: 130,
    zIndex: 10,
    alignItems: 'center',
    gap: 22,
  },
  sideItem:  { alignItems: 'center', gap: 5 },
  sideCircle: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(0,0,0,0.40)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    } : {}),
  } as any,
  sideCircleActive: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(201,168,76,0.15)',
  },
  sideIconText:  { fontSize: 20, color: Colors.text },
  sideIconGold:  { color: Colors.gold },
  sideRatingStar:{ fontSize: 18, color: Colors.gold },
  sideLabel:     { fontSize: 10, color: 'rgba(255,255,255,0.75)', letterSpacing: 0.5 },
  sideLabelGold: { color: Colors.gold, fontWeight: '700' },

  // ── Bottom-left content ────────────────────────────────────────────────
  cardContent: {
    position: 'absolute',
    bottom: 0, left: 0,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 20,
    gap: 6,
    zIndex: 10,
  },
  cardTitle: {
    color: Colors.text,
    fontSize: 22,
    fontFamily: Typography.fontSerif,
    lineHeight: 28,
    fontWeight: '600',
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    lineHeight: 19,
  },
  ctaBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: Colors.gold,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: Radius.full,
  },
  ctaBtnText: {
    color: Colors.background,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
});

// ─── Share sheet styles ────────────────────────────────────────────────────
const ss = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    backgroundColor: '#1A1710',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    borderTopWidth: 1, borderColor: Colors.border,
    paddingBottom: 36,
  },
  handle: {
    width: 36, height: 4, borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center', marginTop: 12, marginBottom: 16,
  },
  row:        { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingVertical: 14 },
  rowBorder:  { borderBottomWidth: 1, borderBottomColor: Colors.border },
  optIcon:    { fontSize: 18, width: 26, textAlign: 'center' },
  optLabel:   { color: Colors.text, fontSize: 15 },
  done: {
    marginHorizontal: 20, marginTop: 12,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md, paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  doneText: { color: Colors.gold, fontSize: 15, fontWeight: '600' },
});
