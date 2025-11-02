// src/App.tsx
import { useContext, useState } from 'react';
import { AppContext } from './context/AppContext';
import ClientCard from './components/ClientCard';
import ProjectList from './components/ProjectList';
import DashboardStats from './components/DashboardStats';
import { filterProjects, searchClients, searchProjects } from './utils/helpers';
import type { Project } from './types';
import PaymentList from './components/PaymentList';

export default function App() {
  const { state } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<Project['status'] | 'all'>('all');

  const filteredClients = searchClients(state.clients, searchQuery);
  const filteredProjects = searchProjects(state.projects, searchQuery);
  const statusFilteredProjects = filterStatus === 'all'
    ? filteredProjects
    : filterProjects(filteredProjects, { status: filterStatus });
   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'all') {
      setFilterStatus('all');
    } else {
      setFilterStatus(value as Project['status']);
    }
  };
  return (
    <div className="min-h-screen bg-orange-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Freelance Dashboard</h1>

        {/* Search & Filter */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search clients or projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg"
          />
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Stats */}
        <DashboardStats state={state} />

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Clients */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Clients</h2>
            <div className="space-y-3">
              {filteredClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <ProjectList projects={statusFilteredProjects} clients={state.clients} />
          </div>
        </div>
          {/*Payment Record */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Records</h2>
          <PaymentList
            payments={state.payments}
            projects={state.projects}
            clients={state.clients}
          />
        </div>
      </div>
    </div>
  );
}