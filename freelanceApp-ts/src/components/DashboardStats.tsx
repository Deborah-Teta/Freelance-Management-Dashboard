// src/components/DashboardStats.tsx
import { getDashboardStats } from '../utils/helpers';
import type { AppState } from '../types';

interface DashboardStatsProps {
  state: AppState;
}

export default function DashboardStats({ state }: DashboardStatsProps) {
  const stats = getDashboardStats(state);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold text-blue-700">{stats.totalClients}</p>
        <p className="text-sm text-gray-600">Clients</p>
      </div>
      <div className="bg-purple-200 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold text-purple-700">{stats.totalProjects}</p>
        <p className="text-sm text-gray-600">Projects</p>
      </div>
      <div className="bg-green-200 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold text-green-700">{stats.PaidProjects}</p>
        <p className="text-sm text-gray-600">Paid</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold text-red-700">{stats.unpaidProjects}</p>
        <p className="text-sm text-gray-600">Unpaid</p>
      </div>
    </div>
  );
}