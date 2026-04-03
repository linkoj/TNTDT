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

export default function OnboardingPage9() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const dietaryOptions = [
    { id: 'omnivore', label: 'Omnivore', description: 'No dietary restrictions' },
    { id: 'vegetarian', label: 'Vegetarian', description: 'No meat' },
    { id: 'vegan', label: 'Vegan', description: 'No animal products' },
    { id: 'keto', label: 'Keto Diet', description: 'Low carb, high fat' },
    { id: 'gluten_free', label: 'Gluten-Free', description: 'Avoid gluten' },
    { id: 'high_protein', label: 'High Protein Focus', description: 'Prioritize protein' },
  ];

  const handleSelectDiet = (dietId: string) => {
    updateData('dietaryPreferences', dietId);
    router.push('/(auth)/onboarding/page10');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 9 of 10</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '90%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>Dietary Preferences</Text>
        <Text style={styles.subtitle}>
          Helps us suggest nutrition plans
        </Text>

        <View style={styles.optionsContainer}>
          {dietaryOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                data.dietaryPreferences === option.id && styles.optionSelected,
              ]}
              onPress={() => handleSelectDiet(option.id)}
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
