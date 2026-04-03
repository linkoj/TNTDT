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

export default function OnboardingPage3() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const daysOptions = [
    { id: '2', label: '2 Days/Week', description: 'Maintenance level' },
    { id: '3', label: '3 Days/Week', description: 'Moderate commitment' },
    { id: '4', label: '4 Days/Week', description: 'Good frequency' },
    { id: '5', label: '5 Days/Week', description: 'High commitment' },
    { id: '6', label: '6 Days/Week', description: 'Very high commitment' },
  ];

  const handleSelectDays = (daysId: string) => {
    updateData('daysPerWeek', daysId);
    router.push('/(auth)/onboarding/page4');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 3 of 10</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '30%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>How Many Days/Week Can You Train?</Text>
        <Text style={styles.subtitle}>
          Pick what fits your schedule best
        </Text>

        <View style={styles.optionsContainer}>
          {daysOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                data.daysPerWeek === option.id && styles.optionSelected,
              ]}
              onPress={() => handleSelectDays(option.id)}
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
