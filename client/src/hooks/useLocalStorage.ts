import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for persisting state in localStorage
 * @param key - The localStorage key
 * @param initialValue - The initial value if no stored value exists
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get stored value or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Reset function to clear stored value
  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setStoredValue, reset];
}

// Types for quiz progress
export interface QuizProgress {
  answeredQuestions: {
    [questionId: number]: {
      isCorrect: boolean;
      selectedAnswer: number;
      answeredAt: string;
    };
  };
  totalCorrect: number;
  totalIncorrect: number;
  lastUpdated: string;
}

export const initialQuizProgress: QuizProgress = {
  answeredQuestions: {},
  totalCorrect: 0,
  totalIncorrect: 0,
  lastUpdated: new Date().toISOString(),
};

// Types for favorites
export interface FavoritesState {
  favoriteIds: number[];
  lastUpdated: string;
}

export const initialFavorites: FavoritesState = {
  favoriteIds: [],
  lastUpdated: new Date().toISOString(),
};
