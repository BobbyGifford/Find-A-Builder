import express, {type Request, type Response, type NextFunction} from 'express';
import {body, validationResult} from 'express-validator';
import {register, login} from './auth';
import type {UserModel} from './models/User';
import {Model} from 'sequelize';

// Define interfaces for request bodies
interface RegisterRequest {
    email: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

// Define interface for JWT token response
interface TokenResponse {
    token: string;
}

const app = express();
app.use(express.json());

// Validation middleware for register endpoint
const registerValidation = [
    body('email').isEmail(),
    body('password').notEmpty()
];

// @ts-ignore
app.post('/register',
    registerValidation,
    // @ts-ignore
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {email, password} = req.body;
            const user: Model<UserModel> = await register(email, password);
            res.json({user});
        } catch (error) {
            res.status(400).json({error: error instanceof Error ? error.message : 'Unknown error occurred'});
        }
    }
);

app.post('/login',
    async (req: Request<{}, {}, LoginRequest>, res: Response) => {
        try {
            const {email, password} = req.body;
            const {token}: TokenResponse = await login(email, password);
            res.json({token});
        } catch (error) {
            res.status(400).json({error: error instanceof Error ? error.message : 'Unknown error occurred'});
        }
    }
);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something broke!'});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

