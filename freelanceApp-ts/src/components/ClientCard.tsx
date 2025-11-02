import type { Client } from "../types";

interface ClientCardProps {
    client:Client;
}
export default function ClientCard ({client}:ClientCardProps) {
    return (
        <div className="bg-amber-100 border rounded-lg p-4 hover: shadow-md transition">
            <h3 className="font-semibold text-lg">{client.name}</h3>
            <p className="text-sm text-gray-600">{client.country}</p>
            {client.email ? (
                <p className="text-xs text-blue-600 mt-1">{client.email}</p>
            ) : (
                <p className="text-xs text-gray-400 italic">No email</p>
            )}
        </div>
    );
}