import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '@/context/OnboardingContext';

export default function OnboardingPage8() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const focusAreas = [
    { id: 'chest', label: 'Chest', icon: '🏋️' },
    { id: 'back', label: 'Back', icon: '🔙' },
    { id: 'shoulders', label: 'Shoulders', icon: '💪' },
    { id: 'arms', label: 'Arms (Biceps/Triceps)', icon: '🎯' },
    { id: 'forearms', label: 'Forearms', icon: '✋' },
    { id: 'core', label: 'Core / Abs', icon: '⭐' },
    { id: 'glutes', label: 'Glutes', icon: '🍑' },
    { id: 'quads', label: 'Quadriceps', icon: '🦵' },
    { id: 'hamstrings', label: 'Hamstrings', icon: '🔙' },
    { id: 'calves', label: 'Calves', icon: '👟' },
  ];

  const handleToggleFocus = (focusId: string) => {
    const currentFocus = data.trainingFocus || [];
    let newFocus;

    if (currentFocus.includes(focusId)) {
      newFocus = currentFocus.filter((f) => f !== focusId);
    } else {
      newFocus = [...currentFocus, focusId];
    }

    updateData('trainingFocus', newFocus);
  };

  const handleContinue = () => {
    if (data.trainingFocus.length === 0) {
      alert('Please select at least one focus area');
      return;
    }
    router.push('/(auth)/onboarding/page9');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 8 of 10</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '80%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>Focus Areas</Text>
        <Text style={styles.subtitle}>
          Which muscle groups do you want to prioritize? (Select at least 1)
        </Text>

        <FlatList
          data={focusAreas}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.option,
                data.trainingFocus.includes(item.id) && styles.optionSelected,
              ]}
              onPress={() => handleToggleFocus(item.id)}
            >
              <Text style={styles.optionIcon}>{item.icon}</Text>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <View
                style={[
                  styles.checkbox,
                  data.trainingFocus.includes(item.id) && styles.checkboxChecked,
                ]}
              >
                {data.trainingFocus.includes(item.id) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  optionIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  separator: {
    height: 8,
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
