import {User} from "@/dto/user/User.ts";
import CustomError from "@/utils/CustomError.ts";

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<CustomError | null>;
    logout: () => void;
}
