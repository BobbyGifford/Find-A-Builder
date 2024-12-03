import express, { type Request, type Response } from 'express';
import { registerValidation } from './dto/dto.ts';
import { loginHandler, protectedRouteHandler, registerHandler } from "./handlers/auth.ts";
import { authMiddleware } from "./middleware/auth.ts";
import cookieParser from 'cookie-parser';
import { createBuilderPost } from "./handlers/builderPosts.ts";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.post('/register',
    registerValidation,
    // @ts-ignore
    registerHandler
);

app.post('/builder_posts',
    // @ts-ignore
    authMiddleware,
    createBuilderPost)

app.post('/login',
    loginHandler
);

// Protected route example
// @ts-ignore
app.get('/protected', authMiddleware, protectedRouteHandler);
// Logout route
app.post('/logout', (_req: Request, res: Response) => {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
});

// Error handling middleware
// @ts-ignore
app.use((err: Error, _req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

