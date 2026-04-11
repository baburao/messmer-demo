import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import GoldButton from '../components/GoldButton';

export default function StoryIntroScreen({ navigation, route }: any) {
  const character = route?.params?.character || { name: 'The Drift', symbol: '⚔', title: 'Knight in Armor' };
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 1200, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      {/* Atmospheric bg */}
      <View style={styles.atmosphereBg} />
      <View style={styles.atmosphereGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Navigation */}
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Story chapter heading */}
        <View style={styles.chapterBlock}>
          <Text style={styles.chapterLabel}>CHAPTER ONE</Text>
          <View style={styles.chapterDivider} />
        </View>

        {/* Character intro */}
        <View style={styles.charBlock}>
          <View style={styles.charAvatar}>
            <Text style={styles.charSymbol}>{character.symbol}</Text>
          </View>
          <Text style={styles.charName}>{character.name}</Text>
          <Text style={styles.charTitle}>{character.title}</Text>
        </View>

        {/* Narrative text */}
        <View style={styles.narrative}>
          <Text style={styles.narrativeText}>
            The city breathes differently at dusk. You feel it — that peculiar pressure in the chest when stone remembers what people forget.
          </Text>
          <Text style={styles.narrativeText}>
            You are the last cartographer. Your maps don't record what is — they hold what was, what could be, what the city fears to become.
          </Text>
          <Text style={styles.narrativeText}>
            Tonight, a district has gone silent. The streets have rearranged themselves into a shape that doesn't exist on any map. And somewhere in there, a woman named Elara is waiting.
          </Text>
          <Text style={styles.narrativeText}>
            She left a message. Three words scratched into the stone: <Text style={styles.italics}>"Come find me."</Text>
          </Text>
        </View>

        {/* First choice prompt */}
        <View style={styles.choicePrompt}>
          <View style={styles.choiceDecor}>
            <View style={styles.choiceLine} />
            <Text style={styles.choiceLabel}>YOUR FIRST CHOICE</Text>
            <View style={styles.choiceLine} />
          </View>
          <Text style={styles.choiceQuestion}>How do you approach the silent district?</Text>
        </View>

        {/* Choices */}
        {[
          { text: 'Enter from the old gate, where the shadows gather thickest', icon: '⚔' },
          { text: 'Study the stone patterns — the city is trying to tell you something', icon: '✦' },
          { text: 'Find a higher vantage point and observe before moving', icon: '◈' },
        ].map((choice, i) => (
          <TouchableOpacity
            key={i}
            style={styles.choiceBtn}
            onPress={() => navigation.navigate('ModeSelect')}
            activeOpacity={0.8}
          >
            <Text style={styles.choiceIcon}>{choice.icon}</Text>
            <Text style={styles.choiceBtnText}>{choice.text}</Text>
            <Text style={styles.choiceArrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#06050E' },
  atmosphereBg: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(10,7,3,0.6)',
  },
  atmosphereGlow: {
    position: 'absolute', bottom: 100, left: -100, width: 300, height: 300,
    borderRadius: 150, backgroundColor: 'rgba(201,168,76,0.04)',
  },
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20 },
  back: { marginBottom: 24 },
  backText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, letterSpacing: 1 },

  chapterBlock: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 32 },
  chapterLabel: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 4 },
  chapterDivider: { flex: 1, height: 1, backgroundColor: Colors.border },

  charBlock: { alignItems: 'center', marginBottom: 36, gap: 8 },
  charAvatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(201,168,76,0.1)', borderWidth: 1, borderColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  charSymbol: { fontSize: 28, color: Colors.gold },
  charName: {
    color: Colors.text, fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontSerif, letterSpacing: 2,
  },
  charTitle: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, letterSpacing: 1 },

  narrative: { gap: 18, marginBottom: 36 },
  narrativeText: {
    color: Colors.text, fontSize: Typography.sizes.md,
    fontFamily: Typography.fontSerif, lineHeight: 28, letterSpacing: 0.3,
  },
  italics: { fontStyle: 'italic', color: Colors.goldLight },

  choicePrompt: { gap: 14, marginBottom: 20 },
  choiceDecor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  choiceLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  choiceLabel: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 3 },
  choiceQuestion: {
    color: Colors.text, fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontSerif, lineHeight: 26,
  },

  choiceBtn: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.02)', padding: 16, gap: 12, marginBottom: 12,
  },
  choiceIcon: { color: Colors.gold, fontSize: 18, width: 24 },
  choiceBtnText: { color: Colors.text, fontSize: Typography.sizes.md, flex: 1, lineHeight: 22 },
  choiceArrow: { color: Colors.textMuted, fontSize: 22 },
});
