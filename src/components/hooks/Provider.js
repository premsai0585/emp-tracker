import { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
    const [authorized, setAuthorized] = useState(false);
    const [redirected, setRedirected] = useState('');

    return (
        <Context.Provider value={{ authorized, setAuthorized, redirected, setRedirected}}>
            {children}
        </Context.Provider>
    )
}

