export type VehicleType = 'Standard' | 'Executive' | 'Van' | 'Minivan';
export type PaymentMethod = 'Cash' | 'Credit Card';

export interface BaseTask {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface RegularTask extends BaseTask {
  type: 'regular';
  assignee: string;
}

export interface DriverTask extends BaseTask {
  type: 'driver';
  pickupAddress: string;
  dropoffAddress: string;
  clientName: string;
  clientPhone: string;
  vehicleType: VehicleType;
  driverName: string;
  price: number;
  paymentMethod: PaymentMethod;
  additionalInfo?: string;
}

export type Task = RegularTask | DriverTask;