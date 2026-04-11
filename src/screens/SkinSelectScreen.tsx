import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import { CHARACTER_SKINS, CHARACTERS, CharacterSkin } from '../services/aiService';

const { width } = Dimensions.get('window');
const SKIN_CARD_WIDTH = (width - Spacing.md * 2 - Spacing.sm) / 2;

export default function SkinSelectScreen({ navigation, route }: any) {
  const { themeId, characterId } = route.params ?? {};

  const themeChars = CHARACTERS[themeId as keyof typeof CHARACTERS] ?? [];
  const character = themeChars.find((c: any) => c.id === characterId) ?? themeChars[0];

  const [selectedSkin, setSelectedSkin] = useState<CharacterSkin | null>(null);

  const handleBegin = () => {
    if (!selectedSkin) return;
    navigation.navigate('QuestScreen', { themeId, characterId, skinId: selectedSkin.id });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* ── Header ── */}
      <SafeAreaView style={styles.headerSafe}>
        <View
          style={[
            styles.header,
            Platform.OS === 'web' && (styles.headerWeb as any),
          ]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>CHOOSE YOUR LOOK</Text>

          <View style={styles.backButton} />
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Character summary ── */}
        {character && (
          <View style={styles.characterSummary}>
            <Image
              source={{ uri: character.image }}
              style={styles.charPortrait}
              resizeMode="cover"
            />
            <View style={styles.charMeta}>
              <Text style={styles.charName}>{character.name}</Text>
              <Text style={styles.charRole}>{character.role}</Text>
              <Text style={styles.charDesc}>{character.description}</Text>
            </View>
          </View>
        )}

        <View style={styles.divider} />

        {/* ── Skin section label ── */}
        <Text style={styles.sectionLabel}>CHOOSE YOUR LOOK</Text>
        <Text style={styles.sectionSub}>Your skin shapes how the world perceives you.</Text>

        {/* ── 2x2 grid of skins ── */}
        <View style={styles.skinGrid}>
          {CHARACTER_SKINS.map(skin => {
            const isSelected = selectedSkin?.id === skin.id;
            return (
              <TouchableOpacity
                key={skin.id}
                activeOpacity={0.85}
                onPress={() => setSelectedSkin(skin)}
                style={[
                  styles.skinCard,
                  { backgroundColor: skin.accent },
                  isSelected && styles.skinCardSelected,
                ]}
              >
                {/* Gold ring indicator */}
                {isSelected && <View style={styles.skinRing} />}

                <Text style={styles.skinName}>{skin.name.toUpperCase()}</Text>
                <Text style={styles.skinDesc}>{skin.description}</Text>

                {isSelected && (
                  <View style={styles.skinCheckBadge}>
                    <Text style={styles.skinCheckIcon}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ── Bottom CTA ── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.beginButton, !selectedSkin && styles.beginButtonDisabled]}
          onPress={handleBegin}
          disabled={!selectedSkin}
          activeOpacity={0.8}
        >
          <Text style={[styles.beginText, !selectedSkin && styles.beginTextDisabled]}>
            BEGIN QUEST →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ── Header ──
  headerSafe: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingTop:
      Platform.OS === 'android'
        ? (StatusBar.currentHeight ?? 0) + Spacing.md
        : Spacing.md,
  },
  headerWeb: {
    backdropFilter: 'blur(18px)',
    backgroundColor: 'rgba(10,10,10,0.85)',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: Colors.gold,
  },
  headerTitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    letterSpacing: 3,
    fontWeight: '700',
  },

  // ── Scroll ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },

  // ── Character summary ──
  characterSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  charPortrait: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
    marginRight: Spacing.md,
  },
  charMeta: {
    flex: 1,
  },
  charName: {
    fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontSerif,
    color: Colors.text,
    fontWeight: '700',
    marginBottom: 2,
  },
  charRole: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  charDesc: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.lg,
  },

  // ── Section labels ──
  sectionLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    letterSpacing: 2.5,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  sectionSub: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  // ── Skin grid ──
  skinGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  skinCard: {
    width: SKIN_CARD_WIDTH,
    minHeight: 130,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    position: 'relative',
  },
  skinCardSelected: {
    borderColor: Colors.gold,
  },
  skinRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radius.lg,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  skinName: {
    fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontSerif,
    color: Colors.text,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  skinDesc: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  skinCheckBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skinCheckIcon: {
    fontSize: 12,
    color: Colors.background,
    fontWeight: '700',
  },

  // ── Footer ──
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : Spacing.md,
  },
  beginButton: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beginButtonDisabled: {
    backgroundColor: Colors.border,
  },
  beginText: {
    fontSize: Typography.sizes.sm,
    color: Colors.background,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  beginTextDisabled: {
    color: Colors.textMuted,
  },
});
