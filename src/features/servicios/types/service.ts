export type service = {
    id: number; 
    description: string;
    estimated_time_minutes: number,
    name: string;
    price: number;
    estimated_time_hours?: number;
};

export type newService = {
    description: string,
    estimated_time_hours: number,
    estimated_time_minutes: number,
    name: string,
    price: number,
};    

export type editService = {
    id: number;
    description: string,
    estimated_time_hours: number,
    estimated_time_minutes: number,
    name: string,
    price: number,
};