import React, { useState } from 'react';
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
  const story = route?.params?.story;

  const { width: W, height: H } = useWindowDimensions();

  const [likedIds,  setLikedIds]  = useState<Set<string>>(new Set());
  const [shareOpen, setShareOpen] = useState(false);

  const title    = story?.title    || 'The Architecture of Silent Echoes';
  const category = story?.category || 'FICTION / DARK';
  const quests: Quest[] = STORY_QUESTS[story?.id] || STORY_QUESTS.default;

  const toggleLike = (id: string) =>
    setLikedIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const TOP_INSET = Platform.OS === 'android'
    ? (StatusBar.currentHeight ?? 24) + 8
    : 52;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />

      {/* ── Full-screen paging scroll ── */}
      <ScrollView
        pagingEnabled
        showsVerticalScrollIndicator={false}
        style={{ width: W, height: H }}
        contentContainerStyle={{ width: W }}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {quests.map((quest, idx) => {
          const isLiked = likedIds.has(quest.id);
          return (
            <View key={quest.id} style={{ width: W, height: H }}>
              {/* Full-bleed background */}
              <Image
                source={{ uri: quest.image }}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
              />

              {/* Top vignette */}
              <View style={s.fadeTop} />
              {/* Bottom vignette */}
              <View style={s.fadeBottom} />

              {/* Quest number badge */}
              <View style={[s.questBadge, { top: TOP_INSET + 56 }]}>
                <Text style={s.questBadgeText}>QUEST {quest.number}</Text>
              </View>

              {/* ── Right-side icon column ── */}
              <View style={[s.sideBar, { bottom: 160 }]}>
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

                <View style={s.sideItem}>
                  <View style={s.sideCircle}>
                    <Text style={s.sideRatingStar}>★</Text>
                  </View>
                  <Text style={[s.sideLabel, s.sideLabelGold]}>{quest.rating}</Text>
                </View>

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

              {/* ── Bottom-left: title + desc + CTA ── */}
              <View style={[s.cardContent, { bottom: 36, maxWidth: W - 90 }]}>
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
      </ScrollView>

      {/* ── Fixed top bar: back + story title ── */}
      <View style={[s.topBar, { paddingTop: TOP_INSET }] as any} pointerEvents="box-none">
        <TouchableOpacity
          style={s.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>

        <Text style={s.topTitle} numberOfLines={1}>{title}</Text>

        <View style={{ width: 40 }} />
      </View>

      {shareOpen && <ShareSheet onClose={() => setShareOpen(false)} />}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Fixed top bar (overlays the scroll)
  topBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    zIndex: 400,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 14,
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0)',
    ...(Platform.OS === 'web' ? {
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
    } : {}),
  } as any,

  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } : {}),
  } as any,
  backIcon: { color: Colors.text, fontSize: 18 },

  topTitle: {
    flex: 1, textAlign: 'center',
    color: Colors.text,
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontSerif,
    letterSpacing: 1.5,
    fontWeight: '600',
  },

  // Cinematic vignettes
  fadeTop: {
    ...StyleSheet.absoluteFillObject,
    bottom: undefined,
    height: 180,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  fadeBottom: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    height: 340,
    backgroundColor: 'rgba(0,0,0,0.80)',
  },

  // Quest badge
  questBadge: {
    position: 'absolute', left: 20, zIndex: 10,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(201,168,76,0.15)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.6)',
  },
  questBadgeText: { color: Colors.gold, fontSize: 9, letterSpacing: 2.5, fontWeight: '700' },

  // Right-side icons
  sideBar: {
    position: 'absolute',
    right: 14,
    zIndex: 10,
    alignItems: 'center',
    gap: 24,
  },
  sideItem:  { alignItems: 'center', gap: 5 },
  sideCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.42)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } : {}),
  } as any,
  sideCircleActive: { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.18)' },
  sideIconText:     { fontSize: 20, color: Colors.text },
  sideIconGold:     { color: Colors.gold },
  sideRatingStar:   { fontSize: 18, color: Colors.gold },
  sideLabel:        { fontSize: 10, color: 'rgba(255,255,255,0.78)', letterSpacing: 0.3 },
  sideLabelGold:    { color: Colors.gold, fontWeight: '700' },

  // Bottom-left content
  cardContent: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
    gap: 6,
  },
  cardTitle: {
    color: Colors.text,
    fontSize: 24,
    fontFamily: Typography.fontSerif,
    lineHeight: 30,
    fontWeight: '600',
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    lineHeight: 20,
  },
  ctaBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: Colors.gold,
    paddingHorizontal: 22, paddingVertical: 12,
    borderRadius: Radius.full,
  },
  ctaBtnText: {
    color: Colors.background,
    fontSize: 11, fontWeight: '700', letterSpacing: 2,
  },
});

// ─── Share sheet ───────────────────────────────────────────────────────────
const ss = StyleSheet.create({
  backdrop:  { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    backgroundColor: '#1A1710',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    borderTopWidth: 1, borderColor: Colors.border,
    paddingBottom: 36,
  },
  handle:    { width: 36, height: 4, borderRadius: 2, backgroundColor: Colors.border, alignSelf: 'center', marginTop: 12, marginBottom: 16 },
  row:       { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  optIcon:   { fontSize: 18, width: 26, textAlign: 'center' },
  optLabel:  { color: Colors.text, fontSize: 15 },
  done: {
    marginHorizontal: 20, marginTop: 12,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md, paddingVertical: 14,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  doneText: { color: Colors.gold, fontSize: 15, fontWeight: '600' },
});
