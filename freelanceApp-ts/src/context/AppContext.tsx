// src/context/AppContext.tsx
import { createContext, useReducer, type ReactNode } from 'react';
import type { AppState, AppAction, Payment } from '../types/index';
import {
  initialClients,
  initialProjects,
  initialPayments,
} from '../data/initialData';

const initialState: AppState = {
  clients: initialClients,
  projects: initialProjects,
  payments: initialPayments,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_PAYMENT':
      return { ...state, payments: [...state.payments, action.payload] };

    /* ------------------- MARK_PROJECT_PAID ------------------- */
    case 'MARK_PROJECT_PAID': {
      const projectId = action.payload.projectId;
      const project = state.projects.find(p => p.id === projectId);

      if (!project || project.paymentStatus === 'paid') return state;

      // prevent duplicate payment
      const alreadyPaid = state.payments.some(p => p.projectId === projectId);
      if (alreadyPaid) return state;

      const newPayment: Payment = {
        projectId: project.id,
        amount: project.budget,
        date: new Date().toISOString(),
      };

      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === projectId ? { ...p, paymentStatus: 'paid' } : p
        ),
        payments: [...state.payments, newPayment],
      };
    }

    /* ------------------- UNDO_MARK_PAID ------------------- */
    case 'UNDO_MARK_PAID': {
      const projectId = action.payload.projectId;
      const paymentIdx = state.payments.findIndex(p => p.projectId === projectId);
      if (paymentIdx === -1) return state;

      const project = state.projects.find(p => p.id === projectId);
      if (!project || project.paymentStatus !== 'paid') return state;

      return {
        ...state,
        payments: state.payments.filter((_, i) => i !== paymentIdx),
        projects: state.projects.map(p =>
          p.id === projectId ? { ...p, paymentStatus: 'unpaid' } : p
        ),
      };
    }

    default:
      return state;
  }
}

/* ------------------- Context & Provider ------------------- */
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}