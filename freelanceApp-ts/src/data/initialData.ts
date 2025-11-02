import type {Client, Project, Payment} from '../types/index';

export const initialClients: Client[]=[
    {id:'c1', name:'New Species', country:'Rwanda', email:'newspecies@yahoo.com'},
    {id:'c2', name:'M-plaza', country:'Rwanda', email:'mplaza@yahoo.com'},
    {id:'c3', name:'Sanlam', country:'Uganda', email:'betastudio@gmail.com'},
    {id:'c4', name:'Marriot', country:'Dubai', email:'marriot@yahoo.com'}
]
export const initialProjects: Project[]= [
    {id:'p1', clientId:'c1', title:'Website Redesign', budget:5000, status:'in-progress', paymentStatus:'unpaid'},
    {id:'p2', clientId:'c2', title:'Mobile App', budget:8000, status:'completed', paymentStatus:'paid'},
    {id:'p3', clientId:'c3', title:'Database Redesign', budget:9000, status:'pending', paymentStatus:'unpaid'},
    {id:'p4', clientId:'c4', title:'Mobile Booking App', budget:10000, status:'completed', paymentStatus:'paid'}
]
export const initialPayments: Payment[]= [
    {projectId:'p2', amount:8000, date:'2025-10-15'}
];