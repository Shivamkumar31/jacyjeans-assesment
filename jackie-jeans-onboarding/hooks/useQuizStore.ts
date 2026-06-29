'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizData } from '@/types/quiz';

interface QuizStore {
  data: QuizData;
  currentStep: number;
  updateData: (field: keyof QuizData, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  setCurrentStep: (step: number) => void;
}

const initialState: QuizData = {
  height: undefined,
  weight: undefined,
  waist: undefined,
  hip: undefined,
  waistFit: undefined,
  rise: undefined,
  thigh: undefined,
  brands: [],
  brandSizes: {},
  biggestIssue: undefined,
};

export const useQuizStore = create<QuizStore>(
  persist(
    (set) => ({
      data: initialState,
      currentStep: 0,
      updateData: (field, value) =>
        set((state) => ({
          data: { ...state.data, [field]: value },
        })),
      nextStep: () =>
        set((state) => ({
          currentStep: state.currentStep + 1,
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(0, state.currentStep - 1),
        })),
      setCurrentStep: (step) =>
        set(() => ({
          currentStep: step,
        })),
      reset: () =>
        set({
          data: initialState,
          currentStep: 0,
        }),
    }),
    {
      name: 'quiz-storage',
      skipHydration: false,
    }
  )
);
