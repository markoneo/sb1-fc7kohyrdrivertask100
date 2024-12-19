import React from 'react';
import { Task } from '../../types/task';
import { TaskInfo } from './TaskInfo';
import { TaskActions } from './TaskActions';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete?: (id: string) => void;
  isHistory?: boolean;
}

export function TaskCard({ task, onComplete, onEdit, onDelete, isHistory = false }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <TaskActions
          task={task}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          isHistory={isHistory}
        />
      </div>
      
      <p className="text-gray-600 mb-3">{task.description}</p>
      <TaskInfo task={task} />
    </div>
  );
}