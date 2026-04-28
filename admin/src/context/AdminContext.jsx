import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    // keep token from localStorage (persistent login)
    const [aToken, setAToken] = useState(
        localStorage.getItem('aToken') || ""
    );

    // backend URL from env
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {
        aToken,
        setAToken,
        backendUrl,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;