import React, { useState } from 'react';
import type { Task } from './types/task';
import { TaskForm } from './components/TaskForm';
import { Header } from './components/layout/Header';
import { TasksView } from './components/views/TasksView';
import { HistoryView } from './components/views/HistoryView';
import { CalendarView } from './components/views/CalendarView';
import { useTasks } from './hooks/useTasks';
import { sortTasksByDateTime } from './utils/taskSort';

export default function App() {
  const { tasks, loading, error, addTask, updateTask, deleteTask, completeTask } = useTasks();
  const [showForm, setShowForm] = useState<'regular' | 'driver' | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentView, setCurrentView] = useState<'tasks' | 'calendar' | 'history'>('tasks');

  const handleAddTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      if (editingTask) {
        await updateTask({ ...task, id: editingTask.id, createdAt: editingTask.createdAt });
      } else {
        await addTask(task);
      }
      setShowForm(null);
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(task.type);
  };

  // Sort tasks by date and time
  const sortedActiveTasks = tasks
    .filter(task => !task.isCompleted)
    .sort(sortTasksByDateTime);

  const regularTasks = sortedActiveTasks.filter(task => task.type === 'regular');
  const driverTasks = sortedActiveTasks.filter(task => task.type === 'driver');
  const completedTasks = tasks
    .filter(task => task.isCompleted)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onMenuItemClick={setCurrentView} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {currentView === 'tasks' && (
          <TasksView
            regularTasks={regularTasks}
            driverTasks={driverTasks}
            completedCount={completedTasks.length}
            onAddRegular={() => setShowForm('regular')}
            onAddDriver={() => setShowForm('driver')}
            onComplete={completeTask}
            onEdit={handleEditTask}
            onDelete={deleteTask}
          />
        )}

        {currentView === 'history' && (
          <HistoryView
            completedTasks={completedTasks}
            onBackToTasks={() => setCurrentView('tasks')}
          />
        )}

        {currentView === 'calendar' && (
          <CalendarView onBackToTasks={() => setCurrentView('tasks')} />
        )}

        {showForm && (
          <TaskForm
            type={showForm}
            onSubmit={handleAddTask}
            onCancel={() => {
              setShowForm(null);
              setEditingTask(null);
            }}
            initialTask={editingTask}
          />
        )}
      </main>
    </div>
  );
}