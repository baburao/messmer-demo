import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, Modal, Platform, StatusBar, useWindowDimensions,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import { HugeiconsIcon } from '@hugeicons/react';
import { Share02Icon } from '@hugeicons/core-free-icons';

// ─── Episode data ─────────────────────────────────────────────────────────
type Episode = {
  id: string; number: string; title: string; desc: string;
  duration: string; image: string; rating: string;
};

const WATCH_EPISODES: Record<string, Episode[]> = {
  w1: [
    {
      id: 'e1', number: '01', duration: '18:42', rating: '4.9',
      title: 'The Founding Flame',
      desc: 'A civilisation rises from ash and war. The first emperors claim divinity in fire.',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    },
    {
      id: 'e2', number: '02', duration: '22:10', rating: '4.7',
      title: 'Gods Among Men',
      desc: 'Priests and generals clash over power as the empire reaches its golden age.',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
    },
    {
      id: 'e3', number: '03', duration: '19:55', rating: '4.8',
      title: 'The Forgotten Wars',
      desc: 'Border conflicts erase entire cultures. The victors rewrite the history books.',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    },
    {
      id: 'e4', number: '04', duration: '24:30', rating: '4.6',
      title: 'Echoes in Stone',
      desc: 'What the ruins remember that no historian dared to write down.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    },
  ],
  w2: [
    {
      id: 'e1', number: '01', duration: '20:15', rating: '4.8',
      title: 'Signal & Static',
      desc: 'The first neon cities bloom in a world torn between old prophecy and new code.',
      image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
    },
    {
      id: 'e2', number: '02', duration: '17:40', rating: '4.5',
      title: 'Circuit Temples',
      desc: 'Ancient rituals performed inside server farms. Faith uploads to the cloud.',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    },
    {
      id: 'e3', number: '03', duration: '23:05', rating: '4.9',
      title: 'The Oracle Grid',
      desc: 'An AI begins predicting events centuries before they happen.',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    },
  ],
};

// ─── Share sheet ──────────────────────────────────────────────────────────
function ShareSheet({ onClose }: { onClose: () => void }) {
  const OPTS = [
    { id: 'o1', icon: '🔗', label: 'Copy Link' },
    { id: 'o2', icon: '🔖', label: 'Save Video' },
    { id: 'o3', icon: '📺', label: 'Add to Watch List' },
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

// ─── Gradient vignette (platform-aware) ──────────────────────────────────
function Vignette() {
  if (Platform.OS === 'web') {
    return (
      <View
        style={[StyleSheet.absoluteFillObject, s.vignetteWeb] as any}
        // @ts-ignore
        pointerEvents="none"
      />
    );
  }
  return (
    <>
      <View style={s.fadeTop} />
      <View style={s.fadeMid} />
      <View style={s.fadeBottom} />
    </>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────
export default function WatchDetailScreen({ navigation, route }: any) {
  const story = route?.params?.story;

  const { width: W, height: H } = useWindowDimensions();

  // Story-level actions (not per-episode)
  const [liked,     setLiked]     = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const storyRating = '4.8';

  const title    = story?.title    || 'Lost Myths of the Aurelian Empire';
  const episodes: Episode[] = WATCH_EPISODES[story?.id] || WATCH_EPISODES.w1;

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
        snapToInterval={H}
        decelerationRate="fast"
        style={{ width: W, height: H }}
        contentContainerStyle={{ width: W }}
        scrollEventThrottle={16}
        bounces
        overScrollMode="never"
      >
        {episodes.map((ep) => (
          <View key={ep.id} style={{ width: W, height: H }}>
            {/* Full-bleed background */}
            <Image
              source={{ uri: ep.image }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />

            {/* Gradient vignette */}
            <Vignette />

            {/* Duration badge — top right (below top bar) */}
            <View style={[s.durationBadge, { top: TOP_INSET + 56 }]}>
              <Text style={s.durationText}>{ep.duration}</Text>
            </View>

            {/* Centre play button */}
            <View style={s.playWrap} pointerEvents="none">
              <View style={s.playCircle}>
                <Text style={s.playIcon}>▶</Text>
              </View>
            </View>

            {/* ── Bottom-left: part badge + title + desc ── */}
            <View style={[s.cardContent, { bottom: 48, maxWidth: W - 90 }]}>
              {/* Part badge moved to bottom */}
              <View style={s.partBadge}>
                <Text style={s.partBadgeText}>PART {ep.number}</Text>
              </View>
              <Text style={s.cardTitle}>{ep.title}</Text>
              <Text style={s.cardDesc} numberOfLines={3}>{ep.desc}</Text>
            </View>

            {/* ── Per-episode Edit button (bottom-right) ── */}
            <TouchableOpacity
              style={[s.editBtn, { bottom: 48 }]}
              onPress={() =>
                navigation.navigate('StoryExperience', {
                  themeId: story?.id || 'dark',
                  questId: ep.id,
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
        ))}
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

      {/* ── Story-level action sidebar (Like / Share / Rating) ── */}
      <View style={[s.fixedSideBar, { top: TOP_INSET + 80 }]} pointerEvents="box-none">
        {/* Like */}
        <TouchableOpacity
          style={s.sideItem}
          onPress={() => setLiked(v => !v)}
          activeOpacity={0.8}
          pointerEvents="auto"
        >
          <View style={[s.sideCircle, liked && s.sideCircleActive]}>
            <Text style={[s.sideIconText, liked && s.sideIconGold]}>
              {liked ? '♥' : '♡'}
            </Text>
          </View>
          <Text style={[s.sideLabel, liked && s.sideLabelGold]}>
            {liked ? 'Liked' : 'Like'}
          </Text>
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity
          style={s.sideItem}
          onPress={() => setShareOpen(true)}
          activeOpacity={0.8}
          pointerEvents="auto"
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
          <Text style={[s.sideLabel, s.sideLabelGold]}>{storyRating}</Text>
        </View>
      </View>

      {shareOpen && <ShareSheet onClose={() => setShareOpen(false)} />}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Fixed top bar
  topBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    zIndex: 400,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 14,
    gap: 8,
    ...(Platform.OS === 'web' ? {
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)',
    } : { backgroundColor: 'transparent' }),
  } as any,

  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.38)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
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

  // Story-level fixed sidebar (right side, upper area)
  fixedSideBar: {
    position: 'absolute',
    right: 14,
    zIndex: 400,
    alignItems: 'center',
    gap: 24,
  },

  // Per-episode Edit button (bottom-right of each card)
  editBtn: {
    position: 'absolute',
    right: 14,
    zIndex: 10,
    alignItems: 'center',
    gap: 5,
  },

  // Gradient vignette — web CSS gradient (transparent center, dark top+bottom)
  vignetteWeb: {
    zIndex: 2,
    // @ts-ignore
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.82) 100%)',
  },

  // Native vignette fallback
  fadeTop: {
    ...StyleSheet.absoluteFillObject,
    bottom: undefined,
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.52)',
    zIndex: 2,
  },
  fadeMid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
    zIndex: 1,
  },
  fadeBottom: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    height: 360,
    backgroundColor: 'rgba(0,0,0,0.78)',
    zIndex: 2,
  },

  // Part badge (blue, now at bottom inside cardContent)
  partBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(80,120,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(80,120,255,0.5)',
    marginBottom: 6,
  },
  partBadgeText: { color: '#7090FF', fontSize: 9, letterSpacing: 2.5, fontWeight: '700' },

  // Duration badge (top right)
  durationBadge: {
    position: 'absolute', right: 16, zIndex: 10,
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.50)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  durationText: { color: Colors.text, fontSize: 11, fontWeight: '600' },

  // Centre play button
  playWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center',
    zIndex: 5,
  },
  playCircle: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.38)',
    alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { color: Colors.text, fontSize: 24, marginLeft: 5 },

  // Shared icon styles
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
    gap: 4,
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
    marginTop: 2,
  },
});

// ─── Share sheet styles ────────────────────────────────────────────────────
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
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  doneText: { color: Colors.gold, fontSize: 15, fontWeight: '600' },
});
