import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, StatusBar, TextInput, Platform, Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import BottomNav from '../components/BottomNav';
import { getGeneratedStories } from '../navigation/AppNavigator';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';

const { width } = Dimensions.get('window');
const TRENDING_CARD_W = width * 0.68;
const POPULAR_CARD_W  = (width - Spacing.md * 2 - Spacing.sm) / 2;

// ─── Story data ────────────────────────────────────────────────────────────
const ALL_STORIES = [
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
  {
    id: '4', type: 'read',
    category: 'HORROR / GOTHIC',
    title: 'The House That Breathes',
    desc: 'Every room a memory. Every memory a wound. Some doors should never be opened...',
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
  },
  {
    id: '5', type: 'read',
    category: 'THRILLER / NOIR',
    title: 'Three Days in the Dark City',
    desc: 'A detective. A missing heir. And a city that swallows secrets whole...',
    image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&q=80',
  },
  {
    id: 'w3', type: 'watch',
    category: 'DOCUMENTARY / ART',
    title: 'The Last Ink Masters',
    desc: 'Following three ageing calligraphers preserving a dying art form across Asia...',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  },
  {
    id: '6', type: 'read',
    category: 'ROMANCE / LITERARY',
    title: 'Letters Never Sent',
    desc: 'Two writers across continents. One manuscript. A love story told in margins...',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80',
  },
  {
    id: 'w4', type: 'watch',
    category: 'SCI-FI / CINEMATIC',
    title: 'Meridian',
    desc: 'A lone astronaut receives a signal from the edge of the known universe...',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
  },
];

// Curated sections
const TRENDING  = ALL_STORIES.slice(0, 4);                   // first 4 as trending
const POPULAR   = [ALL_STORIES[4], ALL_STORIES[5], ALL_STORIES[6], ALL_STORIES[7]]; // next 4
const EDITORS   = [ALL_STORIES[8], ALL_STORIES[9]];           // editors' picks

const GENRE_FILTERS = ['ALL', 'READ', 'WATCH', 'DARK FANTASY', 'SCI-FI', 'MYTHOLOGY', 'HORROR', 'NOIR'];

// ─── Shared card helpers ───────────────────────────────────────────────────
function TypeTag({ isWatch }: { isWatch: boolean }) {
  return (
    <View style={[t.tag, isWatch && t.tagWatch]}>
      <Text style={t.tagText}>{isWatch ? '▶  WATCH' : '◎  READ'}</Text>
    </View>
  );
}
const t = StyleSheet.create({
  tag: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 4,
    backgroundColor: 'rgba(201,168,76,0.18)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.5)',
  },
  tagWatch: { backgroundColor: 'rgba(80,120,255,0.18)', borderColor: 'rgba(80,120,255,0.5)' },
  tagText: { color: Colors.text, fontSize: 8, letterSpacing: 1.5, fontWeight: '700' },
});

