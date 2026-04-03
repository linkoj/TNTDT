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

export default function OnboardingPage1() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const goals = [
    { id: 'muscle_gain', label: 'Build Muscle Mass', icon: '💪' },
    { id: 'fat_loss', label: 'Lose Fat', icon: '🔥' },
    { id: 'strength', label: 'Increase Strength', icon: '⚡' },
    { id: 'endurance', label: 'Build Endurance', icon: '🏃' },
    { id: 'general_fitness', label: 'General Fitness', icon: '✨' },
    { id: 'athletic', label: 'Athletic Performance', icon: '🏆' },
  ];

  const handleSelectGoal = (goalId: string) => {
    updateData('fitnessGoal', goalId);
    router.push('/(auth)/onboarding/page2');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 1 of 10</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '10%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>What's Your Primary Fitness Goal?</Text>
        <Text style={styles.subtitle}>
          Choose the goal that best represents your focus
        </Text>

        <View style={styles.optionsContainer}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.option,
                data.fitnessGoal === goal.id && styles.optionSelected,
              ]}
              onPress={() => handleSelectGoal(goal.id)}
            >
              <Text style={styles.optionIcon}>{goal.icon}</Text>
              <Text style={styles.optionLabel}>{goal.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
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
  optionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
    flex: 1,
  },
});
