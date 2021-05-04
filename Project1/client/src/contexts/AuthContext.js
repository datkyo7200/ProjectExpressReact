import { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });
    //Login
    const loginUser = async (userForm) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`);
            console.log(res);
            if (res.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    res.data.accessToken
                );
            return res.data;
        } catch (error) {
            if (error.res.data) return error.res.data;
            else return { success: false, message: error.message };
        }
    };
    //Context data
    const authContextData = { loginUser };

    //Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContextProvider;
