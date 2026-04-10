import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Typography } from '../theme';

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const logoScale      = useRef(new Animated.Value(0.85)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dividerWidth   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fallback = setTimeout(() => onFinish(), 3500);

    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.spring(logoScale,   { toValue: 1, friction: 6,   useNativeDriver: true }),
      ]),
      Animated.delay(300),
      Animated.timing(taglineOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.delay(1200),
    ]).start(() => { clearTimeout(fallback); onFinish(); });

    setTimeout(() => {
      Animated.timing(dividerWidth, { toValue: 60, duration: 600, useNativeDriver: false }).start();
    }, 1700);

    return () => clearTimeout(fallback);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background layers */}
      <View style={[StyleSheet.absoluteFill, styles.bgBase]} />
      <View style={[StyleSheet.absoluteFill, styles.bgOverlay]} />
      <View style={[styles.bottomGlow, { position: 'absolute', bottom: 0, left: 0, right: 0 }]} />

      {/* Glow halo */}
      <View style={styles.bgGlow} />

      {/* Logo & tagline — centered by flex */}
      <Animated.View style={[styles.logoBlock, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <Text style={styles.experience}>E X P E R I E N C E</Text>
        <Text style={styles.logo}>MESSMER</Text>
      </Animated.View>

      <Animated.View style={[styles.taglineRow, { opacity: taglineOpacity }]}>
        <Animated.View style={[styles.divider, { width: dividerWidth }]} />
        <Text style={styles.tagline}>Your Story, Your Choices</Text>
        <Animated.View style={[styles.divider, { width: dividerWidth }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050508',
  },

  bgBase:    { backgroundColor: '#050508' },
  bgOverlay: { backgroundColor: 'rgba(5,3,10,0.4)' },
  bottomGlow: {
    height: 220,
    backgroundColor: 'rgba(201,168,76,0.03)',
  },

  bgGlow: {
    position: 'absolute',
    width: 380, height: 380, borderRadius: 190,
    backgroundColor: 'rgba(201,168,76,0.07)',
    alignSelf: 'center',
  },

  logoBlock: { alignItems: 'center' },

  experience: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.xs,
    letterSpacing: 6,
    textAlign: 'center',
    marginBottom: 6,
  },
  logo: {
    color: Colors.gold,
    fontSize: Typography.sizes.display,
    fontFamily: Typography.fontSerif,
    letterSpacing: 12,
    textAlign: 'center',
  },

  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.5,
  },
  tagline: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    letterSpacing: 2,
  },
});
