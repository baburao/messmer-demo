import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform,
} from 'react-native';
import { Colors, Typography, Radius, isLightMode } from '../theme';
import BottomNav from '../components/BottomNav';
import { clearAuth } from '../navigation/AppNavigator';

const STATS = [
  { label: 'Stories\nStarted', value: '7' },
  { label: 'Chapters\nRead', value: '43' },
  { label: 'Choices\nMade', value: '218' },
];

const RECENT = [
  { title: 'The Architecture of Silent Echoes', progress: 15, genre: 'Thriller', bg: '#1A1208' },
  { title: 'Edge of the Known', progress: 62, genre: 'Sci-Fi', bg: '#0C0E1A' },
  { title: 'Shadows in the Loam', progress: 100, genre: 'Fantasy', bg: '#0E1318' },
];

const ACCOUNT_ITEMS = [
  { icon: '◎', label: 'Edit Profile' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '🔒', label: 'Privacy & Security' },
];

export default function ProfileScreen({ navigation }: any) {
  const [darkMode, setDarkMode] = useState(!isLightMode);

  const handleThemeToggle = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (Platform.OS === 'web') {
      try {
        if (next) {
          localStorage.removeItem('messmer_theme');
        } else {
          localStorage.setItem('messmer_theme', 'light');
        }
        // Reload so theme.ts re-evaluates Colors at module init
        setTimeout(() => { (window as any).location.reload(); }, 150);
      } catch {}
    }
  };

  const handleLogOut = () => {
    clearAuth();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.heroHeader}>
          <View style={styles.heroBg} />
          <View style={styles.heroBorder} />

          <View style={styles.profileAvatarBlock}>
            <View style={styles.avatarRing}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JT</Text>
              </View>
            </View>
            <Text style={styles.profileName}>Julian Thorne</Text>
            <Text style={styles.profileEmail}>julian@messmer.io</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberBadgeText}>✦ Premium Member</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {STATS.map((s, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Currently Reading ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CURRENTLY READING</Text>
          {RECENT.map((r, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.readingCard, { backgroundColor: r.bg }]}
              onPress={() => navigation.navigate('StoryDetail', { story: r })}
              activeOpacity={0.85}
            >
              <View style={styles.readingThumb}>
                <View style={styles.thumbBar} />
                <View style={[styles.thumbBar, { width: '70%', opacity: 0.5 }]} />
              </View>
              <View style={styles.readingInfo}>
                <Text style={styles.readingGenre}>{r.genre.toUpperCase()}</Text>
                <Text style={styles.readingTitle} numberOfLines={2}>{r.title}</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${r.progress}%` as any }]} />
                </View>
                <Text style={styles.progressPct}>{r.progress}% complete</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Account ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.settingsList}>
            {ACCOUNT_ITEMS.map((item, i) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.settingsRow, i === ACCOUNT_ITEMS.length - 1 && styles.settingsRowLast]}
                activeOpacity={0.7}
              >
                <Text style={styles.settingsIcon}>{item.icon}</Text>
                <Text style={styles.settingsLabel}>{item.label}</Text>
                <Text style={styles.settingsArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Appearance ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APPEARANCE</Text>
          <View style={styles.settingsList}>
            <TouchableOpacity
              style={[styles.settingsRow, styles.settingsRowLast]}
              onPress={handleThemeToggle}
              activeOpacity={0.7}
            >
              <Text style={styles.settingsIcon}>{darkMode ? '🌙' : '☀️'}</Text>
              <Text style={styles.settingsLabel}>{darkMode ? 'Dark Mode' : 'Light Mode'}</Text>
              {/* Toggle pill */}
              <View style={[styles.toggle, darkMode && styles.toggleActive]}>
                <View style={[styles.toggleThumb, darkMode && styles.toggleThumbRight]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Danger zone ── */}
        <View style={styles.section}>
          <View style={styles.dangerCard}>
            <TouchableOpacity style={styles.dangerRow} onPress={handleLogOut} activeOpacity={0.7}>
              <Text style={styles.dangerIcon}>⬡</Text>
              <Text style={styles.dangerLabel}>Log Out</Text>
            </TouchableOpacity>
            <View style={styles.settingsDivider} />
            <TouchableOpacity style={styles.dangerRow} activeOpacity={0.7}>
              <Text style={styles.dangerIcon}>↩</Text>
              <Text style={[styles.dangerLabel, { color: Colors.danger }]}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNav active="profile" onNavigate={(s) => navigation.navigate(s)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  heroHeader: { paddingBottom: 24, marginBottom: 4 },
  heroBg: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 160,
    backgroundColor: '#0E0A04',
  },
  heroBorder: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
    backgroundColor: Colors.border,
  },
  profileAvatarBlock: { alignItems: 'center', paddingTop: 56, gap: 6, marginBottom: 20 },
  avatarRing: {
    width: 88, height: 88, borderRadius: 44,
    borderWidth: 2, borderColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  avatar: {
    width: 78, height: 78, borderRadius: 39,
    backgroundColor: Colors.surfaceLight, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Colors.gold, fontSize: Typography.sizes.xl, fontWeight: '700' },
  profileName: {
    color: Colors.text, fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontSerif,
  },
  profileEmail: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  memberBadge: {
    borderWidth: 1, borderColor: Colors.gold, borderRadius: Radius.full,
    paddingHorizontal: 12, paddingVertical: 4, marginTop: 4,
  },
  memberBadgeText: { color: Colors.gold, fontSize: Typography.sizes.xs, letterSpacing: 1 },

  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    marginHorizontal: 24, paddingVertical: 16,
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCard,
  },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { color: Colors.gold, fontSize: Typography.sizes.xl, fontFamily: Typography.fontSerif },
  statLabel: { color: Colors.textMuted, fontSize: 10, letterSpacing: 0.5, textAlign: 'center' },

  section: { paddingHorizontal: 24, paddingTop: 24, gap: 12 },
  sectionTitle: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 3 },

  readingCard: {
    flexDirection: 'row', alignItems: 'center', borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border, padding: 14, gap: 14, marginBottom: 10,
  },
  readingThumb: {
    width: 56, height: 72, borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.06)', justifyContent: 'center', padding: 10, gap: 8,
  },
  thumbBar: { height: 1.5, width: '100%', backgroundColor: 'rgba(201,168,76,0.4)' },
  readingInfo: { flex: 1, gap: 5 },
  readingGenre: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 2 },
  readingTitle: { color: Colors.text, fontSize: Typography.sizes.md, fontFamily: Typography.fontSerif, lineHeight: 20 },
  progressTrack: { height: 2, backgroundColor: Colors.border, borderRadius: 1, overflow: 'hidden' as any },
  progressFill: { height: '100%' as any, backgroundColor: Colors.gold },
  progressPct: { color: Colors.textMuted, fontSize: 10, letterSpacing: 0.5 },
  chevron: { color: Colors.textMuted, fontSize: 22 },

  settingsList: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCard, overflow: 'hidden' as any,
  },
  settingsRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 14,
  },
  settingsRowLast: { borderBottomWidth: 0 },
  settingsIcon: { fontSize: 16, width: 22 },
  settingsLabel: { color: Colors.text, fontSize: Typography.sizes.md, flex: 1 },
  settingsArrow: { color: Colors.textMuted, fontSize: 20 },

  // Toggle pill
  toggle: {
    width: 44, height: 24, borderRadius: 12,
    backgroundColor: Colors.border,
    justifyContent: 'center', paddingHorizontal: 3,
  },
  toggleActive: { backgroundColor: Colors.gold },
  toggleThumb: {
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: Colors.background,
    alignSelf: 'flex-start',
  },
  toggleThumbRight: { alignSelf: 'flex-end' },

  settingsDivider: { height: 1, backgroundColor: Colors.border },

  dangerCard: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCard, overflow: 'hidden' as any,
  },
  dangerRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14, gap: 14,
  },
  dangerIcon: { fontSize: 16, width: 22, color: Colors.textSecondary },
  dangerLabel: { color: Colors.textSecondary, fontSize: Typography.sizes.md },
});
