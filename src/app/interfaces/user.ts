export interface User {
    _id: number;
    name: string;
    email: string;
    salt: string;
    admin: boolean;
    postGroupId: number;
    token: string;
    createdAt: string;
    updatedAt: string;
}