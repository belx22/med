import React, { useState } from 'react';
import { Activity, Users, UserCheck, AlertTriangle, LogOut, UserPlus } from 'lucide-react';
import { DashboardCard } from './components/DashboardCard';
import { DiseaseChart } from './components/DiseaseChart';
import { RegionMap } from './components/RegionMap';
import { AuthForms } from './components/AuthForms';
import { DiseaseForm } from './components/DiseaseForm';
import { PatientForm } from './components/PatientForm';
import { Disease, RegionData, User, Patient } from './types';

// Mock data
const mockDiseases: Disease[] = [
  { id: '1', name: 'COVID-19', cases: 1200, deaths: 45, recoveries: 980, region: 'Centre', date: '2024-01', symptoms: 'Fièvre, toux', notes: 'Cas modéré' },
  { id: '2', name: 'COVID-19', cases: 1500, deaths: 52, recoveries: 1200, region: 'Littoral', date: '2024-02', symptoms: 'Fièvre, fatigue', notes: 'Cas sévère' },
  { id: '3', name: 'COVID-19', cases: 1100, deaths: 38, recoveries: 1400, region: 'Ouest', date: '2024-03', symptoms: 'Toux sèche', notes: 'Cas léger' },
];

const mockPatients: Patient[] = [
  { id: '1', name: 'Jean Dupont', age: 45, gender: 'male', region: 'Centre', address: 'Yaoundé', phone: '+237612345678', diseases: [] },
  { id: '2', name: 'Marie Claire', age: 32, gender: 'female', region: 'Littoral', address: 'Douala', phone: '+237623456789', diseases: [] },
];

const mockRegionData: RegionData[] = [
  { region: 'Centre', cases: 1200 },
  { region: 'Littoral', cases: 980 },
  { region: 'Ouest', cases: 750 },
  { region: 'Sud', cases: 420 },
  { region: 'Est', cases: 380 },
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showDiseaseForm, setShowDiseaseForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [diseases, setDiseases] = useState<Disease[]>(mockDiseases);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [regionData] = useState<RegionData[]>(mockRegionData);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({
      id: '1',
      email,
      name: 'Agent de Santé',
      role: 'health_worker',
      hospital: 'Hôpital Central de Yaoundé'
    });
  };

  const handleRegister = (email: string, password: string, name: string, hospital: string) => {
    // Mock registration
    setUser({
      id: '1',
      email,
      name,
      role: 'health_worker',
      hospital
    });
  };

  const handleLogout = () => {
    setUser(null);
    setShowDiseaseForm(false);
    setShowPatientForm(false);
  };

  const handleDiseaseSubmit = (data: any) => {
    const newDisease: Disease = {
      id: String(diseases.length + 1),
      ...data,
      date: new Date().toISOString().slice(0, 7)
    };
    setDiseases([newDisease, ...diseases]);
    setShowDiseaseForm(false);
  };

  const handlePatientSubmit = (data: any) => {
    const newPatient: Patient = {
      id: String(patients.length + 1),
      ...data,
      diseases: []
    };
    setPatients([newPatient, ...patients]);
    setShowPatientForm(false);
  };

  if (!user) {
    return <AuthForms onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Plateforme de Surveillance des Maladies</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bienvenue, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showDiseaseForm ? (
          <>
            <button
              onClick={() => setShowDiseaseForm(false)}
              className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Retour au tableau de bord
            </button>
            <DiseaseForm onSubmit={handleDiseaseSubmit} />
          </>
        ) : showPatientForm ? (
          <>
            <button
              onClick={() => setShowPatientForm(false)}
              className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Retour au tableau de bord
            </button>
            <PatientForm onSubmit={handlePatientSubmit} />
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
              <div className="space-x-4">
                <button
                  onClick={() => setShowPatientForm(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  <UserPlus className="h-5 w-5 inline-block mr-2" />
                  Nouveau Patient
                </button>
                <button
                  onClick={() => setShowDiseaseForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  <AlertTriangle className="h-5 w-5 inline-block mr-2" />
                  Déclarer un cas
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard
                title="Patients Total"
                value={patients.length}
                trend={12}
                icon={<Users className="h-6 w-6 text-blue-600" />}
              />
              <DashboardCard
                title="Cas Actifs"
                value={diseases.reduce((acc, curr) => acc + curr.cases, 0)}
                trend={-8}
                icon={<AlertTriangle className="h-6 w-6 text-yellow-600" />}
              />
              <DashboardCard
                title="Guérisons"
                value={diseases.reduce((acc, curr) => acc + curr.recoveries, 0)}
                trend={15}
                icon={<UserCheck className="h-6 w-6 text-green-600" />}
              />
              <DashboardCard
                title="Décès"
                value={diseases.reduce((acc, curr) => acc + curr.deaths, 0)}
                trend={-5}
                icon={<Activity className="h-6 w-6 text-red-600" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DiseaseChart data={diseases} />
              <RegionMap data={regionData} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;