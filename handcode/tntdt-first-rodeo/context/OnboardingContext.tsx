import React, { createContext, useContext, useState } from 'react';

export type OnboardingData = {
  fitnessGoal: string;
  experienceLevel: string;
  daysPerWeek: string;
  sessionDuration: string;
  injuries: string;
  equipment: string[];
  preferredSplit: string;
  trainingFocus: string[];
  dietaryPreferences: string;
  supplementsInterest: string;
};

const initialOnboardingData: OnboardingData = {
  fitnessGoal: '',
  experienceLevel: '',
  daysPerWeek: '',
  sessionDuration: '',
  injuries: '',
  equipment: [],
  preferredSplit: '',
  trainingFocus: [],
  dietaryPreferences: '',
  supplementsInterest: '',
};

type OnboardingContextType = {
  data: OnboardingData;
  updateData: (key: keyof OnboardingData, value: any) => void;
  resetData: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<OnboardingData>(initialOnboardingData);

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetData = () => {
    setData(initialOnboardingData);
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
