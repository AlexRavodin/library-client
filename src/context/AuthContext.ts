import {User} from "@/dto/User.ts";

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchUserData: () => Promise<void>;
}
