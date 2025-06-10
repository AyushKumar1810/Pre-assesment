import React, { useState, useEffect, useCallback } from 'react';
import { X, User, Mail, BookOpen, Image } from 'lucide-react';
import type { Student, Course, FormErrors } from '../types';
import { validateEmail, generateId } from '../utils/api';

/**
 * Student form component for adding and editing students
 * Demonstrates controlled components, form validation, and React hooks
 */
interface StudentFormProps {
  student?: Student | null;
  courses: Course[];
  onSubmit: (student: Student) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  courses,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  // Form state using controlled components pattern
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enrolledCourse: '',
    profileImage: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Initialize form data when editing a student
   * Demonstrates useEffect for side effects and dependency array
   */
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        enrolledCourse: student.enrolledCourse,
        profileImage: student.profileImage
      });
    } else {
      // Reset form for new student
      setFormData({
        name: '',
        email: '',
        enrolledCourse: '',
        profileImage: ''
      });
    }
    // Clear errors when switching between add/edit modes
    setErrors({});
  }, [student]);

  /**
   * Validates the form data
   * Demonstrates form validation logic and error handling
   * 
   * @returns boolean indicating if form is valid
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Course validation
    if (!formData.enrolledCourse) {
      newErrors.enrolledCourse = 'Please select a course';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  /**
   * Handles input changes for controlled components
   * Demonstrates event handling and state updates
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  /**
   * Handles form submission
   * Demonstrates async form handling and loading states
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form processing delay to demonstrate loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const studentData: Student = {
        id: student?.id || generateId(),
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        enrolledCourse: formData.enrolledCourse,
        profileImage: formData.profileImage || `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000) + 1000}/pexels-photo-${Math.floor(Math.random() * 1000) + 1000}.jpeg?auto=compress&cs=tinysrgb&w=400`,
        dateEnrolled: student?.dateEnrolled || new Date().toISOString()
      };
      
      onSubmit(studentData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter student's full name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="student@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          {/* Course Selection */}
          <div>
            <label htmlFor="enrolledCourse" className="block text-sm font-medium text-gray-700 mb-2">
              <BookOpen className="w-4 h-4 inline mr-2" />
              Enrolled Course
            </label>
            <select
              id="enrolledCourse"
              name="enrolledCourse"
              value={formData.enrolledCourse}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.enrolledCourse ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              disabled={isSubmitting || isLoading}
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.enrolledCourse && (
              <p className="mt-1 text-sm text-red-600">{errors.enrolledCourse}</p>
            )}
          </div>
          
          {/* Profile Image URL */}
          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
              <Image className="w-4 h-4 inline mr-2" />
              Profile Image URL (Optional)
            </label>
            <input
              type="url"
              id="profileImage"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave empty for a random profile image
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              {isSubmitting ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;