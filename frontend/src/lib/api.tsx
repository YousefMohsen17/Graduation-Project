import type { LoginFormData, SignupFormData } from "../types/types";
import axiosInstance from "./axios.tsx";
export async function createAccount(data: SignupFormData) {
    try {

        const response = await axiosInstance.post("/auth/register", data)
        return response.data

    } catch (error) {
        throw error
    }
}
export async function login(data: LoginFormData) {
    try {

        const response = await axiosInstance.post("/auth/login", data)
        return response.data

    } catch (error) {
        throw error
    }
}
export async function getSubjects() {
    try {
        const response = await axiosInstance.get("/subjects");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getSubject(id: string) {
    try {
        const response = await axiosInstance.get(`/subjects/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function checkAuth() {
    try {
        const response = await axiosInstance.get("/auth/me");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        await axiosInstance.post("/auth/logout");
    } catch (error) {
        throw error;
    }
}