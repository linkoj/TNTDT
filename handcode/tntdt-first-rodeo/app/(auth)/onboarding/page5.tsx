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

export default function OnboardingPage4() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const durationOptions = [
    { id: '30', label: '30 Minutes', description: 'Quick sessions' },
    { id: '45', label: '45 Minutes', description: 'Standard session' },
    { id: '60', label: '60 Minutes', description: 'Full workout' },
    { id: '90', label: '90 Minutes', description: 'Extended session' },
  ];

  const handleSelectDuration = (durationId: string) => {
    updateData('sessionDuration', durationId);
    router.push('/(auth)/onboarding/page5');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 4 of 10</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '40%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>How Long Are Your Sessions?</Text>
        <Text style={styles.subtitle}>
          Per training session, not total time
        </Text>

        <View style={styles.optionsContainer}>
          {durationOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                data.sessionDuration === option.id && styles.optionSelected,
              ]}
              onPress={() => handleSelectDuration(option.id)}
            >
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
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
    paddingVertical: 14,
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
