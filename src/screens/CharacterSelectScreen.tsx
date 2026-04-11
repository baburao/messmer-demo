import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Image,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import { saveQuestSetup } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

const CHARACTERS = [
  {
    id: '1',
    name: 'THE DRIFT',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
  },
  {
    id: '2',
    name: 'THE ARCHITECT',
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&q=80',
  },
];

export default function CharacterSelectScreen({ navigation, route }: any) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedChar = CHARACTERS.find(c => c.id === selected);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CHOOSE YOUR CHARACTER</Text>
      </View>

      {/* Character cards — side by side */}
      <View style={styles.cardsRow}>
        {CHARACTERS.map((char) => (
          <TouchableOpacity
            key={char.id}
            style={[styles.card, selected === char.id && styles.cardSelected]}
            onPress={() => setSelected(char.id)}
            activeOpacity={0.85}
          >
            {/* Character image */}
            <Image
              source={{ uri: char.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            {/* Dark overlay */}
            <View style={styles.cardOverlay} />

            {/* Selected checkmark */}
            {selected === char.id && (
              <View style={styles.checkBadge}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
            )}

            {/* Name */}
            <Text style={styles.charName}>{char.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Description */}
      <View style={styles.descBlock}>
        <Text style={styles.descText}>
          EACH CHARACTER HAS UNIQUE DIALOGUE{'\n'}
          OPTIONS AND STARTING ATTRIBUTES. CHOOSE{'\n'}
          WISELY, FOR YOUR HISTORY SHAPES YOUR{'\n'}
          FUTURE.
        </Text>
      </View>

      {/* Continue button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
          onPress={() => {
            if (selected && selectedChar) {
              saveQuestSetup('characterId', selected);
              navigation.navigate('SkinSelect', { character: selectedChar });
            }
          }}
          activeOpacity={selected ? 0.8 : 1}
        >
          <Text style={[styles.continueBtnText, !selected && styles.continueBtnTextDisabled]}>
            CONTINUE  ›
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 54, paddingBottom: 30, gap: 16,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backIcon: { color: Colors.gold, fontSize: 20 },
  headerTitle: {
    color: Colors.gold, fontSize: Typography.sizes.sm,
    letterSpacing: 3, fontWeight: '700',
  },

  cardsRow: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 12, paddingHorizontal: 20, marginBottom: 32,
  },
  card: {
    width: CARD_WIDTH, height: CARD_WIDTH * 1.45,
    borderRadius: Radius.md, overflow: 'hidden',
    borderWidth: 2, borderColor: Colors.border,
    justifyContent: 'flex-end', alignItems: 'center',
    paddingBottom: 14,
  },
  cardSelected: { borderColor: Colors.gold },
  cardImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  cardOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  checkBadge: {
    position: 'absolute', top: 12, right: 12,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: Colors.gold, alignItems: 'center', justifyContent: 'center',
  },
  checkIcon: { color: Colors.background, fontSize: 14, fontWeight: '700' },
  charName: {
    color: Colors.gold, fontSize: Typography.sizes.sm,
    letterSpacing: 2, fontWeight: '700', textAlign: 'center',
  },

  descBlock: { paddingHorizontal: 32, marginBottom: 'auto' as any },
  descText: {
    color: Colors.textSecondary, fontSize: Typography.sizes.xs,
    letterSpacing: 1, lineHeight: 20, textAlign: 'center',
  },

  footer: { padding: 20, paddingBottom: 36 },
  continueBtn: {
    backgroundColor: Colors.gold, borderRadius: Radius.md,
    paddingVertical: 18, alignItems: 'center',
  },
  continueBtnDisabled: { backgroundColor: 'rgba(255,255,255,0.1)' },
  continueBtnText: {
    color: Colors.background, fontSize: Typography.sizes.sm,
    letterSpacing: 3, fontWeight: '700',
  },
  continueBtnTextDisabled: { color: Colors.textMuted },
});
