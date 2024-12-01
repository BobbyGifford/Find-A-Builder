import { body } from 'express-validator';

// Define interfaces for request bodies
export interface RegisterRequest {
    body: {
        email: string,
        password: string,
    }
}

export interface LoginRequest {
    email: string;
    password: string;
}

// Define interface for JWT token response
export interface TokenResponse {
    token: string;
}

// Validation middleware for register endpoint
export const registerValidation = [
    body('email').isEmail(),
    body('password').notEmpty()
];
