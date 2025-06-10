import type { Student } from '../types';

/**
 * Local storage utilities for persisting student data
 * In a production app, this would be replaced with actual API calls
 */

const STORAGE_KEY = 'students_data';

/**
 * Retrieves students from localStorage
 * Demonstrates error handling for JSON parsing
 */
export const getStoredStudents = (): Student[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error retrieving students from storage:', error);
    return [];
  }
};

/**
 * Saves students to localStorage
 * Includes error handling for storage quota exceeded scenarios
 */
export const saveStudents = (students: Student[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Error saving students to storage:', error);
    // In production, you might want to notify the user about storage issues
  }
};