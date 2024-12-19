import React from 'react';
import { Task } from '../types/task';
import { Clock, MapPin, Phone, Truck, User, CreditCard, Banknote, FileDown } from 'lucide-react';
import { generateDriverTaskPDF } from '../utils/pdfGenerator';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  isHistory?: boolean;
}

export function TaskCard({ task, onComplete, onEdit, isHistory = false }: TaskCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleDownloadPDF = () => {
    if (task.type === 'driver') {
      generateDriverTaskPDF(task);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <div className="flex gap-2">
          {!isHistory && !task.isCompleted && (
            <>
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onComplete(task.id)}
                className="text-green-600 hover:text-green-800"
              >
                Complete
              </button>
            </>
          )}
          {task.type === 'driver' && (
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
              title="Download PDF"
            >
              <FileDown size={18} />
              PDF
            </button>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-3">{task.description}</p>
      
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <Clock size={16} />
        <span>{task.date} at {task.time}</span>
      </div>

      {task.type === 'regular' ? (
        <div className="flex items-center gap-2 text-gray-600">
          <User size={16} />
          <span>Assignee: {task.assignee}</span>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            <span>Pickup: {task.pickupAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            <span>Dropoff: {task.dropoffAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User size={16} />
            <span>Client: {task.clientName}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={16} />
            <span>Phone: {task.clientPhone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Truck size={16} />
            <span>Vehicle: {task.vehicleType}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User size={16} />
            <span>Driver: {task.driverName}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            {task.paymentMethod === 'Cash' ? <Banknote size={16} /> : <CreditCard size={16} />}
            <span>{formatPrice(task.price)} - {task.paymentMethod}</span>
          </div>
        </div>
      )}
    </div>
  );
}