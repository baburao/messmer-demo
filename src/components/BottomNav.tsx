import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '../theme';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserCircleIcon } from '@hugeicons/core-free-icons';

interface Props {
  active: 'explore' | 'create' | 'profile';
  onNavigate: (screen: string) => void;
}

const TABS = [
  { key: 'explore', label: 'EXPLORE', screen: 'Home',      icon: '⊞',  isHuge: false },
  { key: 'create',  label: 'CREATE',  screen: 'StoryList', icon: '✎',  isHuge: false },
  { key: 'profile', label: 'PROFILE', screen: 'Profile',   icon: null,  isHuge: true  },
];

export default function BottomNav({ active, onNavigate }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => onNavigate(tab.screen)}
              activeOpacity={0.7}
            >
              {tab.isHuge ? (
                <HugeiconsIcon
                  icon={UserCircleIcon}
                  size={20}
                  color={isActive ? Colors.gold : Colors.textMuted}
                />
              ) : (
                <Text style={[styles.icon, isActive && styles.activeIcon]}>{tab.icon}</Text>
              )}
              <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
              {isActive && <View style={styles.activePip} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(10,10,10,0.82)' as any,
    borderTopWidth: 1,
    borderTopColor: 'rgba(42,42,42,0.6)',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    } : {}),
  } as any,
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 14,
  },
  tab: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 2 },
  icon: { fontSize: 20, color: Colors.textMuted },
  activeIcon: { color: Colors.gold },
  label: { fontSize: 9, color: Colors.textMuted, letterSpacing: 1.5 },
  activeLabel: { color: Colors.gold },
  activePip: {
    position: 'absolute', bottom: -2,
    width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.gold,
  },
});
