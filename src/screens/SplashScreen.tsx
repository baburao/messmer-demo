import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Colors, Typography } from '../theme';

const { width, height } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dividerWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fallback in case animation doesn't complete on web
    const fallback = setTimeout(() => onFinish(), 3500);

    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]),
      Animated.delay(300),
      Animated.timing(taglineOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.delay(1200),
    ]).start(() => { clearTimeout(fallback); onFinish(); });

    // Non-native width animation runs independently
    setTimeout(() => {
      Animated.timing(dividerWidth, { toValue: 60, duration: 600, useNativeDriver: false }).start();
    }, 1700);

    return () => clearTimeout(fallback);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background gradient layers */}
      <View style={styles.bgLayer1} />
      <View style={styles.bgLayer2} />
      <View style={styles.bgGlow} />

      {/* Center content */}
      <View style={styles.center}>
        <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
          <Text style={styles.experience}>E X P E R I E N C E</Text>
          <Text style={styles.logo}>MESSMER</Text>
        </Animated.View>

        <Animated.View style={[styles.taglineRow, { opacity: taglineOpacity }]}>
          <Animated.View style={[styles.divider, { width: dividerWidth }]} />
          <Text style={styles.tagline}>Your Story, Your Choices</Text>
          <Animated.View style={[styles.divider, { width: dividerWidth }]} />
        </Animated.View>
      </View>

      {/* Bottom glow */}
      <View style={styles.bottomGlow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050508',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgLayer1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: 'rgba(10, 6, 2, 0.9)',
  },
  bgLayer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 3, 10, 0.5)',
  },
  bgGlow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(201,168,76,0.04)',
    alignSelf: 'center',
    top: height * 0.3,
  },
  center: {
    alignItems: 'center',
    gap: 20,
  },
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
    marginTop: 8,
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
  bottomGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(201,168,76,0.03)',
  },
});
