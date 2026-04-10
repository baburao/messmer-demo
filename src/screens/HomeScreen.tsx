import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, StatusBar, Modal, Animated,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import BottomNav from '../components/BottomNav';
import { getQuestSetup } from '../navigation/AppNavigator';
import { HugeiconsIcon } from '@hugeicons/react';
import { Share02Icon } from '@hugeicons/core-free-icons';

const READ_STORIES = [
  {
    id: '1',
    category: 'CULTURE / WEAVING',
    title: 'Shadows in the Loom: The New Noir',
    desc: 'Exploring the intersection of ancestral craftsmanship and the brutalist city...',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    id: '2',
    category: 'FICTION / DARK',
    title: 'The Architecture of Silent Echoes',
    desc: 'A labyrinthine journey through memory and forgotten spaces. Every choice reshapes...',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
  },
  {
    id: '3',
    category: 'MYTHOLOGY / EPIC',
    title: 'Edge of the Known',
    desc: 'Ancient maps end here. What lies beyond is yours to discover and define...',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
  },
];



const WATCH_STORIES = [
  {
    id: 'w1',
    category: 'HISTORY / EPIC',
    title: 'Lost Myths of the Aurelian Empire',
    desc: 'Uncovering the forgotten age of stone and fire, where gods walked among mortals...',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
  },
  {
    id: 'w2',
    category: 'SCI-FI / VISUAL',
    title: 'Neon Pasts & Electric Futures',
    desc: 'A weekly visual essay where cyberpunk aesthetics collide with ancient prophecy...',
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
  },
];

// ─── Share sheet contacts ──────────────────────────────────────────────────
const SHARE_CONTACTS = [
  { id: 'c1', name: 'AirDrop', initials: '📡', bg: '#1C1C1E', border: true },
  { id: 'c2', name: 'Emma',    initials: 'EM', bg: '#8B5E3C' },
  { id: 'c3', name: 'Arjun',   initials: 'AJ', bg: '#3C5E8B' },
  { id: 'c4', name: 'Sara',    initials: 'SR', bg: '#5E3C8B' },
  { id: 'c5', name: 'Kai',     initials: 'KI', bg: '#3C8B5E' },
];

const SHARE_APPS = [
  { id: 'a1', name: 'Instagram', bg: '#C13584', icon: '📷' },
  { id: 'a2', name: 'WhatsApp',  bg: '#25D366', icon: '💬' },
  { id: 'a3', name: 'Twitter',   bg: '#1DA1F2', icon: '🐦' },
  { id: 'a4', name: 'LinkedIn',  bg: '#0A66C2', icon: 'in' },
];

const SHARE_OPTIONS = [
  { id: 'o1', label: 'Copy Link',        icon: '🔗' },
  { id: 'o2', label: 'Save Story',       icon: '🔖' },
  { id: 'o3', label: 'Add to Reading List', icon: '📚' },
  { id: 'o4', label: 'Report',           icon: '🚩' },
];

