/**
 * Global types for TnTdT Trainer app
 */

import { User as FirebaseUser } from 'firebase/auth';

export type User = FirebaseUser;

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  createdAt: string;
  onboardingCompleted: boolean;
  onboardingCompletedAt?: string;
  
  // Onboarding data
  fitnessGoal?: FitnessGoal;
  experienceLevel?: ExperienceLevel;
  daysPerWeek?: string;
  sessionDuration?: string;
  injuries?: string;
  equipment?: Equipment[];
  preferredSplit?: TrainingSplit;
  trainingFocus?: FocusArea[];
  dietaryPreferences?: DietaryPreference;
  supplementsInterest?: SupplementInterest;
}

export type FitnessGoal = 
  | 'muscle_gain'
  | 'fat_loss'
  | 'strength'
  | 'endurance'
  | 'general_fitness'
  | 'athletic';

export type ExperienceLevel = 
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'elite';

export type Equipment = 
  | 'barbell'
  | 'dumbbell'
  | 'kettlebell'
  | 'cables'
  | 'machines'
  | 'resistance_bands'
  | 'pull_up_bar'
  | 'bench'
  | 'none';

export type TrainingSplit = 
  | 'full_body'
  | 'upper_lower'
  | 'push_pull_legs'
  | 'body_part'
  | 'no_preference';

export type FocusArea = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'forearms'
  | 'core'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'calves';

export type DietaryPreference = 
  | 'omnivore'
  | 'vegetarian'
  | 'vegan'
  | 'keto'
  | 'gluten_free'
  | 'high_protein';

export type SupplementInterest = 
  | 'none'
  | 'multivitamin'
  | 'protein'
  | 'creatine'
  | 'bcaa'
  | 'preworkout';

export interface OnboardingData {
  fitnessGoal: FitnessGoal | '';
  experienceLevel: ExperienceLevel | '';
  daysPerWeek: string;
  sessionDuration: string;
  injuries: string;
  equipment: Equipment[];
  preferredSplit: TrainingSplit | '';
  trainingFocus: FocusArea[];
  dietaryPreferences: DietaryPreference | '';
  supplementsInterest: SupplementInterest | '';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export interface OnboardingContextType {
  data: OnboardingData;
  updateData: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  resetData: () => void;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
