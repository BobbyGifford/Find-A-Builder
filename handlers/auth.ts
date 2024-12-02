import { validationResult } from "express-validator";
import { Model } from "sequelize";
import type { UserModel } from "../models/User.ts";
import { login, register } from "../auth.ts";
import type { Request, Response } from "express";
import type { LoginRequest, TokenResponse } from "../dto/dto.ts";

export const registerHandler =
    // @ts-ignore
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const user: Model<UserModel> = await register(email, password);
            res.json({ user });
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
        }
    }

export const loginHandler = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token } = await login(email, password);

        // Set HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict', // Protects against CSRF
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

// Example protected route handler
export const protectedRouteHandler = async (req: Request, res: Response) => {
    // req.user is set by authMiddleware
    res.json({
        message: 'This is a protected route',
        // @ts-ignore
        user: req.user
    });
};