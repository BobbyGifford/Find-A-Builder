import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import {sequelize} from '../db';

// Interface for User model
export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id?: number;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;