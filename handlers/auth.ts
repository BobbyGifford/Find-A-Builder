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
        const { token }: TokenResponse = await login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
}