import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, Modal, Animated, Platform,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import { HugeiconsIcon } from '@hugeicons/react';
import { Share02Icon } from '@hugeicons/core-free-icons';

const HERO_HEIGHT = 320;
const STICKY_THRESHOLD = 260; // show header after scrolling this far

// ─── Quest data ───────────────────────────────────────────────────────────
type Quest = {
  id: string; number: string; title: string; desc: string; image: string;
};

const STORY_QUESTS: Record<string, Quest[]> = {
  default: [
    {
      id: 'q1', number: '01', title: 'The First Crossing',
      desc: 'You arrive at the edge of the forgotten district. A stranger offers you a lantern. Do you trust them?',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    },
    {
      id: 'q2', number: '02', title: 'Mirrors & Shadows',
      desc: 'Deep inside the labyrinth, the walls reflect choices you never made. A door appears where none existed.',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    },
    {
      id: 'q3', number: '03', title: "The Cartographer's Secret",
      desc: 'The map reveals a hidden chamber beneath the city. What you find there will change everything.',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
    },
    {
      id: 'q4', number: '04', title: 'Echoes of the Fallen',
      desc: 'The memories of those who came before guide your next step — or mislead you entirely.',
      image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
    },
  ],
};

// ─── Share Sheet ──────────────────────────────────────────────────────────
const SHARE_OPTIONS = [
  { id: 'o1', label: 'Copy Link', icon: '🔗' },
  { id: 'o2', label: 'Save Story', icon: '🔖' },
  { id: 'o3', label: 'Add to Reading List', icon: '📚' },
];

