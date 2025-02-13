export type Client = {
    name: string;
    last_name: string;
    phone: string;
    email: string;
    };

export type ClientWithId = Client & { id: number };
