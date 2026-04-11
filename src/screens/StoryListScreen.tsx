import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import BottomNav from '../components/BottomNav';

const GENRES = ['All', 'Fantasy', 'Thriller', 'Sci-Fi', 'Experimental', 'Horror'];

const STORIES = [
  { id: '1', title: 'The Architecture of Silent Echoes', genre: 'Thriller', chapters: 12, duration: '4h', bg: '#1A1208', new: true },
  { id: '2', title: 'Shadows in the Loam', genre: 'Fantasy', chapters: 8, duration: '2h 30m', bg: '#0E1318', new: false },
  { id: '3', title: 'Concrete Poetry & Primal Forms', genre: 'Experimental', chapters: 6, duration: '1h 45m', bg: '#14100C', new: true },
  { id: '4', title: 'Edge of the Known', genre: 'Sci-Fi', chapters: 15, duration: '5h', bg: '#0C0E1A', new: false },
  { id: '5', title: 'The Drift — Knight in Armor', genre: 'Fantasy', chapters: 10, duration: '3h', bg: '#100C18', new: false },
  { id: '6', title: 'The Architect — Wizard in Robes', genre: 'Fantasy', chapters: 9, duration: '2h 50m', bg: '#0A1010', new: true },
  { id: '7', title: 'Neon Requiem', genre: 'Sci-Fi', chapters: 7, duration: '2h 15m', bg: '#0C0C1A', new: false },
  { id: '8', title: 'The Pale Threshold', genre: 'Horror', chapters: 11, duration: '3h 30m', bg: '#100808', new: true },
];

export default function StoryListScreen({ navigation }: any) {
  const [activeGenre, setActiveGenre] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = STORIES.filter((s) => {
    const matchGenre = activeGenre === 'All' || s.genre === activeGenre;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSub}>DISCOVER</Text>
          <Text style={styles.headerTitle}>Stories</Text>
          <View style={styles.headerLine} />
        </View>

        {/* Search */}
        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search stories..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Genre Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll} contentContainerStyle={styles.genreContent}>
          {GENRES.map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.genreChip, activeGenre === g && styles.genreChipActive]}
              onPress={() => setActiveGenre(g)}
            >
              <Text style={[styles.genreText, activeGenre === g && styles.genreTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Story Cards */}
        <View style={styles.list}>
          {filtered.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={[styles.card, { backgroundColor: story.bg }]}
              onPress={() => navigation.navigate('StoryDetail', { story })}
              activeOpacity={0.85}
            >
              {story.new && <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>}
              <View style={styles.cardThumb}>
                <View style={styles.cardThumbPattern}>
                  {[...Array(4)].map((_, i) => (
                    <View key={i} style={[styles.patternLine, { width: `${80 - i * 15}%` }]} />
                  ))}
                </View>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardGenre}>{story.genre.toUpperCase()}</Text>
                <Text style={styles.cardTitle} numberOfLines={2}>{story.title}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>📖 {story.chapters} chapters</Text>
                  <Text style={styles.cardMetaText}>⏱ {story.duration}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNav active="stories" onNavigate={(s) => navigation.navigate(s)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 16 },
  headerSub: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 4, marginBottom: 4 },
  headerTitle: {
    color: Colors.text, fontSize: Typography.sizes.xxxl,
    fontFamily: Typography.fontSerif, letterSpacing: 2, marginBottom: 12,
  },
  headerLine: { width: 40, height: 2, backgroundColor: Colors.gold },

  searchWrapper: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 24,
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 14, marginBottom: 16,
  },
  searchIcon: { color: Colors.textMuted, fontSize: 18, marginRight: 8 },
  searchInput: { flex: 1, color: Colors.text, height: 46, fontSize: Typography.sizes.md, outlineWidth: 0 },

  genreScroll: { marginBottom: 20 },
  genreContent: { paddingHorizontal: 24, gap: 8 },
  genreChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.border, backgroundColor: 'rgba(255,255,255,0.02)',
  },
  genreChipActive: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  genreText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, letterSpacing: 0.5 },
  genreTextActive: { color: Colors.background, fontWeight: '700' },

  list: { paddingHorizontal: 24, gap: 12 },
  card: {
    flexDirection: 'row', alignItems: 'center', borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border, padding: 14, gap: 14,
  },
  newBadge: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: Colors.gold, borderRadius: Radius.sm, paddingHorizontal: 6, paddingVertical: 2,
  },
  newBadgeText: { color: Colors.background, fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  cardThumb: {
    width: 68, height: 84, borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', padding: 12,
  },
  cardThumbPattern: { gap: 8 },
  patternLine: { height: 1.5, backgroundColor: 'rgba(201,168,76,0.3)' },
  cardInfo: { flex: 1, gap: 5 },
  cardGenre: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 2 },
  cardTitle: {
    color: Colors.text, fontSize: Typography.sizes.md,
    fontFamily: Typography.fontSerif, lineHeight: 22,
  },
  cardMeta: { flexDirection: 'row', gap: 14 },
  cardMetaText: { color: Colors.textMuted, fontSize: Typography.sizes.xs },
  chevron: { color: Colors.textMuted, fontSize: 22 },
});
