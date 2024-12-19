import type { Database } from '../types/database';
import type { Task, RegularTask, DriverTask } from '../types/task';

type DatabaseTask = Database['public']['Tables']['tasks']['Row'];

export function mapDatabaseToTask(dbTask: DatabaseTask): Task {
  const baseTask = {
    id: dbTask.id,
    title: dbTask.title,
    description: dbTask.description,
    date: dbTask.date,
    time: dbTask.time,
    isCompleted: dbTask.is_completed,
    createdAt: dbTask.created_at,
  };

  if (dbTask.type === 'regular') {
    return {
      ...baseTask,
      type: 'regular',
      assignee: dbTask.assignee!,
    } as RegularTask;
  }

  return {
    ...baseTask,
    type: 'driver',
    pickupAddress: dbTask.pickup_address!,
    dropoffAddress: dbTask.dropoff_address!,
    clientName: dbTask.client_name!,
    clientPhone: dbTask.client_phone!,
    vehicleType: dbTask.vehicle_type! as any,
    driverName: dbTask.driver_name!,
    price: dbTask.price!,
    paymentMethod: dbTask.payment_method! as any,
    additionalInfo: dbTask.additional_info,
  } as DriverTask;
}

export function mapTaskToDatabase(task: Partial<Task>): Database['public']['Tables']['tasks']['Insert'] {
  const baseTask = {
    title: task.title!,
    description: task.description!,
    date: task.date!,
    time: task.time!,
    is_completed: task.isCompleted ?? false,
    type: task.type!,
  };

  if (task.type === 'regular') {
    return {
      ...baseTask,
      assignee: (task as RegularTask).assignee,
    };
  }

  const driverTask = task as DriverTask;
  return {
    ...baseTask,
    pickup_address: driverTask.pickupAddress,
    dropoff_address: driverTask.dropoffAddress,
    client_name: driverTask.clientName,
    client_phone: driverTask.clientPhone,
    vehicle_type: driverTask.vehicleType,
    driver_name: driverTask.driverName,
    price: driverTask.price,
    payment_method: driverTask.paymentMethod,
    additional_info: driverTask.additionalInfo,
  };
}