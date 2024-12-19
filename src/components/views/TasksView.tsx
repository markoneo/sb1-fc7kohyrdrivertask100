import React, { useState } from 'react';
import { Task } from '../../types/task';
import { TaskCard } from '../TaskCard';
import { TaskStats } from '../dashboard/TaskStats';
import { ActionButtons } from '../dashboard/ActionButtons';
import { TaskFilter } from '../dashboard/TaskFilter';

interface TasksViewProps {
  regularTasks: Task[];
  driverTasks: Task[];
  completedCount: number;
  onAddRegular: () => void;
  onAddDriver: () => void;
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TasksView({
  regularTasks,
  driverTasks,
  completedCount,
  onAddRegular,
  onAddDriver,
  onComplete,
  onEdit,
  onDelete,
}: TasksViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'regular' | 'driver'>('all');

  const showRegularTasks = activeFilter === 'all' || activeFilter === 'regular';
  const showDriverTasks = activeFilter === 'all' || activeFilter === 'driver';

  return (
    <div className="space-y-8">
      <TaskStats
        regularCount={regularTasks.length}
        driverCount={driverTasks.length}
        completedCount={completedCount}
      />

      <ActionButtons
        onAddRegular={onAddRegular}
        onAddDriver={onAddDriver}
      />

      <TaskFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {regularTasks.length === 0 && driverTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No tasks found. Create a new task to get started!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {showRegularTasks && regularTasks.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Regular Tasks</h2>
              <div className="space-y-4">
                {regularTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </section>
          )}

          {showDriverTasks && driverTasks.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Driver Tasks</h2>
              <div className="space-y-4">
                {driverTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}