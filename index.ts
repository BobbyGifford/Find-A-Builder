import express, { type Request, type Response, type NextFunction } from 'express';
import { registerValidation } from './dto/dto';
import { loginHandler, registerHandler } from "./handlers/auth.ts";

const app = express();
app.use(express.json());

// @ts-ignore
app.post('/register',
    registerValidation,
    registerHandler
);

app.post('/login',
    loginHandler
);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

