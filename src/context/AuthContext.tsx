import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
    children?: ReactNode;
}

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({children} : Props) => {
    const [authenticated, setAuthenticated] = useState(initialValue.authenticated);
    const navigate = useNavigate();

    useEffect(() => {
      const isLoggedIn = Boolean(localStorage.getItem("access_token"));
      if (isLoggedIn) {
        setAuthenticated(true);
        navigate("/home");
      }

      return () => {
        navigate("/auth/login");
      };
    }, [navigate]);
    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }