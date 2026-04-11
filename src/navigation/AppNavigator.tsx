import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import StoryListScreen from '../screens/StoryListScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';
import CharacterSelectScreen from '../screens/CharacterSelectScreen';
import StoryIntroScreen from '../screens/StoryIntroScreen';
import SkinSelectScreen from '../screens/SkinSelectScreen';
import StoryExperienceScreen from '../screens/StoryExperienceScreen';
import GameplayCompleteScreen from '../screens/GameplayCompleteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ThemeSelectScreen from '../screens/ThemeSelectScreen';
import WatchDetailScreen from '../screens/WatchDetailScreen';
import QuestScreen from '../screens/QuestScreen';
import QuestCompleteScreen from '../screens/QuestCompleteScreen';

const Stack = createStackNavigator();

// ─── Auth + Quest setup persistence via localStorage ───────────────────────
export const saveAuth = () => {
  if (Platform.OS === 'web') { try { localStorage.setItem('messmer_authed', '1'); } catch {} }
};
export const clearAuth = () => {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem('messmer_authed');
      localStorage.removeItem('messmer_characterId');
      localStorage.removeItem('messmer_themeId');
    } catch {}
  }
};
const isAuthed = (): boolean => {
  if (Platform.OS === 'web') { try { return localStorage.getItem('messmer_authed') === '1'; } catch {} }
  return false;
};
export const saveQuestSetup = (key: 'characterId' | 'themeId', value: string) => {
  if (Platform.OS === 'web') { try { localStorage.setItem(`messmer_${key}`, value); } catch {} }
};
export const getQuestSetup = () => {
  if (Platform.OS === 'web') {
    try {
      return {
        characterId: localStorage.getItem('messmer_characterId') || '',
        themeId: localStorage.getItem('messmer_themeId') || '',
      };
    } catch {}
  }
  return { characterId: '', themeId: '' };
};

// ─── Navigator ─────────────────────────────────────────────────────────────
export default function AppNavigator() {
  const [splashDone, setSplashDone] = useState(false);
  const [startRoute, setStartRoute] = useState<string>('Login');

  useEffect(() => {
    setStartRoute(isAuthed() ? 'Home' : 'Login');
  }, []);

  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={startRoute}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#0A0A0A', flex: 1 },
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StoryList" component={StoryListScreen} />
        <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
        <Stack.Screen name="CharacterSelect" component={CharacterSelectScreen} />
        <Stack.Screen name="StoryIntro" component={StoryIntroScreen} />
        <Stack.Screen name="SkinSelect" component={SkinSelectScreen} />
        <Stack.Screen name="StoryExperience" component={StoryExperienceScreen} />
        <Stack.Screen name="GameplayComplete" component={GameplayCompleteScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ThemeSelect" component={ThemeSelectScreen} />
        <Stack.Screen name="WatchDetail" component={WatchDetailScreen} />
        <Stack.Screen name="QuestScreen" component={QuestScreen} />
        <Stack.Screen name="QuestComplete" component={QuestCompleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
