import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import GoldButton from '../components/GoldButton';

export default function StoryResultScreen({ navigation, route }: any) {
  const choiceText = route?.params?.choice?.text || 'Step through the gate and follow the heartbeat sound deeper in';
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <View style={styles.bgScene} />
      <View style={styles.bgNeon} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Choice echo */}
        <View style={styles.choiceEchoBlock}>
          <Text style={styles.choiceEchoLabel}>YOU CHOSE</Text>
          <View style={styles.choiceEchoBox}>
            <Text style={styles.choiceEchoText}>"{choiceText}"</Text>
          </View>
        </View>

        {/* Consequence */}
        <View style={styles.consequenceBlock}>
          <View style={styles.consequenceDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>CONSEQUENCE</Text>
            <View style={styles.dividerLine} />
          </View>
          <Text style={styles.consequenceTitle}>The Gate Remembers</Text>
          <Text style={styles.consequenceText}>
            The moment your hand touches the iron, a shock of memory passes through you — not yours. A woman's memory. Elara's memory. She stood here three nights ago, and the gate let her through because it recognized her. Now it recognizes her absence.
          </Text>
          <Text style={styles.consequenceText}>
            Somewhere deep in the district, a light flickers on. Then off. A signal.
          </Text>
        </View>

        {/* Stat change */}
        <View style={styles.statsChanged}>
          <Text style={styles.statsLabel}>CHARACTER DEVELOPMENT</Text>
          <View style={styles.statRow}>
            <Text style={styles.statIcon}>⚔</Text>
            <Text style={styles.statName}>Resolve</Text>
            <View style={styles.statBar}><View style={[styles.statFill, { width: '72%' }]} /></View>
            <Text style={styles.statDelta}>+12</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statIcon}>✦</Text>
            <Text style={styles.statName}>Insight</Text>
            <View style={styles.statBar}><View style={[styles.statFill, { width: '58%' }]} /></View>
            <Text style={styles.statDelta}>+5</Text>
          </View>
        </View>

        {/* Continue / Make Quote */}
        <View style={styles.actions}>
          <GoldButton
            title="Continue the Story"
            onPress={() => navigation.navigate('StoryExperience')}
          />
          <TouchableOpacity style={styles.quoteBtn} onPress={() => {}}>
            <Text style={styles.quoteBtnText}>✦ Make Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quoteBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.quoteBtnText}>⌂ Return to Home</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#06080E' },
  bgScene: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 200,
    backgroundColor: 'rgba(30,10,60,0.5)',
  },
  bgNeon: {
    position: 'absolute', top: 60, right: -40,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(60,0,120,0.15)',
  },
  scroll: { paddingHorizontal: 24, paddingTop: 70, paddingBottom: 20 },

  choiceEchoBlock: { marginBottom: 32, gap: 8 },
  choiceEchoLabel: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 3 },
  choiceEchoBox: {
    borderLeftWidth: 2, borderLeftColor: Colors.gold,
    paddingLeft: 16, paddingVertical: 8,
  },
  choiceEchoText: {
    color: Colors.textSecondary, fontSize: Typography.sizes.md,
    fontFamily: Typography.fontSerif, fontStyle: 'italic', lineHeight: 24,
  },

  consequenceBlock: { gap: 16, marginBottom: 28 },
  consequenceDivider: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerLabel: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 3 },
  consequenceTitle: {
    color: Colors.text, fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontSerif,
  },
  consequenceText: {
    color: Colors.text, fontSize: Typography.sizes.md,
    fontFamily: Typography.fontSerif, lineHeight: 26, letterSpacing: 0.2,
  },

  statsChanged: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCard, padding: 18, gap: 14, marginBottom: 28,
  },
  statsLabel: { color: Colors.textMuted, fontSize: Typography.sizes.xs, letterSpacing: 3 },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statIcon: { fontSize: 14, width: 18 },
  statName: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, width: 56 },
  statBar: {
    flex: 1, height: 4, backgroundColor: Colors.border, borderRadius: 2, overflow: 'hidden',
  },
  statFill: { height: '100%', backgroundColor: Colors.gold, borderRadius: 2 },
  statDelta: { color: Colors.gold, fontSize: Typography.sizes.sm, fontWeight: '700', width: 32, textAlign: 'right' },

  actions: { gap: 12 },
  quoteBtn: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.sm,
    paddingVertical: 14, alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  quoteBtnText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, letterSpacing: 1 },
});
