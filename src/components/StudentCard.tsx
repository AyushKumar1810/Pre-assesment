import React from 'react';
import { Mail, BookOpen, Calendar, Edit2 } from 'lucide-react';
import type { Student } from '../types';

/**
 * Individual student card component
 * Demonstrates props interface, event handling, and responsive design
 */
interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onEdit }) => {
  /**
   * Handles the edit button click
   * Demonstrates event handling and callback props
   */
  const handleEdit = () => {
    onEdit(student);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Student Image */}
      <div className="relative">
        <img
          src={student.profileImage}
          alt={`${student.name}'s profile`}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => {
            // Fallback image if the provided URL fails to load
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      {/* Student Information */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{student.name}</h3>
          <button
            onClick={handleEdit}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Edit student"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-3 text-blue-500" />
            <span className="text-sm truncate">{student.email}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <BookOpen className="w-4 h-4 mr-3 text-green-500" />
            <span className="text-sm font-medium">{student.enrolledCourse}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-3 text-purple-500" />
            <span className="text-sm">
              Enrolled: {new Date(student.dateEnrolled).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;