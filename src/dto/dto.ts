import { body } from 'express-validator';

// Define interfaces for request bodies
export interface LoginRequest {
    body: {
        email: string,
        password: string,
    }
}

// Define interface for JWT token response
export interface TokenResponse {
    token: string;
}

// Validation middleware for register endpoint
export const registerValidation = [
    body('email').isEmail().notEmpty(),
    body('password').notEmpty()
];
