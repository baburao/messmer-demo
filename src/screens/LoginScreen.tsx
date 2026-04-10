import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, Dimensions,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import { saveAuth } from '../navigation/AppNavigator';

const { height } = Dimensions.get('window');

interface Props { navigation: any; }

const SOCIAL = [
  { id: 'google',   label: 'G',  labelColor: '#EA4335', border: 'rgba(234,67,53,0.3)' },
  { id: 'discord',  label: 'D',  labelColor: '#5865F2', border: 'rgba(88,101,242,0.3)' },
  { id: 'meta',     label: '∞',  labelColor: '#0082FB', border: 'rgba(0,130,251,0.3)' },
  { id: 'x',        label: '✕',  labelColor: Colors.text, border: 'rgba(255,255,255,0.15)' },
];

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused]       = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    saveAuth();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85' }}
        style={styles.bgImage}
        resizeMode="cover"
      />
      {/* Dark overlay */}
      <View style={styles.bgOverlay} />
      {/* Warm gold glow at bottom */}
      <View style={styles.bgGlow} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Branding ──────────────────────────────── */}
          <View style={styles.branding}>
            <Text style={styles.experience}>E X P E R I E N C E</Text>
            <Text style={styles.logo}>MESSMER</Text>
            <View style={styles.taglineRow}>
              <View style={styles.taglineLine} />
              <Text style={styles.tagline}>YOUR STORY, YOUR CHOICES</Text>
              <View style={styles.taglineLine} />
            </View>
          </View>

          {/* ── Form ──────────────────────────────────── */}
          <View style={styles.form}>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
              <View style={[styles.inputBox, emailFocused && styles.inputBoxFocused]}>
                <TextInput
                  style={styles.input}
                  placeholder="name@domain.com"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>PASSWORD</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.inputBox, passwordFocused && styles.inputBoxFocused]}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              </View>
            </View>

            {/* Login button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              activeOpacity={0.88}
            >
              <Text style={styles.loginBtnText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          {/* ── Social ────────────────────────────────── */}
          <View style={styles.socialSection}>
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR SIGN IN WITH</Text>
              <View style={styles.orLine} />
            </View>

            <View style={styles.socialRow}>
              {SOCIAL.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.socialBtn, { borderColor: s.border }]}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.socialLabel, { color: s.labelColor }]}>{s.label}</Text>
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
  container: { flex: 1, backgroundColor: '#06050F' },

  bgImage: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
  },
  bgOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(4,3,12,0.75)',
  },
  bgGlow: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: height * 0.38,
    backgroundColor: 'rgba(180,140,50,0.07)',
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 48,
  },

  // Branding
  branding: { alignItems: 'center', marginBottom: 48 },
  experience: {
    color: Colors.textSecondary,
    fontSize: 11, letterSpacing: 5, marginBottom: 4,
  },
  logo: {
    color: Colors.gold,
    fontSize: 52, fontFamily: Typography.fontSerif,
    letterSpacing: 10, marginBottom: 16,
  },
  taglineRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  taglineLine: { flex: 1, height: 1, backgroundColor: 'rgba(201,168,76,0.4)' },
  tagline: { color: Colors.textSecondary, fontSize: 10, letterSpacing: 2.5 },

  // Form
  form: { gap: 20, marginBottom: 36 },
  fieldGroup: { gap: 8 },
  fieldLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fieldLabel: { color: Colors.textSecondary, fontSize: 10, letterSpacing: 2.5, fontWeight: '600' },
  forgotText: { color: Colors.textSecondary, fontSize: 13 },

  inputBox: {
    height: 54,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.04)',
    justifyContent: 'center',
  },
  inputBoxFocused: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(201,168,76,0.05)',
  },
  input: {
    color: Colors.text, fontSize: 15,
    paddingHorizontal: 16,
    outlineWidth: 0,
  } as any,

  loginBtn: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.sm,
    height: 56,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 4,
  },
  loginBtnText: {
    color: Colors.background,
    fontSize: 14, letterSpacing: 5, fontWeight: '700',
  },

  // Social
  socialSection: { gap: 24 },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  orLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  orText: { color: Colors.textMuted, fontSize: 10, letterSpacing: 2 },

  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 14 },
  socialBtn: {
    width: 68, height: 58,
    borderWidth: 1,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center', justifyContent: 'center',
  },
  socialLabel: { fontSize: 20, fontWeight: '700' },

  signupRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4,
  },
  signupText: { color: Colors.textSecondary, fontSize: 14 },
  signupLink: { color: Colors.gold, fontSize: 14, fontWeight: '600' },
});
