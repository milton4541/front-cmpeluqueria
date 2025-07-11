export type turno = {
    id: number;
    appointment_date: string;
    client_id: number;
    client_name: string;
    estimated_time_minutes: number;
    status: string;
};

export type newTurno = {
    appointment_date: string;
    client_id: number;
    service_id: number[];
};