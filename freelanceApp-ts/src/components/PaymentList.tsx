// src/components/PaymentList.tsx
import type { Payment, Project, AppState } from '../types';
import { findClientById } from '../utils/helpers';

interface PaymentListProps {
  payments: Payment[];
  projects: Project[];
  clients: AppState['clients'];
}

export default function PaymentList({ payments, projects, clients }: PaymentListProps) {
  const getProjectTitle = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.title || 'Unknown Project';
  };

  const getClientName = (projectId: string) => {
  const project = projects.find((p) => p.id === projectId);
    if (!project) return 'Unknown Client';
    const client = findClientById(clients, project.clientId);
    return client?.name || 'Client not found';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No payments recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => {
        const projectTitle = getProjectTitle(payment.projectId);
        const clientName = getClientName(payment.projectId);

        return (
          <div
            key={payment.projectId + payment.date}
            className="border rounded-lg p-4 flex justify-between items-start bg-green-50"
          >
            <div>
              <p className="font-semibold text-green-800">
                ${payment.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                {formatDate(payment.date)} • {projectTitle}
              </p>
              <p className="text-xs text-gray-500">{clientName}</p>
            </div>
            <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
              Paid
            </span>
          </div>
        );
      })}
    </div>
  );
}