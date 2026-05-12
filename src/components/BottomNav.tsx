import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '../theme';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon, Search01Icon, UserCircleIcon } from '@hugeicons/core-free-icons';

interface Props {
  active: 'home' | 'search' | 'create' | 'profile';
  onNavigate: (screen: string) => void;
}

const TABS = [
  { key: 'home',    label: 'HOME',    screen: 'Home',        icon: Home01Icon,     isHuge: true  },
  { key: 'search',  label: 'SEARCH',  screen: 'Search',      icon: Search01Icon,   isHuge: true  },
  { key: 'create',  label: 'CREATE',  screen: 'ThemeSelect', icon: null,           isHuge: false, unicode: '✎' },
  { key: 'profile', label: 'PROFILE', screen: 'Profile',     icon: UserCircleIcon, isHuge: true  },
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
                  icon={tab.icon as any}
                  size={20}
                  color={isActive ? Colors.gold : Colors.textMuted}
                />
              ) : (
                <Text style={[styles.icon, isActive && styles.activeIcon]}>{tab.unicode}</Text>
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
