export type Language = 'en' | 'ar';

export interface Doctor {
  id: string;
  name: string;
  specialty?: string;
  color: string;
}

export interface ToothStatus {
  id: number; // FDI notation (11-48)
  status: 'healthy' | 'decay' | 'filled' | 'missing' | 'crown' | 'rct';
  notes: string;
}

export interface Payment {
  id: string;
  date: string; // ISO date
  amount: number;
  note: string;
}

export interface PatientImage {
  id: string;
  url: string; // Base64 or Blob URL
  notes: string;
  date: string;
  drawings?: string; // JSON string for canvas paths
}

export interface Patient {
  id: string;
  doctorId: string;
  name: string;
  phone: string;
  age: number;
  gender: 'male' | 'female';
  address: string;
  medicalHistory: string;
  status: 'active' | 'finished';
  teeth: ToothStatus[];
  images: PatientImage[];
  payments: Payment[];
  totalCost: number;
  visits: string[]; // Dates of visits
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string; // Denormalized for easier display
  doctorId: string;
  start: string; // ISO string
  end: string; // ISO string
  note: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Settings {
  clinicName: string;
  darkMode: boolean;
  language: Language;
}

export interface AppData {
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  settings: Settings;
}