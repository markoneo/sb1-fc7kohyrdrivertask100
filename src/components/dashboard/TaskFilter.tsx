import React from 'react';
import { ClipboardList, Truck } from 'lucide-react';

interface TaskFilterProps {
  activeFilter: 'all' | 'regular' | 'driver';
  onFilterChange: (filter: 'all' | 'regular' | 'driver') => void;
}

export function TaskFilter({ activeFilter, onFilterChange }: TaskFilterProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onFilterChange('all')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          activeFilter === 'all'
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        All Tasks
      </button>
      <button
        onClick={() => onFilterChange('regular')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          activeFilter === 'regular'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        <ClipboardList size={20} />
        Regular Tasks
      </button>
      <button
        onClick={() => onFilterChange('driver')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          activeFilter === 'driver'
            ? 'bg-purple-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Truck size={20} />
        Driver Tasks
      </button>
    </div>
  );
}