import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, ScrollView,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import { saveQuestSetup } from '../navigation/AppNavigator';

const THEMES = [
  {
    id: 'neon',
    name: 'NEON RAIN',
    desc: 'Cyberpunk city nights, neon-lit alleys, electric tension',
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
  },
  {
    id: 'woods',
    name: 'SILENT WOODS',
    desc: 'Ancient forests, misty trails, whispers in the dark',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
  },
];

export default function SkinSelectScreen({ navigation }: any) {
  const [selected, setSelected] = useState<string>('neon');

  const handleBeginQuest = () => {
    saveQuestSetup('themeId', selected);
    navigation.navigate('StoryExperience', { themeId: selected });
  };

  return (
    <View style={styles.container}>
      {/* ── Sticky Header ───────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CHOOSE THEME</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* ── Scrollable Content ──────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Themes set the visual mood of your quest.{'\n'}They work with any story type.
        </Text>

        {THEMES.map((theme) => {
          const isSelected = selected === theme.id;
          return (
            <TouchableOpacity
              key={theme.id}
              style={[styles.themeCard, isSelected && styles.themeCardSelected]}
              onPress={() => setSelected(theme.id)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: theme.image }} style={styles.themeImage} resizeMode="cover" />
              <View style={[styles.themeOverlay, isSelected && styles.themeOverlaySelected]} />

              {/* Radio indicator */}
              <View style={styles.radioWrapper}>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </View>

              {/* Name + desc */}
              <View style={styles.themeTextBlock}>
                <Text style={styles.themeName}>{theme.name}</Text>
                <Text style={styles.themeDesc}>{theme.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Sticky Footer CTA ───────────────────────────── */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.beginBtn} onPress={handleBeginQuest} activeOpacity={0.85}>
          <Text style={styles.beginBtnText}>BEGIN QUEST  →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 54, paddingBottom: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backIcon: { color: Colors.gold, fontSize: 22 },
  headerTitle: { color: Colors.gold, fontSize: 13, letterSpacing: 3, fontWeight: '700' },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },

  subtitle: {
    color: Colors.textSecondary, fontSize: 13, lineHeight: 20,
    textAlign: 'center', marginBottom: 20,
  },

  themeCard: {
    width: '100%', height: 190, borderRadius: Radius.md,
    overflow: 'hidden', marginBottom: 14,
    borderWidth: 2, borderColor: Colors.border,
    justifyContent: 'flex-end',
  },
  themeCardSelected: { borderColor: Colors.gold },
  themeImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  themeOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  themeOverlaySelected: { backgroundColor: 'rgba(0,0,0,0.2)' },

  radioWrapper: { position: 'absolute', top: 12, right: 12 },
  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  radioSelected: { borderColor: Colors.gold },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: Colors.gold },

  themeTextBlock: { padding: 16 },
  themeName: {
    color: Colors.text, fontSize: 18,
    fontFamily: Typography.fontSerif, letterSpacing: 3, fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4,
  },
  themeDesc: {
    color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 3,
    textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3,
  },

  footer: { padding: 20, paddingBottom: 36, backgroundColor: Colors.background },
  beginBtn: {
    backgroundColor: Colors.gold, borderRadius: Radius.md,
    paddingVertical: 18, alignItems: 'center',
  },
  beginBtnText: { color: Colors.background, fontSize: 14, letterSpacing: 3, fontWeight: '700' },
});
