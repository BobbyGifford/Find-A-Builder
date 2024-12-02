import express, { type Request, type Response, type NextFunction } from 'express';
import { registerValidation } from './dto/dto';
import { loginHandler, protectedRouteHandler, registerHandler } from "./handlers/auth.ts";
import { authMiddleware } from "./middleware/auth.ts";
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// @ts-ignore
app.post('/register',
    registerValidation,
    registerHandler
);

app.post('/login',
    loginHandler
);

// Protected route example
// @ts-ignore
app.get('/protected', authMiddleware, protectedRouteHandler);

// Logout route
app.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

