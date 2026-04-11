import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Switch,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';

export default function ThemeSelectScreen({ navigation }: any) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View style={[styles.container, !darkMode && styles.containerLight]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[styles.backIcon, !darkMode && styles.textDark]}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SELECT THEME</Text>
      </View>

      <View style={styles.body}>
        {/* Dark theme toggle */}
        <View style={[styles.toggleRow, !darkMode && styles.toggleRowLight]}>
          <Text style={styles.moonIcon}>🌙</Text>
          <Text style={[styles.toggleLabel, !darkMode && styles.textDark]}>Dark Theme</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#ccc', true: Colors.gold }}
            thumbColor={Colors.background}
          />
        </View>

        {/* Account section */}
        <View style={styles.accountSection}>
          <Text style={[styles.accountLabel, !darkMode && styles.textDark]}>ACCOUNT</Text>
          <TouchableOpacity
            style={[styles.logoutBtn, !darkMode && styles.logoutBtnLight]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Version info */}
        <View style={styles.versionBlock}>
          <Text style={[styles.versionText, !darkMode && styles.textMutedDark]}>LORE CRAFT VERSION 2.0.4</Text>
          <View style={styles.linksRow}>
            <TouchableOpacity><Text style={[styles.linkText, !darkMode && styles.textMutedDark]}>Terms</Text></TouchableOpacity>
            <TouchableOpacity><Text style={[styles.linkText, !darkMode && styles.textMutedDark]}>Privacy</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  containerLight: { backgroundColor: '#F5F5F0' },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 54, paddingBottom: 24, gap: 16,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backIcon: { color: Colors.gold, fontSize: 20 },
  headerTitle: {
    color: Colors.gold, fontSize: Typography.sizes.sm,
    letterSpacing: 3, fontWeight: '700',
  },

  body: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },

  toggleRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.backgroundCard, borderRadius: Radius.md,
    padding: 18, gap: 14, marginBottom: 32,
    borderWidth: 1, borderColor: Colors.border,
  },
  toggleRowLight: {
    backgroundColor: '#FFFFFF', borderColor: '#E0E0E0',
  },
  moonIcon: { fontSize: 20 },
  toggleLabel: { flex: 1, color: Colors.text, fontSize: Typography.sizes.md },

  accountSection: { gap: 10 },
  accountLabel: {
    color: Colors.textMuted, fontSize: Typography.sizes.xs,
    letterSpacing: 3, marginBottom: 2,
  },
  logoutBtn: {
    backgroundColor: 'rgba(192, 57, 43, 0.15)',
    borderRadius: Radius.md, paddingVertical: 18,
    alignItems: 'center', borderWidth: 1, borderColor: 'rgba(192,57,43,0.3)',
  },
  logoutBtnLight: {
    backgroundColor: 'rgba(192,57,43,0.08)',
    borderColor: 'rgba(192,57,43,0.2)',
  },
  logoutText: { color: '#C0392B', fontSize: Typography.sizes.md, fontWeight: '500' },

  versionBlock: { alignItems: 'center', gap: 6, marginTop: 'auto' as any, paddingBottom: 40 },
  versionText: { color: Colors.textMuted, fontSize: 10, letterSpacing: 1.5 },
  linksRow: { flexDirection: 'row', gap: 16 },
  linkText: { color: Colors.textMuted, fontSize: Typography.sizes.sm },

  textDark: { color: '#1A1A1A' },
  textMutedDark: { color: '#888' },
});
