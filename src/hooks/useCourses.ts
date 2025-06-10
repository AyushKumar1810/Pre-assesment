import { useState, useEffect } from 'react';
import type { Course } from '../types';
import { fetchCourses } from '../utils/api';

/**
 * Custom hook for managing courses data
 * Demonstrates custom hooks, async data fetching, and error handling
 */
export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch courses from API
   * Demonstrates async/await, error handling, and loading states
   */
  const fetchCoursesData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchCourses();
      
      if (response.error) {
        setError(response.error);
        setCourses([]);
      } else {
        setCourses(response.data);
      }
    } catch (err) {
      setError('Failed to load courses');
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load courses on component mount
   */
  useEffect(() => {
    fetchCoursesData();
  }, []);

  /**
   * Retry function for error scenarios
   */
  const retry = () => {
    fetchCoursesData();
  };

  return {
    courses,
    isLoading,
    error,
    retry
  };
};