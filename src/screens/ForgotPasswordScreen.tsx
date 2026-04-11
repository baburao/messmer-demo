import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import GoldButton from '../components/GoldButton';

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.bgGlow} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.inner}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.iconBlock}>
            <Text style={styles.lockIcon}>🔑</Text>
          </View>

          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you a link to reset your password.
          </Text>

          {sent ? (
            <View style={styles.successBlock}>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.successTitle}>Check Your Email</Text>
              <Text style={styles.successDesc}>
                A reset link has been sent to {email || 'your email address'}.
              </Text>
              <GoldButton title="Back to Login" onPress={() => navigation.navigate('Login')} style={{ marginTop: 24 }} />
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
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
              <GoldButton title="Send Reset Link" onPress={() => setSent(true)} />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07060E' },
  bgGlow: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 300,
    backgroundColor: 'rgba(201,168,76,0.02)',
  },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  back: { marginBottom: 40 },
  backText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, letterSpacing: 1 },
  iconBlock: { alignItems: 'center', marginBottom: 24 },
  lockIcon: { fontSize: 48 },
  title: {
    color: Colors.text, fontSize: Typography.sizes.xxl,
    fontFamily: Typography.fontSerif, letterSpacing: 2, marginBottom: 12, textAlign: 'center',
  },
  subtitle: {
    color: Colors.textSecondary, fontSize: Typography.sizes.md,
    textAlign: 'center', lineHeight: 22, marginBottom: 36,
  },
  form: { gap: 16 },
  inputGroup: { gap: 8 },
  label: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  inputWrapper: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.04)', height: 52, justifyContent: 'center',
  },
  input: { color: Colors.text, fontSize: Typography.sizes.md, paddingHorizontal: 16, outlineWidth: 0 },
  successBlock: { alignItems: 'center', gap: 12 },
  successIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(201,168,76,0.15)', borderWidth: 1, borderColor: Colors.gold,
    textAlign: 'center', lineHeight: 64, fontSize: 28, color: Colors.gold, overflow: 'hidden',
  },
  successTitle: {
    color: Colors.text, fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontSerif, letterSpacing: 2,
  },
  successDesc: { color: Colors.textSecondary, fontSize: Typography.sizes.md, textAlign: 'center', lineHeight: 22 },
});
