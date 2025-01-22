import React from 'react';
import { RegionData } from '../types';

interface RegionMapProps {
  data: RegionData[];
}

export function RegionMap({ data }: RegionMapProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Distribution Régionale</h2>
      <div className="space-y-4">
        {data.map((region) => (
          <div key={region.region} className="flex items-center justify-between">
            <span className="font-medium">{region.region}</span>
            <div className="flex items-center">
              <div className="w-48 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(region.cases / Math.max(...data.map(r => r.cases))) * 100}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm text-gray-600">{region.cases.toLocaleString()} cas</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}