import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, {type UserModel} from './models/User.ts';

export const register = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({email, password: hashedPassword})
};

export const login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } }) as UserModel | null;

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {});
        return { token };
    }
    throw new Error("Invalid credentials");
};