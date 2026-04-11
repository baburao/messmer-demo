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
import { CHARACTERS, Character } from '../services/aiService';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.md * 2 - Spacing.sm) / 2;

export default function CharacterSelectScreen({ navigation, route }: any) {
  const { themeId } = route.params ?? {};
  const characters: Character[] = CHARACTERS[themeId as keyof typeof CHARACTERS] ?? [];

  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  const handleContinue = () => {
    if (!selectedChar) return;
    navigation.navigate('SkinSelect', { themeId, characterId: selectedChar.id });
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

          <Text style={styles.headerTitle}>CHOOSE YOUR CHARACTER</Text>

          <View style={styles.backButton} />
        </View>
      </SafeAreaView>

      {/* ── Character grid ── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subLabel}>SELECT YOUR AVATAR</Text>

        <View style={styles.grid}>
          {characters.map(char => {
            const isSelected = selectedChar?.id === char.id;
            return (
              <TouchableOpacity
                key={char.id}
                activeOpacity={0.85}
                onPress={() => setSelectedChar(char)}
                style={[styles.card, isSelected && styles.cardSelected]}
              >
                {/* Portrait */}
                <Image
                  source={{ uri: char.image }}
                  style={styles.portrait}
                  resizeMode="cover"
                />
                <View style={styles.portraitOverlay} />

                {/* Gold checkmark badge */}
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                )}

                {/* Info */}
                <View style={styles.cardInfo}>
                  <Text style={styles.charName}>{char.name}</Text>
                  <Text style={styles.charRole}>{char.role}</Text>
                  <Text style={styles.charDesc} numberOfLines={1}>
                    {char.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ── Bottom CTA ── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedChar && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedChar}
          activeOpacity={0.8}
        >
          <Text style={[styles.continueText, !selectedChar && styles.continueTextDisabled]}>
            CONTINUE →
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
  subLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 2.5,
    fontWeight: '600',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },

  // ── Grid ──
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  // ── Card ──
  card: {
    width: CARD_WIDTH,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  cardSelected: {
    borderColor: Colors.gold,
  },
  portrait: {
    width: '100%',
    height: 160,
  },
  portraitOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: Radius.full,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 13,
    color: Colors.background,
    fontWeight: '700',
  },
  cardInfo: {
    padding: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  charName: {
    fontSize: Typography.sizes.md,
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
  continueButton: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: Colors.border,
  },
  continueText: {
    fontSize: Typography.sizes.sm,
    color: Colors.background,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  continueTextDisabled: {
    color: Colors.textMuted,
  },
});
