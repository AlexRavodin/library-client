import axios from "axios";

export const API_BASE_URL = 'http://localhost:4000';

export const UserRole = 'STANDARD';
export const AdminRole = 'ADMINISTRATOR';

export const PageSize = 10;

export const baseAxios = axios.create({
    baseURL: `/api/v1`,
    withCredentials: true,
});
