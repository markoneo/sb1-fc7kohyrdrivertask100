import React from 'react';
import { DriverTask, VehicleType, PaymentMethod } from '../../types/task';

interface DriverTaskFieldsProps {
  formData: Partial<DriverTask>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function DriverTaskFields({ formData, onChange }: DriverTaskFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
          <input
            type="text"
            name="pickupAddress"
            value={formData.pickupAddress || ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dropoff Address</label>
          <input
            type="text"
            name="dropoffAddress"
            value={formData.dropoffAddress || ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName || ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Client Phone</label>
          <input
            type="tel"
            name="clientPhone"
            value={formData.clientPhone || ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
          <select
            name="vehicleType"
            value={formData.vehicleType || 'Standard'}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="Standard">Standard</option>
            <option value="Executive">Executive</option>
            <option value="Van">Van</option>
            <option value="Minivan">Minivan</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Driver Name</label>
          <input
            type="text"
            name="driverName"
            value={formData.driverName || ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price || ''}
            onChange={onChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod || 'Cash'}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="Cash">Cash to the driver</option>
            <option value="Credit Card">Already Paid with credit card</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Information</label>
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={2}
        />
      </div>
    </>
  );
}