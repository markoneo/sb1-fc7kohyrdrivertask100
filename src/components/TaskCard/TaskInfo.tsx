import React from 'react';
import { Clock, MapPin, Phone, Truck, User, CreditCard, Banknote } from 'lucide-react';
import { Task } from '../../types/task';
import { formatPrice } from '../../utils/formatters';

interface TaskInfoProps {
  task: Task;
}

export function TaskInfo({ task }: TaskInfoProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-600">
        <Clock size={16} />
        <span>{task.date} at {task.time}</span>
      </div>

      {task.type === 'regular' ? (
        <div className="flex items-center gap-2 text-gray-600">
          <User size={16} />
          <span>Assignee: {task.assignee}</span>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}