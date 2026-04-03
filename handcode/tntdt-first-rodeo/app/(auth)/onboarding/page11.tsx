import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '@/context/OnboardingContext';
import { useAuth } from '@/context/AuthContext';
import { ref, update } from 'firebase/database';
import { database } from '@/config/firebase';

export default function OnboardingPage10() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const supplementOptions = [
    { id: 'none', label: 'Not Interested' },
    { id: 'multivitamin', label: 'Multivitamins' },
    { id: 'protein', label: 'Protein Powder' },
    { id: 'creatine', label: 'Creatine' },
    { id: 'bcaa', label: 'BCAAs' },
    { id: 'preworkout', label: 'Pre-Workout' },
  ];

  const handleSelectSupplement = (supplementId: string) => {
    updateData('supplementsInterest', supplementId);
  };

  const handleCompleteOnboarding = async () => {
    if (!data.supplementsInterest) {
      Alert.alert('Error', 'Please select a supplement preference');
      return;
    }

    setLoading(true);
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Save all onboarding data to Firebase
      await update(ref(database, `users/${user.uid}`), {
        onboardingCompleted: true,
        fitnessGoal: data.fitnessGoal,
        experienceLevel: data.experienceLevel,
        daysPerWeek: data.daysPerWeek,
        sessionDuration: data.sessionDuration,
        injuries: data.injuries,
        equipment: data.equipment,
        preferredSplit: data.preferredSplit,
        trainingFocus: data.trainingFocus,
        dietaryPreferences: data.dietaryPreferences,
        supplementsInterest: data.supplementsInterest,
        onboardingCompletedAt: new Date().toISOString(),
      });

      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 10 of 10 - Final</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>Supplement Preferences?</Text>
        <Text style={styles.subtitle}>
          Optional - we can suggest supplements based on your goals
        </Text>

        <View style={styles.optionsContainer}>
          {supplementOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                data.supplementsInterest === option.id && styles.optionSelected,
              ]}
              onPress={() => handleSelectSupplement(option.id)}
            >
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Your Profile Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Goal:</Text>
            <Text style={styles.summaryValue}>{data.fitnessGoal}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Experience:</Text>
            <Text style={styles.summaryValue}>{data.experienceLevel}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Training Days:</Text>
            <Text style={styles.summaryValue}>{data.daysPerWeek} days/week</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Session Duration:</Text>
            <Text style={styles.summaryValue}>{data.sessionDuration} minutes</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.completeButton, loading && styles.buttonDisabled]}
        onPress={handleCompleteOnboarding}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Complete & Start Training 🚀</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        disabled={loading}
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
    marginBottom: 30,
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
  summary: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  completeButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#34C759',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
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
