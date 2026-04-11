import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, Dimensions,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';

const { height } = Dimensions.get('window');

export default function GameplayCompleteScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Background partial image */}
      <View style={styles.bgSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80' }}
          style={styles.bgImage}
          resizeMode="cover"
        />
        <View style={styles.bgOverlay} />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>GAMEPLAY</Text>
          <TouchableOpacity>
            <Text style={styles.settingsIcon}>⚙</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom sheet modal */}
      <View style={styles.modal}>
        {/* Drag handle */}
        <View style={styles.handle} />

        {/* Header row */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Quest Completed!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Check circle */}
        <View style={styles.checkCircle}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>

        {/* Description */}
        <Text style={styles.desc}>
          Quest complete! Start a new quest from the home screen or replay this adventure.
        </Text>

        {/* Back to Home — primary */}
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>

        {/* Start New Quest — secondary */}
        <TouchableOpacity
          style={styles.replayBtn}
          onPress={() => {
            // Reset to character select for a fresh quest
            navigation.navigate('CharacterSelect');
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.replayBtnText}>Start New Quest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  bgSection: { height: height * 0.42, position: 'relative' },
  bgImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  bgOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 54, paddingBottom: 16,
  },
  backIcon: { color: Colors.gold, fontSize: 20 },
  headerTitle: {
    color: Colors.gold, fontSize: Typography.sizes.sm,
    letterSpacing: 4, fontWeight: '700',
  },
  settingsIcon: { color: Colors.gold, fontSize: 20 },

  modal: {
    flex: 1, backgroundColor: Colors.backgroundCard,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 36,
    marginTop: -20,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 20,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: Colors.border, alignSelf: 'center', marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28,
  },
  modalTitle: {
    color: Colors.text, fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontSerif, letterSpacing: 0.5,
  },
  closeIcon: { color: Colors.textMuted, fontSize: 18 },

  checkCircle: {
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 2, borderColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginBottom: 20,
  },
  checkIcon: { color: Colors.gold, fontSize: 28, fontWeight: '300' },

  desc: {
    color: Colors.textSecondary, fontSize: Typography.sizes.md,
    textAlign: 'center', lineHeight: 24, marginBottom: 32,
  },

  homeBtn: {
    backgroundColor: Colors.gold, borderRadius: Radius.md,
    paddingVertical: 18, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  homeBtnIcon: { color: Colors.background, fontSize: Typography.sizes.md },
  homeBtnText: { color: Colors.background, fontSize: Typography.sizes.md, fontWeight: '600' },

  replayBtn: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    paddingVertical: 18, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  replayBtnIcon: { color: Colors.textSecondary, fontSize: Typography.sizes.md },
  replayBtnText: { color: Colors.textSecondary, fontSize: Typography.sizes.md },
});
