import { AppData, Patient, Doctor, Appointment, Settings } from '../types';

const STORAGE_KEY = 'dental_clinic_db_v1';
const AUTH_KEY = 'dental_clinic_auth';

const INITIAL_DATA: AppData = {
  doctors: [],
  patients: [],
  appointments: [],
  settings: {
    clinicName: '',
    darkMode: false,
    language: 'ar',
  },
};

// Simulate Google Drive / Cloud interactions
export const db = {
  load: (): AppData => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_DATA;
    } catch (e) {
      console.error("Failed to load data", e);
      return INITIAL_DATA;
    }
  },

  save: (data: AppData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save data", e);
    }
  },

  login: (email: string) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, loggedIn: true, lastLogin: new Date().toISOString() }));
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getUser: () => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Helper to simulate data fetch delay
  sync: async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    });
  }
};