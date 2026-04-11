import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, Dimensions,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import { saveAuth } from '../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

interface Props { navigation: any; }

const SOCIAL = [
  { label: 'G', color: '#EA4335', bg: '#1A1A1A' },
  { label: 'D', color: '#5865F2', bg: '#1A1A1A' },
  { label: '∞', color: '#0082FB', bg: '#1A1A1A' },
  { label: '✕', color: Colors.text, bg: '#1A1A1A' },
];

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Atmospheric background */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' }}
        style={styles.bgImage}
        resizeMode="cover"
      />
      {/* Gradient overlays */}
      <View style={styles.bgDark} />
      <View style={styles.bgGold} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Branding */}
          <View style={styles.branding}>
            <Text style={styles.experience}>E X P E R I E N C E</Text>
            <Text style={styles.logo}>MESSMER</Text>
            <View style={styles.taglineRow}>
              <View style={styles.divider} />
              <Text style={styles.tagline}>YOUR STORY, YOUR CHOICES</Text>
              <View style={styles.divider} />
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="name@domain.com"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>PASSWORD</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotLink}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Login button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => { saveAuth(); navigation.navigate('Home'); }}
              activeOpacity={0.85}
            >
              <Text style={styles.loginBtnText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          {/* Social sign in */}
          <View style={styles.socialSection}>
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR SIGN IN WITH</Text>
              <View style={styles.orLine} />
            </View>

            <View style={styles.socialRow}>
              {SOCIAL.map((s, i) => (
                <TouchableOpacity key={i} style={styles.socialBtn} activeOpacity={0.7}>
                  <Text style={[styles.socialIcon, { color: s.color }]}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#080610' },
  bgImage: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
  },
  bgDark: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(4,3,12,0.72)',
  },
  bgGold: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: height * 0.35,
    backgroundColor: 'rgba(201,168,76,0.06)',
  },

  scroll: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 72, paddingBottom: 40 },

  branding: { alignItems: 'center', marginBottom: 52 },
  experience: {
    color: Colors.textSecondary, fontSize: Typography.sizes.xs,
    letterSpacing: 6, marginBottom: 2,
  },
  logo: {
    color: Colors.gold, fontSize: Typography.sizes.xxxl + 6,
    fontFamily: Typography.fontSerif, letterSpacing: 10, marginBottom: 14,
  },
  taglineRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  divider: { width: 30, height: 1, backgroundColor: Colors.gold, opacity: 0.5 },
  tagline: { color: Colors.textSecondary, fontSize: 10, letterSpacing: 2.5 },

  form: { gap: 18, marginBottom: 32 },
  inputGroup: { gap: 8 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: Colors.textSecondary, fontSize: 10, letterSpacing: 2.5 },
  forgotLink: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  inputWrapper: {
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.sm, height: 52,
    justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)',
  },
  input: {
    color: Colors.text, fontSize: Typography.sizes.md,
    paddingHorizontal: 16, outlineWidth: 0,
  } as any,

  loginBtn: {
    backgroundColor: Colors.gold, borderRadius: Radius.sm,
    height: 56, alignItems: 'center', justifyContent: 'center', marginTop: 4,
  },
  loginBtnText: {
    color: Colors.background, fontSize: Typography.sizes.sm,
    letterSpacing: 4, fontWeight: '700',
  },

  socialSection: { gap: 20 },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  orLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
  orText: { color: Colors.textMuted, fontSize: 10, letterSpacing: 2 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  socialBtn: {
    width: 70, height: 60, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)', borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center', justifyContent: 'center',
  },
  socialIcon: { fontSize: 20, fontWeight: '700' },
  signupRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signupText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  signupLink: { color: Colors.gold, fontSize: Typography.sizes.sm, fontWeight: '600' },
});
