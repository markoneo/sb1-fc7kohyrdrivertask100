import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CalendarViewProps {
  onBackToTasks: () => void;
}

export function CalendarView({ onBackToTasks }: CalendarViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBackToTasks}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Back to Tasks
        </button>
        <h2 className="text-2xl font-bold">Calendar View</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500">Calendar view coming soon...</p>
      </div>
    </div>
  );
}