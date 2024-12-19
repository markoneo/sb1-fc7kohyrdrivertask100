import { supabase } from '../lib/supabase';
import type { Task } from '../types/task';
import { mapDatabaseToTask, mapTaskToDatabase } from '../utils/taskMapper';

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) throw error;
  return data.map(mapDatabaseToTask);
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert(mapTaskToDatabase(task))
    .select()
    .single();

  if (error) throw error;
  return mapDatabaseToTask(data);
}

export async function updateTask(task: Task): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update(mapTaskToDatabase(task))
    .eq('id', task.id)
    .select()
    .single();

  if (error) throw error;
  return mapDatabaseToTask(data);
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function completeTask(id: string): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ is_completed: true })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapDatabaseToTask(data);
}