export interface Disease {
  id: string;
  name: string;
  cases: number;
  deaths: number;
  recoveries: number;
  region: string;
  date: string;
  symptoms: string;
  notes: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  region: string;
  address: string;
  phone: string;
  diseases: Disease[];
}

export interface DiseaseStats {
  totalCases: number;
  totalDeaths: number;
  totalRecoveries: number;
  activeCases: number;
}

export interface RegionData {
  region: string;
  cases: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'health_worker';
  hospital?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}