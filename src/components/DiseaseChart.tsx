import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Disease } from '../types';

interface DiseaseChartProps {
  data: Disease[];
}

export function DiseaseChart({ data }: DiseaseChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tendances des Maladies</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#8884d8" name="Cas" />
            <Line type="monotone" dataKey="deaths" stroke="#ff0000" name="Décès" />
            <Line type="monotone" dataKey="recoveries" stroke="#82ca9d" name="Guérisons" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}