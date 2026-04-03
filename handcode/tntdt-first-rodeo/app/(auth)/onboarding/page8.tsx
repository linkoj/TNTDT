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

export default function OnboardingPage7() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const splits = [
    {
      id: 'full_body',
      label: 'Full Body',
      description: 'Train all muscle groups each session',
      icon: '🔄',
    },
    {
      id: 'upper_lower',
      label: 'Upper/Lower',
      description: 'Alternate between upper and lower body',
      icon: '📊',
    },
    {
      id: 'push_pull_legs',
      label: 'PPL (Push/Pull/Legs)',
      description: '3-day split + rest days',
      icon: '🔃',
    },
    {
      id: 'body_part',
      label: 'Body Part Split',
      description: 'Focus one muscle group per session',
      icon: '🎯',
    },
    {
      id: 'no_preference',
      label: 'No Preference',
      description: 'Let AI decide based on your goals',
      icon: '🤖',
    },
  ];

  const handleSelectSplit = (splitId: string) => {
    updateData('preferredSplit', splitId);
    router.push('/(auth)/onboarding/page8');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 7 of 10</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '70%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>Preferred Training Split?</Text>
        <Text style={styles.subtitle}>
          How would you like to structure your workouts?
        </Text>

        <View style={styles.optionsContainer}>
          {splits.map((split) => (
            <TouchableOpacity
              key={split.id}
              style={[
                styles.option,
                data.preferredSplit === split.id && styles.optionSelected,
              ]}
              onPress={() => handleSelectSplit(split.id)}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionIcon}>{split.icon}</Text>
                <View style={styles.optionText}>
                  <Text style={styles.optionLabel}>{split.label}</Text>
                  <Text style={styles.optionDescription}>{split.description}</Text>
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
