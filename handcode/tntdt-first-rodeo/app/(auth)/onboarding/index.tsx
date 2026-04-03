import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function OnboardingIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(auth)/onboarding/page1');
  }, []);

  return null;
}
