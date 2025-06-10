import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, BookOpen } from 'lucide-react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useStudents } from './hooks/useStudents';
import { useCourses } from './hooks/useCourses';
import type { Student } from './types';

/**
 * Main application component
 * Demonstrates state management, component composition, and React best practices
 * 
 * Key concepts demonstrated:
 * 1. State management with useState
 * 2. Side effects with useEffect
 * 3. Custom hooks for logic separation
 * 4. Conditional rendering
 * 5. Event handling
 * 6. Component composition
 * 7. TypeScript integration
 */
function App() {
  // Student management state using custom hook
  const { students, isLoading: studentsLoading, addStudent, updateStudent } = useStudents();
  
  // Courses data management using custom hook
  const { courses, isLoading: coursesLoading, error: coursesError, retry } = useCourses();
  
  // UI state management
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Handle opening the add student form
   * Demonstrates event handling and state updates
   */
  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  /**
   * Handle opening the edit student form
   * Demonstrates callback props and state management
   */
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  /**
   * Handle form submission for both add and edit operations
   * Demonstrates conditional logic and state updates
   */
  const handleFormSubmit = (studentData: Student) => {
    if (editingStudent) {
      updateStudent(studentData);
    } else {
      addStudent(studentData);
    }
    
    // Close form and reset state
    setShowForm(false);
    setEditingStudent(null);
  };

  /**
   * Handle form cancellation
   * Demonstrates state cleanup
   */
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  /**
   * Update document title based on student count
   * Demonstrates useEffect for side effects and DOM manipulation
   */
  useEffect(() => {
    document.title = `Student Dashboard (${students.length} students)`;
  }, [students.length]);

  // Show loading state while initial data is being fetched
  if (studentsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg\" message="Loading student dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Student Management Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Manage your students and course enrollments
                </p>
              </div>
            </div>
            
            <button
              onClick={handleAddStudent}
              disabled={coursesError !== null}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Student
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Loading/Error State */}
        {coursesLoading && (
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-medium">Loading available courses...</span>
              </div>
            </div>
          </div>
        )}
        
        {coursesError && (
          <div className="mb-6">
            <ErrorMessage 
              message={`Failed to load courses: ${coursesError}`}
              onRetry={retry}
            />
          </div>
        )}

        {/* Student List */}
        <StudentList
          students={students}
          onEditStudent={handleEditStudent}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </main>

      {/* Student Form Modal */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          courses={courses}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={coursesLoading}
        />
      )}
    </div>
  );
}

export default App;