// ─── Screen ────────────────────────────────────────────────────────────────
export default function SearchScreen({ navigation }: any) {
  const [query,            setQuery]            = useState('');
  const [activeFilter,     setActiveFilter]      = useState('ALL');
  const [generatedStories, setGeneratedStories]  = useState<any[]>([]);
  const inputRef = useRef<any>(null);

  useFocusEffect(
    useCallback(() => {
      setGeneratedStories(getGeneratedStories());
      return () => setQuery('');
    }, [])
  );

  const genWithType = generatedStories.map(s => ({
    ...s,
    type: s.format === 'video' ? 'watch' : 'read',
  }));
  const allStories = [...genWithType, ...ALL_STORIES];

  // Search results
  const q = query.trim().toLowerCase();
  const searchResults = q
    ? allStories.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.desc || '').toLowerCase().includes(q)
      )
    : [];

  const navigate = (item: any) =>
    navigation.navigate(item.type === 'watch' ? 'WatchDetail' : 'StoryDetail', { story: item });

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Header ──────────────────────────────────────────── */}
      <View style={s.header as any}>
        <Text style={s.headerTitle}>EXPLORE</Text>
        <View style={s.searchRow}>
          <HugeiconsIcon icon={Search01Icon} size={15} color={Colors.textMuted} />
          <TextInput
            ref={inputRef}
            style={s.searchInput as any}
            value={query}
            onChangeText={setQuery}
            placeholder="Search stories, genres..."
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <HugeiconsIcon icon={Cancel01Icon} size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={s.scrollWrapper}>
        {q.length > 0 ? (
          /* ── Search results ─────────────────────────────── */
          <ScrollView style={s.scroll} contentContainerStyle={s.scrollPad}
            showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {searchResults.length === 0 ? (
              <View style={s.noResults}>
                <Text style={s.noResultsText}>No results for "{query}"</Text>
              </View>
            ) : (
              searchResults.map(item => (
                <FullCard key={item.id} item={item} onPress={() => navigate(item)} />
              ))
            )}
          </ScrollView>
        ) : (
          /* ── Popular feed ───────────────────────────────── */
          <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">

            {/* Genre filter pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.filtersRow}>
              {GENRE_FILTERS.map(f => {
                const sel = activeFilter === f;
                return (
                  <TouchableOpacity key={f}
                    style={[s.filterPill, sel && s.filterPillSel]}
                    onPress={() => setActiveFilter(f)} activeOpacity={0.8}>
                    <Text style={[s.filterPillText, sel && s.filterPillTextSel]}>{f}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* ── Trending Now ── */}
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>TRENDING NOW</Text>
              <Text style={s.sectionSub}>Most read this week</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.trendingRow} decelerationRate="fast"
              snapToInterval={TRENDING_CARD_W + 12}>
              {TRENDING.map((item, idx) => {
                const isWatch = item.type === 'watch';
                return (
                  <TouchableOpacity key={item.id}
                    style={[s.trendingCard, idx === 0 && { marginLeft: Spacing.md }]}
                    onPress={() => navigate(item)} activeOpacity={0.88}>
                    <Image source={{ uri: item.image }} style={s.trendingImage} resizeMode="cover" />
                    <View style={s.trendingGrad} />
                    <View style={s.trendingTagRow}><TypeTag isWatch={isWatch} /></View>
                    {isWatch && (
                      <View style={s.trendingPlay}>
                        <View style={s.playCircle}><Text style={s.playIcon}>▶</Text></View>
                      </View>
                    )}
                    <View style={s.trendingContent}>
                      <Text style={s.trendingRank}>#{idx + 1}</Text>
                      <Text style={s.trendingCategory}>{item.category}</Text>
                      <Text style={s.trendingTitle} numberOfLines={2}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              <View style={{ width: Spacing.md }} />
            </ScrollView>

            {/* ── Popular Picks ── */}
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>POPULAR PICKS</Text>
              <Text style={s.sectionSub}>Curated for you</Text>
            </View>
            <View style={s.popularGrid}>
              {POPULAR.map(item => {
                const isWatch = item.type === 'watch';
                return (
                  <TouchableOpacity key={item.id}
                    style={s.popularCard}
                    onPress={() => navigate(item)} activeOpacity={0.88}>
                    <Image source={{ uri: item.image }} style={s.popularImage} resizeMode="cover" />
                    <View style={s.popularGrad} />
                    <View style={s.popularTagRow}><TypeTag isWatch={isWatch} /></View>
                    {isWatch && (
                      <View style={s.popularPlay}>
                        <View style={s.playCircleSm}><Text style={s.playIconSm}>▶</Text></View>
                      </View>
                    )}
                    <View style={s.popularContent}>
                      <Text style={s.popularCategory}>{item.category}</Text>
                      <Text style={s.popularTitle} numberOfLines={2}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ── Editors' Picks ── */}
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>EDITORS' PICKS</Text>
              <Text style={s.sectionSub}>Not to be missed</Text>
            </View>
            {EDITORS.map(item => (
              <FullCard key={item.id} item={item} onPress={() => navigate(item)} />
            ))}

            <View style={{ height: 24 }} />
          </ScrollView>
        )}
      </View>

      <BottomNav active="explore" onNavigate={(sc) => navigation.navigate(sc)} />
    </View>
  );
}

// ─── Full-width feed card (search results + editors' picks) ───────────────
function FullCard({ item, onPress }: { item: any; onPress: () => void }) {
  const isWatch = item.type === 'watch';
  return (
    <TouchableOpacity style={fc.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: item.image }} style={fc.image} resizeMode="cover" />
      <View style={fc.gradient} />
      <View style={fc.tagRow}><TypeTag isWatch={isWatch} /></View>
      {isWatch && (
        <View style={fc.playWrap}>
          <View style={fc.playCircle}><Text style={fc.playIcon}>▶</Text></View>
        </View>
      )}
      <View style={fc.content}>
        <Text style={fc.category}>{item.category}</Text>
        <Text style={fc.title} numberOfLines={1}>{item.title}</Text>
        <Text style={fc.desc} numberOfLines={2}>{item.desc}</Text>
        <Text style={fc.cta}>{isWatch ? 'WATCH NOW →' : 'READ STORY →'}</Text>
      </View>
    </TouchableOpacity>
  );
}
const fc = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.md, marginBottom: 14,
    borderRadius: Radius.md, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border,
  },
  image: { width: '100%', height: 240 },
  gradient: { position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.82)' },
  tagRow: { position: 'absolute', top: 12, left: 12 },
  playWrap: { position: 'absolute', top: 28, left: 0, right: 0, alignItems: 'center' },
  playCircle: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(0,0,0,0.55)', borderWidth: 1.5, borderColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { color: Colors.gold, fontSize: 14, marginLeft: 2 },
  content: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, gap: 3 },
  category: { color: Colors.gold, fontSize: 10, letterSpacing: 2 },
  title: { color: Colors.text, fontSize: 17, fontFamily: Typography.fontSerif },
  desc: { color: Colors.textSecondary, fontSize: 12, lineHeight: 18 },
  cta: { color: Colors.gold, fontSize: 10, letterSpacing: 2, fontWeight: '700', marginTop: 4 },
});