function ShareSheet({ onClose }: { onClose: () => void }) {
  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={ss.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={ss.sheet}>
        <View style={ss.handle} />
        {SHARE_OPTIONS.map((opt, i) => (
          <TouchableOpacity
            key={opt.id}
            style={[ss.optionRow, i < SHARE_OPTIONS.length - 1 && ss.optionBorder]}
            onPress={onClose}
          >
            <Text style={ss.optionIcon}>{opt.icon}</Text>
            <Text style={ss.optionLabel}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={ss.doneBtn} onPress={onClose}>
          <Text style={ss.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─── Action Button (shared by hero + sticky header) ───────────────────────
function ActionBtn({
  onPress, liked, isLike, isShare,
}: {
  onPress: () => void; liked?: boolean; isLike?: boolean; isShare?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.actionBtn, isLike && liked && styles.actionBtnLiked]}
      onPress={onPress}
    >
      {isShare ? (
        <HugeiconsIcon icon={Share02Icon} size={15} color={Colors.text} />
      ) : (
        <Text style={[styles.actionBtnIcon, isLike && liked && styles.actionBtnIconLiked]}>
          {isLike ? (liked ? '♥' : '♡') : '✎'}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────
export default function StoryDetailScreen({ navigation, route }: any) {
  const story      = route?.params?.story;
  const fromCreate = route?.params?.fromCreate === true;
  const [liked, setLiked]         = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [scrollY, setScrollY]     = useState(0);

  const image    = story?.image    || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80';
  const title    = story?.title    || 'The Architecture of Silent Echoes';
  const desc     = story?.desc     || 'A labyrinthine journey through memory and forgotten spaces.';
  const category = story?.category || 'FICTION / DARK';
  const author   = story?.author   || 'by @shadowweaver';

  const quests: Quest[] = STORY_QUESTS[story?.id] || STORY_QUESTS.default;

  const showStickyHeader = scrollY > STICKY_THRESHOLD;

  const handleRecreate = (quest: Quest) => {
    navigation.navigate('StoryExperience', {
      themeId: story?.id || 'dark',
      questId: quest.id,
      editMode: true,
    });
  };

  return (
    <View style={styles.container}>

      {/* ── Sticky Header (appears after hero scrolls away) ── */}
      <View
        style={[
          styles.stickyHeader,
          showStickyHeader ? styles.stickyHeaderVisible : styles.stickyHeaderHidden,
        ]}
        pointerEvents={showStickyHeader ? 'auto' : 'none'}
      >
        {/* Divider line */}
        <View style={styles.stickyDivider} />

        <View style={styles.stickyInner}>
          {/* Back */}
          {!fromCreate && (
            <TouchableOpacity style={styles.stickyBack} onPress={() => navigation.goBack()}>
              <Text style={styles.stickyBackIcon}>←</Text>
            </TouchableOpacity>
          )}

          {/* Title */}
          <Text style={styles.stickyTitle} numberOfLines={1}>{title}</Text>

          {/* Like + Share */}
          <View style={styles.stickyActions}>
            <ActionBtn onPress={() => setLiked(p => !p)} isLike liked={liked} />
            <ActionBtn onPress={() => setShareOpen(true)} isShare />
          </View>
        </View>

        {/* Bottom divider */}
        <View style={styles.stickyDivider} />
      </View>

      {/* ── Scrollable Content ────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >

        {/* ── Hero Banner ──────────────────────────────────── */}
        <View style={styles.hero}>
          <Image source={{ uri: image }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />

          {/* Back btn inside hero */}
          {!fromCreate && (
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}

          {/* Action buttons top-right inside hero */}
          <View style={styles.heroActions}>
            <ActionBtn onPress={() => setLiked(p => !p)} isLike liked={liked} />
            <ActionBtn onPress={() => setShareOpen(true)} isShare />
            <ActionBtn
              onPress={() => navigation.navigate('StoryExperience', { themeId: story?.id || 'dark', editMode: true })}
            />
          </View>

          {/* Title at bottom of hero */}
          <View style={styles.heroContent}>
            <Text style={styles.heroCategory}>{category}</Text>
            <Text style={styles.heroTitle}>{title}</Text>
            <Text style={styles.heroAuthor}>{author}</Text>
          </View>
        </View>

        {/* ── Body ──────────────────────────────────────────── */}
        <View style={styles.body}>

          {/* Story description */}
          <Text style={styles.storyDesc}>{desc}</Text>

          {/* Quests */}
          <Text style={styles.sectionLabel}>QUESTS</Text>

          {quests.map((quest) => (
            <View key={quest.id} style={styles.questCard}>
              {/* Banner image */}
              <View style={styles.questBanner}>
                <Image
                  source={{ uri: quest.image }}
                  style={styles.questBannerImage}
                  resizeMode="cover"
                />
                <View style={styles.questBannerOverlay} />

                {/* Quest number on image */}
                <Text style={styles.questNumber}>QUEST {quest.number}</Text>

                {/* Edit icon on image */}
                <TouchableOpacity
                  style={styles.editIconBtn}
                  onPress={() => handleRecreate(quest)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.editIconText}>✎</Text>
                </TouchableOpacity>
              </View>

              {/* Text content below image */}
              <View style={styles.questBody}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questDesc} numberOfLines={3}>{quest.desc}</Text>
              </View>
            </View>
          ))}

          <View style={{ height: fromCreate ? 120 : 48 }} />
        </View>
      </ScrollView>

      {/* ── Create flow floating actions ── */}
      {fromCreate && (
        <View style={styles.floatingBar}>
          <TouchableOpacity
            style={styles.floatBtnSecondary}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.floatBtnSecondaryText}>GO TO HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.floatBtnPrimary}
            onPress={() => navigation.navigate('ThemeSelect')}
            activeOpacity={0.8}
          >
            <Text style={styles.floatBtnPrimaryText}>CREATE ANOTHER STORY</Text>
          </TouchableOpacity>
        </View>
      )}

      {shareOpen && <ShareSheet onClose={() => setShareOpen(false)} />}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },

  // ── Sticky Header ──────────────────────────────────────────────────────
  stickyHeader: {
    position: 'absolute' as any,
    top: 0, left: 0, right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(10,10,10,0.82)' as any,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    } : {}),
  } as any,
  stickyHeaderVisible: { opacity: 1 },
  stickyHeaderHidden: { opacity: 0 },

  stickyDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  stickyInner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  stickyBack: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  stickyBackIcon: { color: Colors.text, fontSize: 18 },

  stickyTitle: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    fontFamily: Typography.fontSerif,
    fontWeight: '600',
  },
  stickyActions: {
    flexDirection: 'row',
    gap: 8,
  },

  // ── Hero ──────────────────────────────────────────────────────────────
  hero: { height: HERO_HEIGHT, position: 'relative' },
  heroImage: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
  },
  heroOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  backBtn: {
    position: 'absolute', top: 52, left: 16, zIndex: 10,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.38)' as any,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } : {}),
  } as any,
  backIcon: { color: Colors.text, fontSize: 16 },

  heroActions: {
    position: 'absolute', top: 52, right: 16, zIndex: 10,
    flexDirection: 'row', gap: 8,
  },
  actionBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.38)' as any,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } : {}),
  } as any,
  actionBtnLiked: { borderColor: Colors.gold },
  actionBtnIcon: { color: Colors.text, fontSize: 15 },
  actionBtnIconLiked: { color: Colors.gold },

  heroContent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingBottom: 20, paddingTop: 80,
    gap: 4,
  } as any,
  heroCategory: { color: Colors.gold, fontSize: 10, letterSpacing: 2.5 },
  heroTitle: {
    color: Colors.text, fontSize: 22,
    fontFamily: Typography.fontSerif, lineHeight: 28,
  },
  heroAuthor: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },

  // ── Body ──────────────────────────────────────────────────────────────
  body: { paddingHorizontal: 20, paddingTop: 24 },

  storyDesc: {
    color: Colors.textSecondary,
    fontSize: 14, lineHeight: 22,
    marginBottom: 28,
  },

  sectionLabel: {
    color: Colors.textMuted, fontSize: 10, letterSpacing: 3,
    marginBottom: 16,
  },

  // ── Quest Card ────────────────────────────────────────────────────────
  questCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
    marginBottom: 16,
    overflow: 'hidden' as any,
  },

  // Banner image section
  questBanner: {
    height: 140,
    position: 'relative' as any,
  },
  questBannerImage: {
    position: 'absolute' as any,
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
  },
  questBannerOverlay: {
    position: 'absolute' as any,
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  questNumber: {
    position: 'absolute' as any,
    bottom: 12, left: 14,
    color: Colors.gold, fontSize: 10, letterSpacing: 2.5, fontWeight: '700',
  },
  editIconBtn: {
    position: 'absolute' as any,
    top: 10, right: 10,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.6)',
    alignItems: 'center', justifyContent: 'center',
  },
  editIconText: { color: Colors.gold, fontSize: 15 },

  // Text content below banner
  questBody: {
    padding: 14, gap: 6,
  },
  questTitle: {
    color: Colors.text, fontSize: 16,
    fontFamily: Typography.fontSerif, lineHeight: 22,
  },
  questDesc: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },

  // ── Floating create-flow bar ──────────────────────────────────────────
  floatingBar: {
    position: 'absolute' as any,
    bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: 'rgba(10,10,10,0.90)' as any,
    borderTopWidth: 1,
    borderTopColor: 'rgba(201,168,76,0.2)',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    } : {}),
  } as any,
  floatBtnSecondary: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)' as any,
  },
  floatBtnSecondaryText: {
    color: Colors.textSecondary,
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  floatBtnPrimary: {
    flex: 1.6,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatBtnPrimaryText: {
    color: '#0A0A0A',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '700',
  },
});

// ─── Share sheet styles ───────────────────────────────────────────────────
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
  optionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 20, paddingVertical: 14,
  },
  optionBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  optionIcon: { fontSize: 18, width: 26, textAlign: 'center' },
  optionLabel: { color: Colors.text, fontSize: 15 },
  doneBtn: {
    marginHorizontal: 20, marginTop: 12,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md, paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  doneBtnText: { color: Colors.gold, fontSize: 15, fontWeight: '600' },
});
