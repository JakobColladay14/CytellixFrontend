export interface User {
    _id: number;
    name: string;
    email: string;
    salt: string;
    role: string;
    postGroupId: number;
    token: string;
    createdAt: string;
    updatedAt: string;
}