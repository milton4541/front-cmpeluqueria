export type userT = {
    id: number;
    role_name: string;
    username: string;
};

export type newUser = {
    password: string;
    username: string;
    role_id: number;
};

export type editUser = {
    id: number;
    password: string;
    username: string;
    role_id: number;
    role_name: string;
}

