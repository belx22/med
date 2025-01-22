import React, { useState } from 'react';
import { Pencil, Trash2, Download as FileDownload } from 'lucide-react';
import { Disease } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { generatePDF } from '../utils/reportGenerator';

interface DiseaseListProps {
  diseases: Disease[];
  onEdit: (disease: Disease) => void;
  onDelete: (id: string) => void;
}

export function DiseaseList({ diseases, onEdit, onDelete }: DiseaseListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const filteredDiseases = diseases.filter(disease =>
    (disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.region.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedRegion === '' || disease.region === selectedRegion)
  );

  const regions = Array.from(new Set(diseases.map(d => d.region)));

  const handleGenerateReport = (disease: Disease) => {
    generatePDF({
      title: `Rapport: ${disease.name} - ${disease.region}`,
      disease,
      date: format(new Date(), 'MMMM yyyy', { locale: fr })
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Liste des Cas de Maladies</h2>
        <div className="flex space-x-4">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Toutes les régions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Rechercher une maladie..."
            className="px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maladie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Région</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guérisons</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Décès</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDiseases.map((disease) => (
              <tr key={disease.id}>
                <td className="px-6 py-4 whitespace-nowrap">{disease.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{disease.region}</td>
                <td className="px-6 py-4 whitespace-nowrap">{disease.cases}</td>
                <td className="px-6 py-4 whitespace-nowrap">{disease.recoveries}</td>
                <td className="px-6 py-4 whitespace-nowrap">{disease.deaths}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(disease.date), 'MMMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onEdit(disease)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(disease.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleGenerateReport(disease)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FileDownload className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}