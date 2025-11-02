export interface Client {
    id:string;
    name:string;
    country:string;
    email?:string;
}
export interface Project {
    id:string;
    clientId:string;
    title:string;
    budget:number;
    status:'pending'|'in-progress'|'completed';
    paymentStatus:'paid'|'unpaid';
}
export interface Payment {
    projectId:string;
    amount:number;
    date:string;
}
export type AppState = {
    clients:Client[];
    projects:Project[];
    payments:Payment[];
}
// Discriminated Union for Actions
export type AppAction =
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'MARK_PROJECT_PAID'; payload: { projectId: string } };