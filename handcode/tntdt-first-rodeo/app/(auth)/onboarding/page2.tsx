import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '@/context/OnboardingContext';

export default function OnboardingPage2() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const levels = [
    {
      id: 'beginner',
      label: 'Beginner',
      description: 'New to strength training (0-6 months)',
      icon: '🌱',
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      description: 'Some training experience (6 months - 2 years)',
      icon: '📈',
    },
    {
      id: 'advanced',
      label: 'Advanced',
      description: 'Consistent training (2-5 years)',
      icon: '⭐',
    },
    {
      id: 'elite',
      label: 'Elite',
      description: 'Serious lifter (5+ years)',
      icon: '🏅',
    },
  ];

  const handleSelectLevel = (levelId: string) => {
    updateData('experienceLevel', levelId);
    router.push('/(auth)/onboarding/page3');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 2 of 10</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '20%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>What's Your Training Experience?</Text>
        <Text style={styles.subtitle}>
          This helps us customize your program difficulty
        </Text>

        <View style={styles.optionsContainer}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.option,
                data.experienceLevel === level.id && styles.optionSelected,
              ]}
              onPress={() => handleSelectLevel(level.id)}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionIcon}>{level.icon}</Text>
                <View style={styles.optionText}>
                  <Text style={styles.optionLabel}>{level.label}</Text>
                  <Text style={styles.optionDescription}>{level.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  content: {
    marginBottom: 30,
    flex: 1,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: '#999',
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
