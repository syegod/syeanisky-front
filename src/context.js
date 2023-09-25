import { createContext } from "react";

export const AuthContext = createContext({
    isAuth: false,
    userData: null,
    token: null,
    state: 'loading'
});