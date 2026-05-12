import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, StatusBar, TextInput, Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Colors, Typography, Radius } from '../theme';
import BottomNav from '../components/BottomNav';
import { getGeneratedStories } from '../navigation/AppNavigator';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';

// ─── Static story data (same as Home) ─────────────────────────────────────
const READ_STORIES = [
  {
    id: '1', type: 'read',
    category: 'CULTURE / WEAVING',
    title: 'Shadows in the Loom: The New Noir',
    desc: 'Exploring the intersection of ancestral craftsmanship and the brutalist city...',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    id: '2', type: 'read',
    category: 'FICTION / DARK',
    title: 'The Architecture of Silent Echoes',
    desc: 'A labyrinthine journey through memory and forgotten spaces. Every choice reshapes...',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
  },
  {
    id: '3', type: 'read',
    category: 'MYTHOLOGY / EPIC',
    title: 'Edge of the Known',
    desc: 'Ancient maps end here. What lies beyond is yours to discover and define...',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
  },
];

const WATCH_STORIES = [
  {
    id: 'w1', type: 'watch',
    category: 'HISTORY / EPIC',
    title: 'Lost Myths of the Aurelian Empire',
    desc: 'Uncovering the forgotten age of stone and fire, where gods walked among mortals...',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
  },
  {
    id: 'w2', type: 'watch',
    category: 'SCI-FI / VISUAL',
    title: 'Neon Pasts & Electric Futures',
    desc: 'A weekly visual essay where cyberpunk aesthetics collide with ancient prophecy...',
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
  },
];

// ─── Search Screen ─────────────────────────────────────────────────────────
export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [generatedStories, setGeneratedStories] = useState<any[]>([]);
  const inputRef = useRef<any>(null);

  // Reload generated stories on focus; also auto-focus the input
  useFocusEffect(
    useCallback(() => {
      setGeneratedStories(getGeneratedStories());
      setTimeout(() => inputRef.current?.focus(), 120);
      return () => {
        // Clear query when leaving so next visit starts fresh
        setQuery('');
      };
    }, [])
  );

  const genWithType = generatedStories.map(s => ({
    ...s,
    type: s.format === 'video' ? 'watch' : 'read',
  }));
  const allStories = [...genWithType, ...READ_STORIES, ...WATCH_STORIES];

  const q = query.trim().toLowerCase();
  const results = q
    ? allStories.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.desc || '').toLowerCase().includes(q)
      )
    : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* ── Header / Search bar ───────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <HugeiconsIcon icon={Search01Icon} size={16} color={Colors.textMuted} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search stories, genres..."
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => setQuery('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── Body ─────────────────────────────────────────── */}
      <View style={styles.scrollWrapper}>
        {q.length === 0 ? (
          /* Prompt state — nothing typed yet */
          <View style={styles.emptyState}>
            <HugeiconsIcon icon={Search01Icon} size={36} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>Find your story</Text>
            <Text style={styles.emptySubtitle}>
              Search by title, genre, or description
            </Text>
          </View>
        ) : results.length === 0 ? (
          /* No results */
          <View style={styles.emptyState}>
            <Text style={styles.noResultsText}>No results for "{query}"</Text>
          </View>
        ) : (
          /* Results feed */
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {results.map((item) => {
              const isWatch = item.type === 'watch';
              const screen = isWatch ? 'WatchDetail' : 'StoryDetail';
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => navigation.navigate(screen, { story: item })}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
                  <View style={styles.cardGradient} />

                  {/* Type tag */}
                  <View style={[styles.typeTag, isWatch && styles.typeTagWatch]}>
                    <Text style={styles.typeTagText}>{isWatch ? '▶  WATCH' : '◎  READ'}</Text>
                  </View>

                  {/* Play icon for watch */}
                  {isWatch && (
                    <View style={styles.playCircleWrap}>
                      <View style={styles.playCircle}>
                        <Text style={styles.playIcon}>▶</Text>
                      </View>
                    </View>
                  )}

                  {/* Content */}
                  <View style={styles.cardContent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Text style={styles.cardCategory}>{item.category}</Text>
                      {item.createdAt && (
                        <View style={styles.createdBadge}>
                          <Text style={styles.createdBadgeText}>✦ YOURS</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
                    <TouchableOpacity
                      style={styles.ctaBtn}
                      onPress={() => navigation.navigate(screen, { story: item })}
                    >
                      <Text style={styles.ctaBtnText}>
                        {isWatch ? 'WATCH NOW →' : 'READ STORY →'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* ── Bottom Nav ───────────────────────────────────── */}
      <BottomNav active="search" onNavigate={(s) => navigation.navigate(s)} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' as any },

  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(10,10,10,0.82)' as any,
    borderBottomWidth: 1, borderBottomColor: 'rgba(42,42,42,0.5)',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    } : {}),
  } as any,

  searchRow: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,255,255,0.07)' as any,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radius.md, paddingHorizontal: 12, height: 40,
  },
  searchInput: {
    flex: 1, color: Colors.text, fontSize: 14,
    outlineStyle: 'none',
  } as any,

  scrollWrapper: { flex: 1, flexBasis: 0, overflow: 'hidden' as any },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12 },

  // Empty / prompt states
  emptyState: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingBottom: 60,
  },
  emptyTitle: {
    color: Colors.text, fontSize: 18, fontFamily: Typography.fontSerif,
  },
  emptySubtitle: {
    color: Colors.textMuted, fontSize: 13,
  },
  noResultsText: {
    color: Colors.textMuted, fontSize: 14, fontStyle: 'italic',
    textAlign: 'center', marginTop: 60,
  },

  // Cards (identical to HomeScreen feed cards)
  typeTag: {
    position: 'absolute', top: 12, left: 12, zIndex: 10,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(201,168,76,0.18)' as any,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.5)',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    } : {}),
  } as any,
  typeTagWatch: {
    backgroundColor: 'rgba(80,120,255,0.18)' as any,
    borderColor: 'rgba(80,120,255,0.5)',
  },
  typeTagText: {
    color: Colors.text, fontSize: 9, letterSpacing: 1.5, fontWeight: '700',
  },

  card: {
    marginBottom: 16, borderRadius: Radius.md,
    overflow: 'hidden', borderWidth: 1, borderColor: Colors.border,
  },
  cardImage: { width: '100%', height: 280 },
  cardGradient: {
    position: 'absolute', top: 140, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  cardContent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 18, paddingTop: 12, paddingBottom: 18, gap: 4,
  },
  cardCategory: { color: Colors.gold, fontSize: 10, letterSpacing: 2 },
  createdBadge: {
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.5)',
  },
  createdBadgeText: { color: Colors.gold, fontSize: 8, letterSpacing: 1.5, fontWeight: '700' },
  cardTitle: {
    color: Colors.text, fontSize: 18,
    fontFamily: Typography.fontSerif, lineHeight: 24,
  },
  cardDesc: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  ctaBtn: { alignSelf: 'flex-start', marginTop: 6 },
  ctaBtnText: { color: Colors.gold, fontSize: 11, letterSpacing: 2, fontWeight: '700' },

  playCircleWrap: {
    position: 'absolute', top: 36, left: 0, right: 0, alignItems: 'center',
  },
  playCircle: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: 1.5, borderColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { color: Colors.gold, fontSize: 16, marginLeft: 3 },
});
