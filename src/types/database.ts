export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          date: string
          time: string
          is_completed: boolean
          type: 'regular' | 'driver'
          assignee?: string
          pickup_address?: string
          dropoff_address?: string
          client_name?: string
          client_phone?: string
          vehicle_type?: string
          driver_name?: string
          price?: number
          payment_method?: string
          additional_info?: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          date: string
          time: string
          is_completed?: boolean
          type: 'regular' | 'driver'
          assignee?: string
          pickup_address?: string
          dropoff_address?: string
          client_name?: string
          client_phone?: string
          vehicle_type?: string
          driver_name?: string
          price?: number
          payment_method?: string
          additional_info?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          date?: string
          time?: string
          is_completed?: boolean
          type?: 'regular' | 'driver'
          assignee?: string
          pickup_address?: string
          dropoff_address?: string
          client_name?: string
          client_phone?: string
          vehicle_type?: string
          driver_name?: string
          price?: number
          payment_method?: string
          additional_info?: string
        }
      }
    }
  }
}