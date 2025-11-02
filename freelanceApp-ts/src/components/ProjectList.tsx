// src/components/ProjectList.tsx
import type { Project, AppState } from '../types/index';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext'; // ← Already imported
import { findClientById } from '../utils/helpers';

interface ProjectListProps {
  projects: Project[];
  clients: AppState['clients'];
}

export default function ProjectList({ projects, clients }: ProjectListProps) {
  // ← FIXED: Pass AppContext
  const { dispatch } = useContext(AppContext);

  const handleMarkPaid = (projectId: string) => {
    dispatch({ type: 'MARK_PROJECT_PAID', payload: { projectId } });
  };

  const handleUndo = (projectId: string) => {
    dispatch({ type: 'UNDO_MARK_PAID', payload: { projectId } });
  };

  return (
    <div className="space-y-3">
      {projects.map(project => {
        const client = findClientById(clients, project.clientId);
        return (
          <div
            key={project.id}
            className="bg-amber-100 border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium">{project.title}</h4>
              <p className="text-sm text-gray-600">
                Client: <strong>{client?.name || 'Client not found'}</strong>
              </p>
              <div className="flex gap-2 mt-1 text-xs">
                <span
                  className={`px-2 py-1 rounded-full ${
                    project.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {project.status}
                </span>
                <span
                  className={`px-2 py-1 rounded-full ${
                    project.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {project.paymentStatus}
                </span>
              </div>
            </div>

            {project.paymentStatus === 'unpaid' ? (
              <button
                onClick={() => handleMarkPaid(project.id)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Mark as Paid
              </button>
            ) : (
              <button
                onClick={() => handleUndo(project.id)}
                className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700"
              >
                Undo
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}