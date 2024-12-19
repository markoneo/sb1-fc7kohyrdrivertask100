import React from 'react';
import { Clock, Truck } from 'lucide-react';

interface ActionButtonsProps {
  onAddRegular: () => void;
  onAddDriver: () => void;
}

export function ActionButtons({ onAddRegular, onAddDriver }: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <button
        onClick={onAddRegular}
        className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-3 px-4 hover:bg-blue-700"
      >
        <Clock size={20} />
        Add Regular Task
      </button>
      <button
        onClick={onAddDriver}
        className="flex items-center justify-center gap-2 bg-purple-600 text-white rounded-lg py-3 px-4 hover:bg-purple-700"
      >
        <Truck size={20} />
        Add Driver Task
      </button>
    </div>
  );
}