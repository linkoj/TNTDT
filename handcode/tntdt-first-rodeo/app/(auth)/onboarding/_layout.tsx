import React from 'react';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="page1" />
      <Stack.Screen name="page2" />
      <Stack.Screen name="page3" />
      <Stack.Screen name="page4" />
      <Stack.Screen name="page5" />
      <Stack.Screen name="page6" />
      <Stack.Screen name="page7" />
      <Stack.Screen name="page8" />
      <Stack.Screen name="page9" />
      <Stack.Screen name="page10" />
    </Stack>
  );
}