// ─── Styles ───────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' as any },

  header: {
    paddingHorizontal: Spacing.md, paddingBottom: 10,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 12 : 12,
    backgroundColor: 'rgba(10,10,10,0.82)' as any,
    borderBottomWidth: 1, borderBottomColor: 'rgba(42,42,42,0.5)',
    gap: 10,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' } : {}),
  },
  headerTitle: {
    color: Colors.gold, fontSize: 18,
    fontFamily: Typography.fontSerif, letterSpacing: 6,
  },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,255,255,0.07)' as any,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radius.md, paddingHorizontal: 12, height: 38,
  },
  searchInput: { flex: 1, color: Colors.text, fontSize: 13, outlineStyle: 'none' },

  scrollWrapper: { flex: 1, flexBasis: 0, overflow: 'hidden' as any },
  scroll: { flex: 1 },
  scrollPad: { paddingTop: 12, paddingBottom: 16 },

  noResults: { paddingTop: 60, alignItems: 'center' },
  noResultsText: { color: Colors.textMuted, fontSize: 14, fontStyle: 'italic' },

  // Genre filter pills
  filtersRow: { paddingHorizontal: Spacing.md, paddingVertical: 14, gap: 8 },
  filterPill: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface,
  },
  filterPillSel: { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.12)' },
  filterPillText: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600', letterSpacing: 1 },
  filterPillTextSel: { color: Colors.gold },

  // Section headers
  sectionHeader: {
    flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, marginBottom: 12, marginTop: 4,
  },
  sectionTitle: { fontSize: 11, color: Colors.text, letterSpacing: 2.5, fontWeight: '700' },
  sectionSub: { fontSize: 11, color: Colors.textMuted },

  // Trending horizontal scroll
  trendingRow: { gap: 12, paddingBottom: 20 },
  trendingCard: {
    width: TRENDING_CARD_W, height: 220, borderRadius: Radius.md,
    overflow: 'hidden', borderWidth: 1, borderColor: Colors.border,
  },
  trendingImage: { width: '100%', height: 220 },
  trendingGrad: { position: 'absolute', top: 80, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)' },
  trendingTagRow: { position: 'absolute', top: 10, left: 10 },
  trendingPlay: { position: 'absolute', top: 20, left: 0, right: 0, alignItems: 'center' },
  trendingContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, gap: 2 },
  trendingRank: { fontSize: 11, color: Colors.gold, fontWeight: '700', letterSpacing: 1 },
  trendingCategory: { fontSize: 9, color: Colors.textMuted, letterSpacing: 2 },
  trendingTitle: { color: Colors.text, fontSize: 15, fontFamily: Typography.fontSerif, lineHeight: 20 },

  // Popular 2-col grid
  popularGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: Spacing.md, gap: Spacing.sm, marginBottom: 20,
  },
  popularCard: {
    width: POPULAR_CARD_W, height: 180, borderRadius: Radius.md,
    overflow: 'hidden', borderWidth: 1, borderColor: Colors.border,
  },
  popularImage: { width: '100%', height: 180 },
  popularGrad: { position: 'absolute', top: 70, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.82)' },
  popularTagRow: { position: 'absolute', top: 8, left: 8 },
  popularPlay: { position: 'absolute', top: 14, left: 0, right: 0, alignItems: 'center' },
  popularContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, gap: 2 },
  popularCategory: { fontSize: 8, color: Colors.gold, letterSpacing: 1.5 },
  popularTitle: { color: Colors.text, fontSize: 12, fontFamily: Typography.fontSerif, lineHeight: 16 },

  // Shared play buttons
  playCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.55)', borderWidth: 1.5, borderColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { color: Colors.gold, fontSize: 12, marginLeft: 2 },
  playCircleSm: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.55)', borderWidth: 1, borderColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  playIconSm: { color: Colors.gold, fontSize: 10, marginLeft: 2 },
});
