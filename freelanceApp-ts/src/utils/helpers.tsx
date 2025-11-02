import type {Client, Project, Payment, AppState} from '../types/index';

export const countPaymentStatus = (projects:Project[])=>{
    return{
        paid: projects.filter((p)=>p.paymentStatus === 'paid').length,
        unpaid: projects.filter((p)=>p.paymentStatus === 'unpaid').length
    };
}
export const findClientById = (clients:Client[], id: string): Client | undefined => {
    return clients.find((c) => c.id === id);
}
export const recordPayment = (
    project: Project,
    amount: number,
    date: string
): Payment | null => {
    if (project.paymentStatus === 'paid') return null;
    if (amount <= 0) return null;
    return {projectId: project.id, amount, date};
}
export const filterProjects = (
    projects: Project[],
    filter: {status?: Project['status']; paymentStatus?: Project['paymentStatus']}
) => {
    return projects.filter((p)=>{
        const statusMatch = filter.status ? p.status === filter.status: true;
        const paymentMatch = filter.paymentStatus ? p.paymentStatus === filter.paymentStatus : true;
        return statusMatch && paymentMatch
    });
}
export const searchClients = (clients: Client[], query: string) => 
    clients.filter((c)=>c.name.toLowerCase().includes(query.toLowerCase()));
export const searchProjects = (projects: Project[], query: string) =>
    projects.filter((p)=>p.title.toLowerCase().includes(query.toLowerCase()));
export const getDashboardStats = (state: AppState) => {
    const {paid, unpaid} = countPaymentStatus(state.projects);
    const totalRevenue = state.payments.reduce((sum, p) => sum + p.amount, 0);
    return {
        totalClients: state.clients.length,
        totalProjects: state.projects.length,
        PaidProjects: paid,
        unpaidProjects: unpaid,
        totalRevenue,
    };
}


