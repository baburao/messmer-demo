import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import { THEMES, Theme } from '../services/aiService';

export default function ThemeSelectScreen({ navigation }: any) {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const handleContinue = () => {
    if (!selectedTheme) return;
    navigation.navigate('CharacterSelect', { themeId: selectedTheme.id });
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

          <Text style={styles.headerTitle}>CHOOSE YOUR WORLD</Text>

          {/* Spacer to center the title */}
          <View style={styles.backButton} />
        </View>
      </SafeAreaView>

      {/* ── Theme cards ── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subLabel}>SELECT A REALM TO ENTER</Text>

        {THEMES.map(theme => {
          const isSelected = selectedTheme?.id === theme.id;
          return (
            <TouchableOpacity
              key={theme.id}
              activeOpacity={0.85}
              onPress={() => setSelectedTheme(theme)}
              style={[styles.card, isSelected && styles.cardSelected]}
            >
              <ImageBackground
                source={{ uri: theme.image }}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
                resizeMode="cover"
              >
                {/* Dark gradient overlay */}
                <View style={styles.cardOverlay} />

                {/* Content */}
                <View style={styles.cardContent}>
                  <Text style={styles.cardName}>{theme.name}</Text>
                  <Text style={styles.cardTagline}>{theme.tagline}</Text>
                </View>

                {/* Selection checkmark */}
                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <Text style={styles.selectedBadgeText}>✓</Text>
                  </View>
                )}
              </ImageBackground>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ── Bottom CTA ── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedTheme && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedTheme}
          activeOpacity={0.8}
        >
          <Text style={[styles.continueText, !selectedTheme && styles.continueTextDisabled]}>
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
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + Spacing.md : Spacing.md,
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

  // ── Card ──
  card: {
    height: 200,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: Colors.gold,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: Radius.lg,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
  cardContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  cardName: {
    fontSize: Typography.sizes.xxl,
    fontFamily: Typography.fontSerif,
    color: Colors.text,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  cardTagline: {
    fontSize: Typography.sizes.xs,
    color: Colors.goldLight,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadgeText: {
    fontSize: 14,
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
