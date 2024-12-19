import React from 'react';
import { Clock, Truck, CheckCircle2 } from 'lucide-react';

interface TaskStatsProps {
  regularCount: number;
  driverCount: number;
  completedCount: number;
}

export function TaskStats({ regularCount, driverCount, completedCount }: TaskStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold">Regular Tasks</h2>
        </div>
        <p className="text-3xl font-bold">{regularCount}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-2">
          <Truck className="text-purple-600" size={24} />
          <h2 className="text-xl font-semibold">Driver Tasks</h2>
        </div>
        <p className="text-3xl font-bold">{driverCount}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="text-green-600" size={24} />
          <h2 className="text-xl font-semibold">Completed Tasks</h2>
        </div>
        <p className="text-3xl font-bold">{completedCount}</p>
      </div>
    </div>
  );
}