import type { Course, ApiResponse } from '../types';

// Mock API service to demonstrate async/await and API handling
// In a real application, this would connect to a backend service

/**
 * Simulates network delay to demonstrate loading states and async behavior
 * This showcases the JavaScript event loop - the setTimeout pushes the callback
 * to the task queue, allowing other code to execute while waiting
 */
const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => {
    // This demonstrates the event loop: setTimeout is a Web API that schedules
    // the callback to run after the specified time, allowing the main thread
    // to continue executing other code
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

/**
 * Mock courses data - in production, this would come from a real API
 */
const mockCourses: Course[] = [
  { id: 1, name: "HTML Basics" },
  { id: 2, name: "CSS Mastery" },
  { id: 3, name: "JavaScript Pro" },
  { id: 4, name: "React In Depth" },
  { id: 5, name: "Node.js Backend" },
  { id: 6, name: "Python Fundamentals" },
  { id: 7, name: "Database Design" },
  { id: 8, name: "UI/UX Design" }
];

/**
 * Fetches available courses from the API
 * Demonstrates async/await pattern and error handling
 * 
 * Key concepts demonstrated:
 * - async/await for cleaner asynchronous code
 * - Error handling with try/catch
 * - Promise-based API simulation
 * - TypeScript return type annotations
 */
export const fetchCourses = async (): Promise<ApiResponse<Course[]>> => {
  try {
    // Simulate network request delay
    await simulateNetworkDelay(800);
    
    // Simulate random API failure (10% chance) to demonstrate error handling
    if (Math.random() < 0.1) {
      throw new Error('Failed to fetch courses from server');
    }
    
    return {
      data: mockCourses
    };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Validates email format using regex
 * This is a utility function that could be expanded for more complex validation
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generates a unique ID for new students
 * In production, this would typically be handled by the backend database
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};