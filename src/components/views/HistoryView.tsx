import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Task } from '../../types/task';
import { TaskCard } from '../TaskCard';

interface HistoryViewProps {
  completedTasks: Task[];
  onBackToTasks: () => void;
}

export function HistoryView({ completedTasks, onBackToTasks }: HistoryViewProps) {
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
        <h2 className="text-2xl font-bold">Completed Tasks History</h2>
      </div>

      <div className="space-y-4">
        {completedTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={() => {}}
            onEdit={() => {}}
            isHistory
          />
        ))}
        {completedTasks.length === 0 && (
          <p className="text-center text-gray-500 py-8">No completed tasks yet</p>
        )}
      </div>
    </div>
  );
}