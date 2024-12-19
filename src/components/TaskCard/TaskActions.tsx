import React from 'react';
import { FileDown, Pencil, CheckCircle, Trash2 } from 'lucide-react';
import { Task } from '../../types/task';
import { generateDriverTaskPDF } from '../../utils/pdf';

interface TaskActionsProps {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete?: (id: string) => void;
  isHistory?: boolean;
}

export function TaskActions({ task, onComplete, onEdit, onDelete, isHistory = false }: TaskActionsProps) {
  if (isHistory) {
    return task.type === 'driver' ? (
      <button
        onClick={() => generateDriverTaskPDF(task)}
        className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
        title="Download PDF"
      >
        <FileDown size={18} />
        PDF
      </button>
    ) : null;
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => onEdit(task)}
        className="text-blue-600 hover:text-blue-800"
        title="Edit task"
      >
        <Pencil size={18} />
      </button>
      <button
        onClick={() => onComplete(task.id)}
        className="text-green-600 hover:text-green-800"
        title="Complete task"
      >
        <CheckCircle size={18} />
      </button>
      {onDelete && (
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-800"
          title="Delete task"
        >
          <Trash2 size={18} />
        </button>
      )}
      {task.type === 'driver' && (
        <button
          onClick={() => generateDriverTaskPDF(task)}
          className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
          title="Download PDF"
        >
          <FileDown size={18} />
          PDF
        </button>
      )}
    </div>
  );
}