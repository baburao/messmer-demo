import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, Modal, Animated, Platform,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import { HugeiconsIcon } from '@hugeicons/react';
import { Share02Icon } from '@hugeicons/core-free-icons';

const STICKY_THRESHOLD = 280;

// ─── Duration helpers ─────────────────────────────────────────────────────
function parseSecs(d: string): number {
  const [m, s] = d.split(':').map(Number);
  return m * 60 + s;
}
function formatSecs(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

// ─── Episode data ─────────────────────────────────────────────────────────
type Episode = {
  id: string; number: string; title: string; desc: string; duration: string; image: string;
};

const WATCH_EPISODES: Record<string, Episode[]> = {
  w1: [
    {
      id: 'e1', number: '01', title: 'The Founding Flame',
      desc: 'A civilisation rises from ash and war. The first emperors claim divinity in fire.',
      duration: '18:42',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    },
    {
      id: 'e2', number: '02', title: 'Gods Among Men',
      desc: 'Priests and generals clash over power as the empire reaches its golden age.',
      duration: '22:10',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
    },
    {
      id: 'e3', number: '03', title: 'The Forgotten Wars',
      desc: 'Border conflicts erase entire cultures. The victors rewrite the history books.',
      duration: '19:55',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    },
    {
      id: 'e4', number: '04', title: 'Echoes in Stone',
      desc: 'What the ruins remember that no historian dared to write down.',
      duration: '24:30',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    },
  ],
  w2: [
    {
      id: 'e1', number: '01', title: 'Signal & Static',
      desc: 'The first neon cities bloom in a world torn between old prophecy and new code.',
      duration: '20:15',
      image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
    },
    {
      id: 'e2', number: '02', title: 'Circuit Temples',
      desc: 'Ancient rituals performed inside server farms. Faith uploads to the cloud.',
      duration: '17:40',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    },
    {
      id: 'e3', number: '03', title: 'The Oracle Grid',
      desc: 'An AI begins predicting events centuries before they happen.',
      duration: '23:05',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    },
  ],
};

// ─── Share Sheet ──────────────────────────────────────────────────────────
const SHARE_OPTIONS = [
  { id: 'o1', label: 'Copy Link', icon: '🔗' },
  { id: 'o2', label: 'Save Video', icon: '🔖' },
  { id: 'o3', label: 'Add to Watch List', icon: '📺' },
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

// ─── Video Player ─────────────────────────────────────────────────────────
function VideoPlayer({ image, totalDuration }: { image: string; totalDuration: string }) {
  const [playing, setPlaying] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const animRef = useRef<any>(null);

  const handlePlay = () => {
    setPlaying(true);
    animRef.current = Animated.timing(progress, {
      toValue: 1, duration: 24000, useNativeDriver: false,
    });
    animRef.current.start(({ finished }: any) => { if (finished) setPlaying(false); });
  };

  const handlePause = () => {
    setPlaying(false);
    animRef.current?.stop();
  };

  const progressWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={vp.container}>
      <Image source={{ uri: image }} style={vp.poster} resizeMode="cover" />
      <View style={vp.overlay} />

      {!playing ? (
        <TouchableOpacity style={vp.playBtn} onPress={handlePlay} activeOpacity={0.8}>
          <View style={vp.playCircle}>
            <Text style={vp.playIcon}>▶</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={vp.playBtn} onPress={handlePause} activeOpacity={0.8}>
          <View style={vp.playCircle}>
            <Text style={vp.playIcon}>⏸</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Progress bar */}
      <View style={vp.controls}>
        <View style={vp.progressBar}>
          <Animated.View style={[vp.progressFill, { width: progressWidth }]} />
        </View>
        <View style={vp.timeRow}>
          <Text style={vp.timeText}>00:00</Text>
          <Text style={vp.timeText}>{totalDuration}</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────
export default function WatchDetailScreen({ navigation, route }: any) {
  const story      = route?.params?.story;
  const fromCreate = route?.params?.fromCreate === true;
  const [liked, setLiked]         = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [scrollY, setScrollY]     = useState(0);

  const image    = story?.image    || 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80';
  const title    = story?.title    || 'Lost Myths of the Aurelian Empire';
  const desc     = story?.desc     || 'Uncovering the forgotten age of stone and fire, where gods walked among mortals.';
  const category = story?.category || 'HISTORY / EPIC';
  const author   = story?.author   || 'by @historybuff';

  const episodes: Episode[] = WATCH_EPISODES[story?.id] || WATCH_EPISODES.w1;
  const showStickyHeader = scrollY > STICKY_THRESHOLD;

  // Compute total duration and per-episode start times
  const totalSecs = episodes.reduce((sum, ep) => sum + parseSecs(ep.duration), 0);
  const totalDuration = formatSecs(totalSecs);
  const startTimes: string[] = [];
  let acc = 0;
  for (const ep of episodes) {
    startTimes.push(formatSecs(acc));
    acc += parseSecs(ep.duration);
  }

  return (
    <View style={styles.container}>

      {/* ── Sticky Header ──────────────────────────────────── */}
      <View
        style={[styles.stickyHeader, showStickyHeader ? styles.stickyVisible : styles.stickyHidden]}
        pointerEvents={showStickyHeader ? 'auto' : 'none'}
      >
        <View style={styles.stickyDivider} />
        <View style={styles.stickyInner}>
          {!fromCreate && (
            <TouchableOpacity style={styles.stickyBack} onPress={() => navigation.goBack()}>
              <Text style={styles.stickyBackIcon}>←</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.stickyTitle} numberOfLines={1}>{title}</Text>
          <View style={styles.stickyActions}>
            <TouchableOpacity
              style={[styles.actionBtn, liked && styles.actionBtnLiked]}
              onPress={() => setLiked(p => !p)}
            >
              <Text style={[styles.actionBtnIcon, liked && styles.actionBtnIconLiked]}>
                {liked ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => setShareOpen(true)}>
              <HugeiconsIcon icon={Share02Icon} size={15} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.stickyDivider} />
      </View>

      {/* ── Scrollable Content ─────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        {/* ── Back button (over video) ── */}
        <View style={styles.videoWrapper}>
          <VideoPlayer image={image} totalDuration={totalDuration} />
          {!fromCreate && (
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Story info ─────────────────────────────────────── */}
        <View style={styles.infoSection}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>

          {/* Action row */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionPill, liked && styles.actionPillLiked]}
              onPress={() => setLiked(p => !p)}
            >
              <Text style={[styles.actionPillIcon, liked && styles.actionPillIconLiked]}>
                {liked ? '♥' : '♡'}
              </Text>
              <Text style={[styles.actionPillLabel, liked && styles.actionPillLabelLiked]}>Like</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionPill} onPress={() => setShareOpen(true)}>
              <HugeiconsIcon icon={Share02Icon} size={15} color={Colors.textSecondary} />
              <Text style={styles.actionPillLabel}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionPill}
              onPress={() => navigation.navigate('StoryExperience', { themeId: story?.id || 'dark', editMode: true })}
            >
              <Text style={styles.actionPillIcon}>✎</Text>
              <Text style={styles.actionPillLabel}>Edit</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.desc}>{desc}</Text>
        </View>

        {/* ── Episodes ──────────────────────────────────────── */}
        <View style={styles.episodesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>PARTS</Text>
            <Text style={styles.sectionMeta}>{episodes.length} parts · {totalDuration} total</Text>
          </View>

          {episodes.map((ep, idx) => (
            <View key={ep.id} style={styles.epCard}>
              {/* Banner */}
              <View style={styles.epBanner}>
                <Image source={{ uri: ep.image }} style={styles.epBannerImage} resizeMode="cover" />
                <View style={styles.epBannerOverlay} />

                {/* Play icon centred */}
                <View style={styles.epPlayBtn}>
                  <Text style={styles.epPlayIcon}>▶</Text>
                </View>

                {/* Episode label + start time bottom-left */}
                <View style={styles.epBottomLeft}>
                  <Text style={styles.epNumber}>PART {ep.number}</Text>
                  <Text style={styles.epStartTime}>{startTimes[idx]}</Text>
                </View>

                {/* Duration badge bottom-right */}
                <View style={styles.epDurationBadge}>
                  <Text style={styles.epDuration}>{ep.duration}</Text>
                </View>

                {/* Edit icon */}
                <TouchableOpacity
                  style={styles.epEditBtn}
                  onPress={() => navigation.navigate('StoryExperience', {
                    themeId: story?.id || 'dark', questId: ep.id, editMode: true,
                  })}
                >
                  <Text style={styles.epEditIcon}>✎</Text>
                </TouchableOpacity>
              </View>

              {/* Text */}
              <View style={styles.epBody}>
                <Text style={styles.epTitle}>{ep.title}</Text>
                <Text style={styles.epDesc} numberOfLines={2}>{ep.desc}</Text>
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

  // Sticky header
  stickyHeader: {
    position: 'absolute' as any, top: 0, left: 0, right: 0, zIndex: 100,
    backgroundColor: 'rgba(10,10,10,0.82)' as any,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    } : {}),
  } as any,
  stickyVisible: { opacity: 1 },
  stickyHidden:  { opacity: 0 },
  stickyDivider: { height: 1, backgroundColor: Colors.border },
  stickyInner: {
    height: 56, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, gap: 12,
  },
  stickyBack: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  stickyBackIcon: { color: Colors.text, fontSize: 18 },
  stickyTitle: { flex: 1, color: Colors.text, fontSize: 14, fontFamily: Typography.fontSerif },
  stickyActions: { flexDirection: 'row', gap: 8 },

  // Video wrapper
  videoWrapper: { position: 'relative' as any },
  backBtn: {
    position: 'absolute' as any, top: 48, left: 16, zIndex: 10,
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

  // Action buttons (sticky header)
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

  // Info section
  infoSection: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  category: { color: Colors.gold, fontSize: 10, letterSpacing: 2.5, marginBottom: 6 },
  title: {
    color: Colors.text, fontSize: 20,
    fontFamily: Typography.fontSerif, lineHeight: 26, marginBottom: 4,
  },
  author: { color: 'rgba(255,255,255,0.45)', fontSize: 12, marginBottom: 18 },

  // Action pill row
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  actionPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(26,26,26,0.75)' as any,
    borderWidth: 1, borderColor: 'rgba(42,42,42,0.8)',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } : {}),
  } as any,
  actionPillLiked: { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.08)' },
  actionPillIcon: { color: Colors.textSecondary, fontSize: 15 },
  actionPillIconLiked: { color: Colors.gold },
  actionPillLabel: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600' },
  actionPillLabelLiked: { color: Colors.gold },

  desc: { color: Colors.textSecondary, fontSize: 14, lineHeight: 22 },

  // Episodes
  episodesSection: { paddingHorizontal: 20, paddingTop: 28 },
  sectionHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 },
  sectionLabel: { color: Colors.textMuted, fontSize: 10, letterSpacing: 3 },
  sectionMeta: { color: Colors.textMuted, fontSize: 11 },

  // Episode card
  epCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
    marginBottom: 16,
    overflow: 'hidden' as any,
  },
  epBanner: { height: 160, position: 'relative' as any },
  epBannerImage: {
    position: 'absolute' as any, top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
  },
  epBannerOverlay: {
    position: 'absolute' as any, top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  epPlayBtn: {
    position: 'absolute' as any,
    top: '50%' as any, left: '50%' as any,
    marginTop: -22, marginLeft: -22,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)' as any,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    } : {}),
  } as any,
  epPlayIcon: { color: Colors.text, fontSize: 16, marginLeft: 3 },
  epBottomLeft: {
    position: 'absolute' as any, bottom: 10, left: 12,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  epNumber: {
    color: Colors.gold, fontSize: 10, letterSpacing: 2, fontWeight: '700',
  },
  epStartTime: {
    color: 'rgba(255,255,255,0.55)', fontSize: 10,
  },
  epDurationBadge: {
    position: 'absolute' as any, bottom: 10, right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  epDuration: { color: Colors.text, fontSize: 11, fontWeight: '600' },
  epEditBtn: {
    position: 'absolute' as any, top: 10, right: 10,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.6)',
    alignItems: 'center', justifyContent: 'center',
  },
  epEditIcon: { color: Colors.gold, fontSize: 14 },
  epBody: { padding: 14, gap: 6 },
  epTitle: { color: Colors.text, fontSize: 15, fontFamily: Typography.fontSerif },
  epDesc: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
});

// ─── Video Player styles ──────────────────────────────────────────────────
const vp = StyleSheet.create({
  container: { height: 260, backgroundColor: '#000', position: 'relative' as any },
  poster: { position: 'absolute' as any, top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  overlay: {
    position: 'absolute' as any, top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  playBtn: {
    position: 'absolute' as any,
    top: '50%' as any, left: '50%' as any,
    marginTop: -32, marginLeft: -32,
    zIndex: 2,
  },
  playCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { color: '#fff', fontSize: 24, marginLeft: 4 },
  controls: {
    position: 'absolute' as any, bottom: 0, left: 0, right: 0,
    paddingHorizontal: 16, paddingBottom: 14,
    backgroundColor: 'rgba(0,0,0,0.45)' as any,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    } : {}),
  } as any,
  progressBar: {
    height: 3, backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2, marginBottom: 6, overflow: 'hidden' as any,
  },
  progressFill: { height: '100%', backgroundColor: Colors.gold, borderRadius: 2 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  timeText: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
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
