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

export default function OnboardingPage6() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const equipmentOptions = [
    { id: 'barbell', label: 'Barbell', icon: '🏋️' },
    { id: 'dumbbell', label: 'Dumbbells', icon: '💪' },
    { id: 'kettlebell', label: 'Kettlebells', icon: '🎯' },
    { id: 'cables', label: 'Cable Machine', icon: '⚙️' },
    { id: 'machines', label: 'Weight Machines', icon: '🤖' },
    { id: 'resistance_bands', label: 'Resistance Bands', icon: '🎗️' },
    { id: 'pull_up_bar', label: 'Pull-up Bar', icon: '🔝' },
    { id: 'bench', label: 'Bench', icon: '🪑' },
    { id: 'none', label: 'Bodyweight Only', icon: '🚴' },
  ];

  const handleToggleEquipment = (equipmentId: string) => {
    const currentEquipment = data.equipment || [];
    let newEquipment;

    if (equipmentId === 'none') {
      newEquipment = currentEquipment.includes('none') ? [] : ['none'];
    } else {
      // Remove 'none' if adding another equipment
      newEquipment = currentEquipment.filter((e) => e !== 'none');

      if (currentEquipment.includes(equipmentId)) {
        newEquipment = newEquipment.filter((e) => e !== equipmentId);
      } else {
        newEquipment = [...newEquipment, equipmentId];
      }
    }

    updateData('equipment', newEquipment);
  };

  const handleContinue = () => {
    if (data.equipment.length === 0) {
      alert('Please select at least one equipment option');
      return;
    }
    router.push('/(auth)/onboarding/page7');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.progressText}>Question 6 of 10</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>What Equipment Do You Have?</Text>
        <Text style={styles.subtitle}>
          Select all that apply
        </Text>

        <FlatList
          data={equipmentOptions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.option,
                data.equipment.includes(item.id) && styles.optionSelected,
              ]}
              onPress={() => handleToggleEquipment(item.id)}
            >
              <Text style={styles.optionIcon}>{item.icon}</Text>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <View
                style={[
                  styles.checkbox,
                  data.equipment.includes(item.id) && styles.checkboxChecked,
                ]}
              >
                {data.equipment.includes(item.id) && (
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
    fontSize: 20,
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
