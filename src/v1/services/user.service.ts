import UserSchema from '../models/user.model';
import { User } from '../models';

export class UserService {

    getAllUser(populate: boolean) {
        const findAllUser = () => UserSchema.find();
        return populate ? findAllUser().populate('orders') : findAllUser();
    }

    getUserById(userId: string, populate: boolean) {
        const findUserById = () => UserSchema.findById(userId);
        return populate ? findUserById().populate('orders') : findUserById();
    }

    createUser(user: User) {
        const userSchema = new UserSchema(user);
        return userSchema.save();
    }

    async updateUserById(userId: string, newUser: User, replace: boolean) {
        if (replace) {
            await UserSchema.findByIdAndUpdate(userId, newUser);
        } else {
            const orders = newUser.orders;
            delete newUser.orders;
            await UserSchema.updateOne({ _id: userId },
                { ...newUser, $addToSet: { orders: { $each: orders || [] } } });
        }
    }

    deleteUserById(userId: string) {
        return UserSchema.findByIdAndDelete(userId);
    }

}

export let userService = new UserService();