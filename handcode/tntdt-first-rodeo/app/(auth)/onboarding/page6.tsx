import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '@/context/OnboardingContext';

export default function OnboardingPage5() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const injuryOptions = [
    { id: 'none', label: 'No Injuries/Limitations' },
    { id: 'lower_back', label: 'Lower Back Issues' },
    { id: 'shoulder', label: 'Shoulder Issues' },
    { id: 'knee', label: 'Knee Issues' },
    { id: 'elbow', label: 'Elbow/Wrist Issues' },
    { id: 'multiple', label: 'Multiple Issues' },
  ];

  const handleSelectInjury = (injuryId: string) => {
    updateData('injuries', injuryId);
  };

  const handleContinue = () => {
    router.push('/(auth)/onboarding/page6');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 5 of 10</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>Any Injuries or Limitations?</Text>
        <Text style={styles.subtitle}>
          We'll customize your program accordingly
        </Text>

        <View style={styles.optionsContainer}>
          {injuryOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                data.injuries === option.id && styles.optionSelected,
              ]}
              onPress={() => handleSelectInjury(option.id)}
            >
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {data.injuries !== 'none' && data.injuries !== '' && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Additional Details (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Describe your injuries or limitations..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue →</Text>
      </TouchableOpacity>

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
    marginBottom: 20,
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
  },
  notesContainer: {
    marginTop: 20,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#1a1a1a',
    fontSize: 14,
    textAlignVertical: 'top',
  },
  continueButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
