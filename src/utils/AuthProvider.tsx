import {createContext, useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {User} from "@/dto/User.ts";

const AuthContext = createContext<User | null>(null);

const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();


    const loginAction = async (email: string, password: string) => {
        try {
            const response = await axios.post('your-api-endpoint/auth/login', {
                email,
                password
            }, {
                withCredentials: true,
            });
            const res = response.data;
            if (res.data) {
                setUser(res.data.user);
                setToken(res.token);
                localStorage.setItem('token', res.token);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('Unknown error:', error);
            }
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('your-api-endpoint/user-info', {
                withCredentials: true,
            });
            const userData = response.data;
            setUser(userData);
        } catch (error: unknown) {
            if (error instanceof Error && response === 401) {
                logout();
            } else if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('Unknown error:', error);
            }
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{user, loginAction, logout, fetchUserData}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
