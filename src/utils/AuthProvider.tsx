import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from "@/dto/user/User.ts";
import {AuthContextType} from "@/context/AuthContext.ts";
import {baseAxios} from "@/utils/constants.ts";
import CustomError from "@/utils/CustomError.ts";


export interface AuthProviderProps {
    children: React.ReactNode;
}

const fetchUser = async (): Promise<User | null> => {
    try {
        const response = await baseAxios.get('users/info');

        if (response.status === 200) {
            console.log("User fetched: " + JSON.stringify(response.data.data as User));
            return response.data.data as User;
        }

        const error = response.data as CustomError;
        if (response.status == 401) {
            console.error('Not authorized: ', error.errorMessage);
        } else {
            console.error('Other error: ', error.errorMessage);
        }

    } catch (error) {
        console.error('Unknown error: ', error);
    }

    return null;
};

const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string): Promise<CustomError | null> => {
        try {
            //setLoading(true);
            const response = await baseAxios.post("auth/login", {
                email,
                password
            });

            if (response.status == 200) {
                const user = await fetchUser();
                setUser(user);
                console.log("User logged in.");
                navigate("/");
                return null;
            } else {
                const error = response.data as CustomError;
                //setError(error)
                return error;
            }
        } catch (err) {
            const error = {statusCode: 404, errorMessage: "Unknown error: " + err, errors: null};

            //setError(error);
            return error;
        } finally {
            //setLoading(false);
        }
    };

    const logout = async () => {
        setUser(null);
        try {
            //setLoading(true);
            const response = await baseAxios.post("auth/logout");

            if (response.status == 200) {
                console.log("User logged out.");
            } else {
                //setError(response.data as CustomError)
            }
        } catch (error) {
            console.log('Unknown error: ', error);
            //setError({ statusCode: 404, errorMessage: "Unknown error: " + error, errors: null});
        } finally {
            //setLoading(false);
        }

        console.log("User logged out.");
        navigate('/');
    };

    useEffect(() => {
        (async () => {
            const user = await fetchUser();
            setUser(user);
        })();
    }, []);


    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;

const InitialState: AuthContextType = {
    user: null,
    login: async (): Promise<CustomError | null> => Promise.resolve(null),
    logout: async () => Promise.resolve(),
};

export const AuthContext = createContext<AuthContextType>(InitialState);

export const useAuth = () => {
    return useContext(AuthContext)
}

