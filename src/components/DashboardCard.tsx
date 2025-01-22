import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: number;
  trend: number;
  icon: React.ReactNode;
}

export function DashboardCard({ title, value, trend, icon }: DashboardCardProps) {
  const isPositive = trend > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-600">{title}</div>
        <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      </div>
      <div className="text-3xl font-bold mb-2">{value.toLocaleString()}</div>
      <div className={`flex items-center ${isPositive ? 'text-red-500' : 'text-green-500'}`}>
        {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        <span className="ml-1">{Math.abs(trend)}% depuis la semaine dernière</span>
      </div>
    </div>
  );
}