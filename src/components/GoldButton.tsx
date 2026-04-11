import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Typography } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  outline?: boolean;
}

export default function GoldButton({ title, onPress, style, outline }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, outline ? styles.outline : styles.filled, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, outline && styles.textOutline]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  filled: {
    backgroundColor: Colors.gold,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  text: {
    color: Colors.background,
    fontFamily: Typography.fontSerif,
    fontSize: Typography.sizes.md,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  textOutline: {
    color: Colors.gold,
  },
});
