import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "./db";
import { usersTable } from "./db/schema/users.ts";
import { eq } from "drizzle-orm";

export const register = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await db.insert(usersTable).values({
        email,
        password: hashedPassword
    }).returning({ id: usersTable.email });
};

export const login = async (email: string, password: string) => {
    const results = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (results && await bcrypt.compare(password, results[0].password)) {
        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET!, {});
        return { token };
    }
    throw new Error("Invalid credentials");
};