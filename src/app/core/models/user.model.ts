export interface User {
    id: number;
    email: string;
    fullName: string;
    role: UserRole;
}

export enum UserRole {
    Admin = 1,
    User = 2
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    userId: number;
    email: string;
    fullName: string;
    role: UserRole;
    token: string;
    expiresAt: string;
}