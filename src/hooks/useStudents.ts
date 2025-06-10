import { useState, useEffect, useCallback } from 'react';
import type { Student } from '../types';
import { getStoredStudents, saveStudents } from '../utils/storage';

/**
 * Custom hook for managing student state
 * Demonstrates custom hooks, state management, and localStorage integration
 * 
 * This hook encapsulates all student-related logic and provides a clean API
 * for components to interact with student data
 */
export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load students from localStorage on component mount
   * Demonstrates useEffect for initialization and cleanup
   */
  useEffect(() => {
    const loadStudents = async () => {
      try {
        // Simulate loading delay for better UX demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const storedStudents = getStoredStudents();
        setStudents(storedStudents);
      } catch (error) {
        console.error('Error loading students:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStudents();
  }, []);

  /**
   * Save students to localStorage whenever students array changes
   * Demonstrates useEffect with dependencies for side effects
   */
  useEffect(() => {
    if (!isLoading && students.length >= 0) {
      saveStudents(students);
    }
  }, [students, isLoading]);

  /**
   * Add a new student to the list
   * useCallback prevents unnecessary re-renders of child components
   */
  const addStudent = useCallback((student: Student) => {
    setStudents(prev => [...prev, student]);
  }, []);

  /**
   * Update an existing student
   * Demonstrates immutable state updates
   */
  const updateStudent = useCallback((updatedStudent: Student) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  }, []);

  /**
   * Remove a student from the list
   * Demonstrates array filtering for state updates
   */
  const removeStudent = useCallback((studentId: string) => {
    setStudents(prev => prev.filter(student => student.id !== studentId));
  }, []);

  return {
    students,
    isLoading,
    addStudent,
    updateStudent,
    removeStudent
  };
};