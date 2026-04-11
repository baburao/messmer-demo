import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Colors, Typography, Radius } from '../theme';
import GoldButton from '../components/GoldButton';

export default function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.bgGlow} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Back */}
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.titleBlock}>
            <Text style={styles.titleSub}>Join the Experience</Text>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.titleUnderline} />
          </View>

          <View style={styles.form}>
            {[
              { label: 'Full Name', ph: 'Julian Thorne', val: name, set: setName, type: 'default' },
              { label: 'Email Address', ph: 'name@domain.com', val: email, set: setEmail, type: 'email-address' },
              { label: 'Password', ph: '••••••••', val: password, set: setPassword, type: 'default' },
            ].map((field) => (
              <View key={field.label} style={styles.inputGroup}>
                <Text style={styles.label}>{field.label}</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder={field.ph}
                    placeholderTextColor={Colors.textMuted}
                    value={field.val}
                    onChangeText={field.set}
                    keyboardType={field.type as any}
                    autoCapitalize={field.type === 'email-address' ? 'none' : 'words'}
                    secureTextEntry={field.label === 'Password'}
                  />
                </View>
              </View>
            ))}

            <Text style={styles.terms}>
              By creating an account you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>

            <GoldButton title="Create Account" onPress={() => navigation.navigate('Home')} />
          </View>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>Or sign up with</Text>
            <View style={styles.orLine} />
          </View>

          <View style={styles.socialRow}>
            {['G', 'D', 'M', '✕'].map((icon, i) => (
              <TouchableOpacity key={i} style={styles.socialBtn} activeOpacity={0.7}>
                <Text style={styles.socialIcon}>{icon}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07060E' },
  bgGlow: {
    position: 'absolute', top: 0, right: 0,
    width: 200, height: 300, borderRadius: 150,
    backgroundColor: 'rgba(201,168,76,0.04)',
  },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  back: { marginBottom: 32 },
  backText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, letterSpacing: 1 },
  titleBlock: { marginBottom: 36 },
  titleSub: { color: Colors.textSecondary, fontSize: Typography.sizes.xs, letterSpacing: 4, marginBottom: 6 },
  title: {
    color: Colors.text, fontSize: Typography.sizes.xxl,
    fontFamily: Typography.fontSerif, letterSpacing: 2, marginBottom: 12,
  },
  titleUnderline: { width: 40, height: 2, backgroundColor: Colors.gold },
  form: { gap: 16, marginBottom: 28 },
  inputGroup: { gap: 8 },
  label: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, letterSpacing: 0.5 },
  inputWrapper: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.04)', height: 52, justifyContent: 'center',
  },
  input: { color: Colors.text, fontSize: Typography.sizes.md, paddingHorizontal: 16, outlineWidth: 0 },
  terms: { color: Colors.textMuted, fontSize: Typography.sizes.xs, lineHeight: 18 },
  termsLink: { color: Colors.gold },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  orLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  orText: { color: Colors.textMuted, fontSize: Typography.sizes.sm },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 28 },
  socialBtn: {
    width: 64, height: 56, borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.sm, backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center', justifyContent: 'center',
  },
  socialIcon: { color: Colors.text, fontSize: 18, fontWeight: '600' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  loginLink: { color: Colors.gold, fontSize: Typography.sizes.sm, fontWeight: '600' },
});
