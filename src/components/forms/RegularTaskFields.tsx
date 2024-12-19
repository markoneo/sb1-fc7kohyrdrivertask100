import React from 'react';
import { RegularTask } from '../../types/task';

interface RegularTaskFieldsProps {
  formData: Partial<RegularTask>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function RegularTaskFields({ formData, onChange }: RegularTaskFieldsProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Assignee</label>
      <input
        type="text"
        name="assignee"
        value={formData.assignee || ''}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
  );
}