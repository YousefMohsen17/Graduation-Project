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
export interface PostData {
    content: string;
    user: string;
    image?: File | null;
}
export interface Post {
    _id: string
    user: {
        name: string;
        _id: string;
    }
    content: string
    image?: string
    likes: Array<{
        user: string
        _id: string
    }>
    comments: Array<{
        user: string
        _id: string
        text: string
        content: string
        name?: string
        avatar?: string
    }>
    createdAt: string
    __v: number
}

export type PostResponse = {
    success: boolean
    count: number
    data: Array<Post>
}
