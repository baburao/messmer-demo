import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import GoldButton from '../components/GoldButton';

const STORY_DATA = {
  title: 'The Architecture of Silent Echoes',
  author: 'Julian Thorne',
  genre: 'Psychological Thriller',
  chapters: 12,
  duration: '4h',
  rating: '4.8',
  synopsis: `In a city where memories are architecture, you are the last surveyor. Buildings crumble when forgotten. Streets twist when misremembered. You must navigate the dying districts of your own mind — piecing together what was lost before the city falls entirely.\n\nEvery path you take rewrites the map. Every choice leaves a scar in the stone.`,
  tags: ['Psychological', 'Mystery', 'Atmospheric', 'Branching'],
  bg: '#1A1208',
};

export default function StoryDetailScreen({ navigation, route }: any) {
  const story = route?.params?.story || STORY_DATA;

  return (
    <View style={styles.container}>
      {/* Hero cover */}
      <View style={[styles.hero, { backgroundColor: story.bg || STORY_DATA.bg }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Visual texture */}
        <View style={styles.heroPattern}>
          {[...Array(6)].map((_, i) => (
            <View key={i} style={[styles.heroLine, { width: `${90 - i * 12}%`, opacity: 0.15 + i * 0.03 }]} />
          ))}
        </View>

        {/* Title block */}
        <View style={styles.heroContent}>
          <Text style={styles.heroGenre}>{story.genre || STORY_DATA.genre}</Text>
          <Text style={styles.heroTitle}>{story.title}</Text>
          <Text style={styles.heroAuthor}>by {STORY_DATA.author}</Text>
        </View>

        {/* Fade to black */}
        <View style={styles.heroFade} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.stats}>
          {[
            { label: 'Chapters', val: String(story.chapters || STORY_DATA.chapters) },
            { label: 'Duration', val: story.duration || STORY_DATA.duration },
            { label: 'Rating', val: '★ ' + STORY_DATA.rating },
          ].map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.dividerLine} />

        {/* Synopsis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsis}>{STORY_DATA.synopsis}</Text>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Themes</Text>
          <View style={styles.tags}>
            {STORY_DATA.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Chapters preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chapters</Text>
          {[
            'Prologue: The Last Cartographer',
            'I. The Forgotten District',
            'II. Where Streets Become Mirrors',
          ].map((ch, i) => (
            <View key={i} style={styles.chapterRow}>
              <Text style={styles.chapterNum}>{String(i + 1).padStart(2, '0')}</Text>
              <Text style={styles.chapterTitle}>{ch}</Text>
              {i === 0 ? (
                <View style={styles.freeBadge}><Text style={styles.freeBadgeText}>FREE</Text></View>
              ) : (
                <Text style={styles.lockedIcon}>🔒</Text>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.moreChapters}>
            <Text style={styles.moreChaptersText}>View all 12 chapters →</Text>
          </TouchableOpacity>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctas}>
          <GoldButton
            title="Begin Journey"
            onPress={() => navigation.navigate('CharacterSelect', { story })}
          />
          <GoldButton
            title="Add to Library"
            onPress={() => {}}
            outline
            style={{ marginTop: 12 }}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { height: 340, position: 'relative', justifyContent: 'flex-end' },
  backBtn: { position: 'absolute', top: 56, left: 20, zIndex: 10 },
  backText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, letterSpacing: 1 },
  heroPattern: {
    position: 'absolute', bottom: 60, left: 0, right: 0,
    alignItems: 'center', gap: 16,
  },
  heroLine: { height: 1, backgroundColor: Colors.gold },
  heroContent: { padding: 24, zIndex: 2, gap: 6 },
  heroGenre: { color: Colors.gold, fontSize: Typography.sizes.xs, letterSpacing: 3 },
  heroTitle: {
    color: Colors.text, fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontSerif, lineHeight: 28,
  },
  heroAuthor: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, marginTop: 4 },
  heroFade: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
    backgroundColor: Colors.background,
  },
  body: { flex: 1 },
  stats: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingHorizontal: 24, paddingVertical: 20,
  },
  statItem: { alignItems: 'center', gap: 4 },
  statVal: { color: Colors.gold, fontSize: Typography.sizes.lg, fontFamily: Typography.fontSerif },
  statLabel: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 1 },
  dividerLine: { height: 1, backgroundColor: Colors.border, marginHorizontal: 24 },
  section: { paddingHorizontal: 24, paddingTop: 24, gap: 12 },
  sectionTitle: {
    color: Colors.textSecondary, fontSize: Typography.sizes.xs,
    letterSpacing: 3, textTransform: 'uppercase',
  },
  synopsis: {
    color: Colors.text, fontSize: Typography.sizes.md,
    lineHeight: 24, fontFamily: Typography.fontSerif,
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.full,
    paddingHorizontal: 14, paddingVertical: 6,
  },
  tagText: { color: Colors.textSecondary, fontSize: Typography.sizes.xs, letterSpacing: 1 },
  chapterRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 14,
  },
  chapterNum: { color: Colors.textMuted, fontSize: Typography.sizes.sm, width: 24 },
  chapterTitle: { color: Colors.text, fontSize: Typography.sizes.md, flex: 1 },
  freeBadge: {
    backgroundColor: 'rgba(201,168,76,0.15)', borderRadius: Radius.sm,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  freeBadgeText: { color: Colors.gold, fontSize: 9, letterSpacing: 1, fontWeight: '700' },
  lockedIcon: { fontSize: 14, opacity: 0.5 },
  moreChapters: { paddingVertical: 12 },
  moreChaptersText: { color: Colors.gold, fontSize: Typography.sizes.sm },
  ctas: { paddingHorizontal: 24, paddingTop: 24 },
});
