// TypeScript interfaces for type safety and better development experience
export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourse: string;
  profileImage: string;
  dateEnrolled: string;
}

export interface Course {
  id: number;
  name: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  enrolledCourse?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}