import React, { useMemo } from 'react';
import { Search, Users } from 'lucide-react';
import StudentCard from './StudentCard';
import type { Student } from '../types';

/**
 * Student list component with search functionality
 * Demonstrates useMemo for performance optimization and array filtering
 */
interface StudentListProps {
  students: Student[];
  onEditStudent: (student: Student) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  onEditStudent,
  searchTerm,
  onSearchChange
}) => {
  /**
   * Filtered students based on search term
   * useMemo prevents unnecessary re-filtering when other props change
   * This demonstrates React performance optimization
   */
  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) {
      return students;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return students.filter(student =>
      student.name.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.enrolledCourse.toLowerCase().includes(searchLower)
    );
  }, [students, searchTerm]);

  /**
   * Handles search input changes
   * Demonstrates controlled component pattern for search functionality
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Students Directory
              </h2>
              <p className="text-sm text-gray-600">
                {filteredStudents.length} of {students.length} students
              </p>
            </div>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
        </div>
      </div>
      
      {/* Students Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={onEditStudent}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            {searchTerm ? 'No students found' : 'No students yet'}
          </h3>
          <p className="text-gray-500">
            {searchTerm 
              ? `No students match "${searchTerm}". Try adjusting your search.`
              : 'Add your first student to get started!'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentList;