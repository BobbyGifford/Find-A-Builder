import type { Request, Response } from "express";
import { createPost } from "../services/builderPost.ts";

interface CreateBuilderPostRequest extends Request {
    user: {
        id: number,
    }
    body: {
        email: string,
        name: string,
        website: string,
        phone?: string,
        description: string,
        profession: string,
    }
}

export const createBuilderPost =
    async (req: CreateBuilderPostRequest, res: Response) => {
        // Check for validation errors
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const user_id: number = req.user.id;
        try {
            const user: { id: number }[] = await createPost({ user_id, ...req.body });
            res.json({ user });
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
        }
    }
