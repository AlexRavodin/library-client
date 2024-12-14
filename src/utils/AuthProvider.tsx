import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {User} from "@/dto/user/User.ts";
import {API_BASE_URL} from "@/utils/constants.ts";
import {AuthContextType} from "@/context/AuthContext.ts";

const Axios = axios.create({
    baseURL: `${API_BASE_URL}/auth`
});

export interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const response = await Axios.post('/login', {
                email,
                password
            }, {
                withCredentials: true,
            });
            const res: User = response.data;
            if (res) {
                setUser(res);
            }
        } catch (error: unknown) {
            console.error('Unknown error while login: ', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');

        console.log("User logged out.");
        navigate('/login');
    };

    const fetchUserData = async () => {
        try {
            const response = await Axios.get('/user-info', {
                withCredentials: true,
            });

            setUser(response.data);

            if (response.status == 401) {
                console.error('Not authorized: ', response.data);
                navigate('/login');
            }

            const userData = response.data;
            setUser(userData);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData, user]);



    return (
        <AuthContext.Provider value={{user, login: login, logout, fetchUserData}}>
            {children}
        </AuthContext.Provider>
    );

}

const InitialState: AuthContextType = {
    user: null,
    login: async () => Promise.resolve(),
    logout: () => {},
    fetchUserData: async () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextType>(InitialState);

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
