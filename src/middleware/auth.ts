import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        // stores user id as user on the request
        // @ts-ignore
        req.user = jwt.verify(token, process.env.JWT_SECRET!);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};
