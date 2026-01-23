export interface SignupFormData {
    name?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    department: string;
    academicYear: number;
    universityId: number;
}
export interface LoginFormData {
    email: string;
    password: string;
}
