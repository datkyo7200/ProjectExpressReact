import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(LOCAL_STORAGE_TOKEN_NAME);
    }
    try {
      const res = await axios.get(`${apiUrl}/auth`);
      if (res.data.success)
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: res.data.user },
        });
    } catch (err) {
      console.error(err);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  useEffect(() => loadUser(), []);
  //Login
  const loginUser = async (userForm) => {
    try {
      console.log("userForm", userForm);
      const res = await axios.post(`${apiUrl}/auth/login`, userForm);
      console.log(res);
      if (res.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
      return res.data;
    } catch (error) {
      if (error.res.data) return error.res.data;
      else return { success: false, message: error.message };
    }
  };
  //Context data
  const authContextData = { loginUser, authState };

  //Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
