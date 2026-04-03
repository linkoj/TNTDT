/**
 * Form validation utilities
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Formatting utilities
 */

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

/**
 * Labels for onboarding options
 */

export const fitnessGoalLabels: Record<string, string> = {
  muscle_gain: 'Build Muscle Mass',
  fat_loss: 'Lose Fat',
  strength: 'Increase Strength',
  endurance: 'Build Endurance',
  general_fitness: 'General Fitness',
  athletic: 'Athletic Performance',
};

export const experienceLevelLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  elite: 'Elite',
};

export const equipmentLabels: Record<string, string> = {
  barbell: 'Barbell',
  dumbbell: 'Dumbbells',
  kettlebell: 'Kettlebells',
  cables: 'Cable Machine',
  machines: 'Weight Machines',
  resistance_bands: 'Resistance Bands',
  pull_up_bar: 'Pull-up Bar',
  bench: 'Bench',
  none: 'Bodyweight Only',
};

export const trainingFocusLabels: Record<string, string> = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  arms: 'Arms (Biceps/Triceps)',
  forearms: 'Forearms',
  core: 'Core / Abs',
  glutes: 'Glutes',
  quads: 'Quadriceps',
  hamstrings: 'Hamstrings',
  calves: 'Calves',
};

/**
 * API/Database utilities
 */

export const handleFirebaseError = (error: any): string => {
  if (error.code === 'auth/email-already-in-use') {
    return 'This email is already in use';
  }
  if (error.code === 'auth/invalid-email') {
    return 'Invalid email address';
  }
  if (error.code === 'auth/weak-password') {
    return 'Password is too weak';
  }
  if (error.code === 'auth/user-not-found') {
    return 'User not found';
  }
  if (error.code === 'auth/wrong-password') {
    return 'Incorrect password';
  }
  return error.message || 'An error occurred';
};

/**
 * Delay utility for animations
 */

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
