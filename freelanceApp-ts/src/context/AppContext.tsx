import { createContext, useReducer, type  ReactNode } from 'react';
import type {AppState, AppAction} from '../types/index'
import { initialClients, initialProjects, initialPayments } from '../data/initialData';

const initialState: AppState = {
    clients: initialClients,
    projects:initialProjects,
    payments:initialPayments
};
function appReducer(state:AppState, action:AppAction): AppState {

    switch(action.type) {
        case 'ADD_PAYMENT':
            return {...state, payments:[...state.payments, action.payload]};
        case 'MARK_PROJECT_PAID':
            return {...state, projects: state.projects.map((p)=>p.id === action.payload.projectId ? {...p, paymentStatus:'paid'} : p),};
        default:
            return state;    
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<{
    state:AppState;
    dispatch: React.Dispatch<AppAction>;}>({
        state:initialState,
        dispatch:()=>undefined
    });
export function AppProvider({children}: {children:ReactNode}) {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return <AppContext.Provider value = {{state, dispatch}}>{children}</AppContext.Provider>;
}