import React from 'react';
import { Menu, Calendar, History } from 'lucide-react';

interface HeaderProps {
  onMenuItemClick: (item: 'tasks' | 'calendar' | 'history') => void;
}

export function Header({ onMenuItemClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <nav className="flex items-center gap-4">
            <button
              onClick={() => onMenuItemClick('calendar')}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Calendar size={20} />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => onMenuItemClick('history')}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <History size={20} />
              <span>History</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}