// ─── Share Bottom Sheet ────────────────────────────────────────────────────
function ShareSheet({ story, onClose }: { story: any; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleOption = (id: string) => {
    if (id === 'o1') {
      setCopied(true);
      setTimeout(() => { setCopied(false); onClose(); }, 1200);
    } else {
      onClose();
    }
  };

  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      {/* Backdrop */}
      <TouchableOpacity style={ss.backdrop} activeOpacity={1} onPress={onClose} />

      {/* Sheet */}
      <View style={ss.sheet}>
        {/* Handle */}
        <View style={ss.handle} />

        {/* Story preview row */}
        <View style={ss.previewRow}>
          <Image source={{ uri: story.image }} style={ss.previewThumb} />
          <View style={ss.previewText}>
            <Text style={ss.previewCategory}>{story.category}</Text>
            <Text style={ss.previewTitle} numberOfLines={1}>{story.title}</Text>
            <Text style={ss.previewSub}>messmer.app</Text>
          </View>
        </View>

        <View style={ss.divider} />

        {/* Contacts row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={ss.contactsRow}>
          {SHARE_CONTACTS.map(c => (
            <TouchableOpacity key={c.id} style={ss.contactItem} onPress={onClose}>
              <View style={[ss.contactAvatar, { backgroundColor: c.bg },
                (c as any).border && ss.contactAvatarBorder]}>
                <Text style={ss.contactInitials}>{c.initials}</Text>
              </View>
              <Text style={ss.contactName} numberOfLines={1}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={ss.divider} />

        {/* Apps row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={ss.appsRow}>
          {SHARE_APPS.map(a => (
            <TouchableOpacity key={a.id} style={ss.appItem} onPress={onClose}>
              <View style={[ss.appIcon, { backgroundColor: a.bg }]}>
                <Text style={a.id === 'a4' ? ss.appIconTextLg : ss.appIconText}>{a.icon}</Text>
              </View>
              <Text style={ss.appName} numberOfLines={1}>{a.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={ss.divider} />

        {/* Options list */}
        {SHARE_OPTIONS.map((opt, i) => (
          <TouchableOpacity
            key={opt.id}
            style={[ss.optionRow, i < SHARE_OPTIONS.length - 1 && ss.optionBorder]}
            onPress={() => handleOption(opt.id)}
          >
            <Text style={ss.optionIcon}>{opt.icon}</Text>
            <Text style={ss.optionLabel}>
              {opt.id === 'o1' && copied ? 'Copied!' : opt.label}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Done */}
        <TouchableOpacity style={ss.doneBtn} onPress={onClose}>
          <Text style={ss.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }: any) {
  const [tab, setTab] = useState<'read' | 'watch'>('read');
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const [shareStory, setShareStory] = useState<any | null>(null);

  const toggleLike = (id: string) => {
    setLikedStories(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleStartNewQuest = () => {
    const setup = getQuestSetup();
    if (!setup.characterId) {
      navigation.navigate('CharacterSelect');
    } else if (!setup.themeId) {
      navigation.navigate('SkinSelect');
    } else {
      navigation.navigate('StoryExperience', { themeId: setup.themeId });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* ── Sticky Header ─────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MESSMER</Text>
      </View>

      {/* ── Tab Switcher ──────────────────────────────────── */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'read' && styles.tabBtnActive]}
          onPress={() => setTab('read')}
        >
          <Text style={[styles.tabBtnText, tab === 'read' && styles.tabBtnTextActive]}>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'watch' && styles.tabBtnActive]}
          onPress={() => setTab('watch')}
        >
          <Text style={[styles.tabBtnText, tab === 'watch' && styles.tabBtnTextActive]}>Watch</Text>
        </TouchableOpacity>
      </View>

      {/* ── Scrollable Content ────────────────────────────── */}
      <View style={styles.scrollWrapper}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {tab === 'read' ? (
            READ_STORIES.map((story) => {
              const isLiked = likedStories.has(story.id);
              return (
                <TouchableOpacity
                  key={story.id}
                  style={styles.heroCard}
                  onPress={() => navigation.navigate('StoryDetail', { story })}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: story.image }} style={styles.heroImage} resizeMode="cover" />
                  <View style={styles.heroGradient} />

                  {/* Like + Share icons top-right */}
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={[styles.actionBtn, isLiked && styles.actionBtnLiked]}
                      onPress={(e) => { e.stopPropagation?.(); toggleLike(story.id); }}
                    >
                      <Text style={[styles.actionIcon, isLiked && styles.actionIconLiked]}>
                        {isLiked ? '♥' : '♡'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={(e) => { e.stopPropagation?.(); setShareStory(story); }}
                    >
                      <HugeiconsIcon icon={Share02Icon} size={16} color={Colors.text} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.heroContent}>
                    <Text style={styles.heroCategory}>{story.category}</Text>
                    {/* 1 line max with ellipsis */}
                    <Text style={styles.heroTitle} numberOfLines={1}>{story.title}</Text>
                    {/* 2 lines max */}
                    <Text style={styles.heroDesc} numberOfLines={2}>{story.desc}</Text>
                    <TouchableOpacity
                      style={styles.continueBtn}
                      onPress={(e) => { e.stopPropagation?.(); navigation.navigate('StoryDetail', { story }); }}
                    >
                      <Text style={styles.continueBtnText}>READ STORY →</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            WATCH_STORIES.map((item) => {
              const isLiked = likedStories.has(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.heroCard}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
                  <View style={styles.heroGradient} />

                  {/* Play button centred on image */}
                  <View style={styles.playCircleWrap}>
                    <View style={styles.playCircle}>
                      <Text style={styles.playIcon}>▶</Text>
                    </View>
                  </View>

                  {/* Like + Share top-right */}
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={[styles.actionBtn, isLiked && styles.actionBtnLiked]}
                      onPress={(e) => { e.stopPropagation?.(); toggleLike(item.id); }}
                    >
                      <Text style={[styles.actionIcon, isLiked && styles.actionIconLiked]}>
                        {isLiked ? '♥' : '♡'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={(e) => { e.stopPropagation?.(); setShareStory(item); }}
                    >
                      <HugeiconsIcon icon={Share02Icon} size={16} color={Colors.text} />
                    </TouchableOpacity>
                  </View>

                  {/* Content overlay */}
                  <View style={styles.heroContent}>
                    <Text style={styles.heroCategory}>{item.category}</Text>
                    <Text style={styles.heroTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.heroDesc} numberOfLines={2}>{item.desc}</Text>
                    <TouchableOpacity style={styles.continueBtn}>
                      <Text style={styles.continueBtnText}>WATCH NOW →</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>

      {/* ── Sticky Bottom Nav ─────────────────────────────── */}
      <BottomNav active="explore" onNavigate={(s) => navigation.navigate(s)} />

      {/* ── Share Bottom Sheet ────────────────────────────── */}
      {shareStory && (
        <ShareSheet story={shareStory} onClose={() => setShareStory(null)} />
      )}
    </View>
  );
}

// ─── Main styles ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' as any },

  header: {
    height: 64,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.background,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: {
    color: Colors.gold, fontSize: 18,
    fontFamily: Typography.fontSerif, letterSpacing: 6,
  },

  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    marginHorizontal: 20, marginVertical: 12, borderRadius: Radius.xl, padding: 4,
  },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: Radius.xl, alignItems: 'center' },
  tabBtnActive: { backgroundColor: Colors.gold },
  tabBtnText: { color: Colors.textSecondary, fontSize: 14, fontWeight: '500' },
  tabBtnTextActive: { color: Colors.background, fontWeight: '700' },

  scrollWrapper: { flex: 1, flexBasis: 0, overflow: 'hidden' as any },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16, paddingTop: 4 },

  heroCard: {
    marginBottom: 16, borderRadius: Radius.md,
    overflow: 'hidden', borderWidth: 1, borderColor: Colors.border,
  },
  heroImage: { width: '100%', height: 280 },
  heroGradient: {
    position: 'absolute', top: 140, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  cardActions: {
    position: 'absolute', top: 12, right: 12,
    flexDirection: 'row', gap: 8,
  },
  actionBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  actionBtnLiked: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderColor: Colors.gold,
  },
  actionIcon: { color: Colors.text, fontSize: 15 },
  actionIconLiked: { color: Colors.gold, fontSize: 15 },

  heroContent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 18, paddingTop: 12, paddingBottom: 18, gap: 4,
  },
  heroCategory: { color: Colors.gold, fontSize: 10, letterSpacing: 2 },
  heroTitle: {
    color: Colors.text, fontSize: 18,
    fontFamily: Typography.fontSerif, lineHeight: 24,
  },
  heroDesc: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  continueBtn: { alignSelf: 'flex-start', marginTop: 6 },
  continueBtnText: { color: Colors.gold, fontSize: 11, letterSpacing: 2, fontWeight: '700' },

  // Play button — centred on image above gradient
  playCircleWrap: {
    position: 'absolute', top: 36, left: 0, right: 0,
    alignItems: 'center',
  },
  playCircle: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: 1.5, borderColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { color: Colors.gold, fontSize: 16, marginLeft: 3 },
});

// ─── Share sheet styles ────────────────────────────────────────────────────
const ss = StyleSheet.create({
  backdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
  },
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

  // Story preview
  previewRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, paddingHorizontal: 20, marginBottom: 16,
  },
  previewThumb: {
    width: 52, height: 52, borderRadius: 8,
    borderWidth: 1, borderColor: Colors.border,
  },
  previewText: { flex: 1 },
  previewCategory: { color: Colors.gold, fontSize: 9, letterSpacing: 2, marginBottom: 2 },
  previewTitle: { color: Colors.text, fontSize: 14, fontFamily: Typography.fontSerif },
  previewSub: { color: Colors.textMuted, fontSize: 11, marginTop: 2 },

  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },

  // Contacts
  contactsRow: { paddingHorizontal: 16, gap: 16 },
  contactItem: { alignItems: 'center', gap: 6, width: 60 },
  contactAvatar: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
  },
  contactAvatarBorder: {
    borderWidth: 1.5, borderColor: Colors.gold,
  },
  contactInitials: { fontSize: 18, color: Colors.text },
  contactName: {
    color: Colors.textSecondary, fontSize: 11,
    textAlign: 'center', width: 60,
  },

  // Apps
  appsRow: { paddingHorizontal: 16, gap: 16 },
  appItem: { alignItems: 'center', gap: 6, width: 64 },
  appIcon: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  appIconText: { fontSize: 22 },
  appIconTextLg: { fontSize: 20, color: '#fff', fontWeight: '700' },
  appName: { color: Colors.textSecondary, fontSize: 11, textAlign: 'center' },

  // Options
  optionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 20, paddingVertical: 14,
  },
  optionBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  optionIcon: { fontSize: 18, width: 26, textAlign: 'center' },
  optionLabel: { color: Colors.text, fontSize: 15 },

  // Done
  doneBtn: {
    marginHorizontal: 20, marginTop: 12,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md, paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  doneBtnText: { color: Colors.gold, fontSize: 15, fontWeight: '600' },
});
