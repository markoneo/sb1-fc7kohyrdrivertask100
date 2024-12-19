import React, { useState } from 'react';
import { Task } from '../types/task';
import { X } from 'lucide-react';
import { CommonTaskFields } from './forms/CommonTaskFields';
import { RegularTaskFields } from './forms/RegularTaskFields';
import { DriverTaskFields } from './forms/DriverTaskFields';

interface TaskFormProps {
  type: 'regular' | 'driver';
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  initialTask?: Task | null;
}

export function TaskForm({ type, onSubmit, onCancel, initialTask }: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<Task>>(
    initialTask || {
      type,
      title: '',
      description: '',
      date: '',
      time: '',
      isCompleted: false,
      ...(type === 'regular' 
        ? { assignee: '' }
        : {
            pickupAddress: '',
            dropoffAddress: '',
            clientName: '',
            clientPhone: '',
            vehicleType: 'Standard',
            driverName: '',
            price: 0,
            paymentMethod: 'Cash',
            additionalInfo: ''
          })
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialTask?.id || crypto.randomUUID(),
      createdAt: initialTask?.createdAt || new Date().toISOString(),
    } as Task);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {initialTask ? 'Edit' : 'Create'} {type === 'regular' ? 'Regular' : 'Driver'} Task
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CommonTaskFields formData={formData} onChange={handleChange} />
          
          {type === 'regular' ? (
            <RegularTaskFields formData={formData} onChange={handleChange} />
          ) : (
            <DriverTaskFields formData={formData} onChange={handleChange} />
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {initialTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}