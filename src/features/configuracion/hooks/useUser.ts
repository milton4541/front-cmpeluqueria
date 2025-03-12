import { getUsers } from "../api/getUsers";
import { userT } from "../types/user";
import { useState, useEffect } from "react";

export type UserSliceType = {
    users: userT[];
    fetchUser: () => void;
    //addUser: (newUser: newUser) => void;
};

export default function useUser() {
    const [users, setUsers] = useState<userT[]>([]);

    const fetchUser = async () => {
        const users = await getUsers();
        setUsers(users);
    };

    useEffect(() => {
        fetchUser();
        console.log(users)
    }, []);

    // const addUser = async (newUser: newUser) => {
    //     console.log(newUser);
    //     try {
    //         //await addServiceAPI(newService);
    //         fetchUser();
    //         showNotification("success", "Servicio agregado exitosamente");
    //     } catch (error) {
    //         showNotification("error", "Error al agregar el servicio");
    //         console.error("Error adding service:", error);
    //     }
    // }
    return {
        users,
        fetchUser,
        //addUser,
    };
}