import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types/task';
import * as taskService from '../services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await taskService.fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create task'));
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (task: Task) => {
    try {
      const updatedTask = await taskService.updateTask(task);
      setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update task'));
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete task'));
      throw err;
    }
  }, []);

  const completeTask = useCallback(async (id: string) => {
    try {
      const completedTask = await taskService.completeTask(id);
      setTasks(prev => prev.map(t => t.id === id ? completedTask : t));
      return completedTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to complete task'));
      throw err;
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
  };
}