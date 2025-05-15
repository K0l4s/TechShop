export interface User {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    gender: boolean;
    role: Role;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Role = 'ROLE_CUSTOMER' | 'ROLE_ADMIN' | 'ROLE_STAFF';
