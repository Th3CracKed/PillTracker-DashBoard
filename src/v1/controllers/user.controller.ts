import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import UserSchema from '../models/user.model';
import { User } from '../models/user.model';
import { isTrueBool } from '../../utils';

export class UserController {

    getAllUser(req: Request, res: Response) {
        const populate: string = matchedData(req).populate;
        const findAllUser = () => UserSchema.find((err: any, users: User[]) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(users);
            }
        });
        isTrueBool(populate) ? findAllUser().populate('orders') : findAllUser();
    }

    getUserById(req: Request, res: Response) {
        const userId: string = matchedData(req).id;
        const populate: string = matchedData(req).populate;
        const findUserById = () => UserSchema.findById(userId, (err: any, user: User) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(user);
            }
        });
        isTrueBool(populate) ? findUserById().populate('orders') : findUserById();
    }

    createUser(req: Request, res: Response) {
        const user: User = matchedData(req)[''];
        const userSchema = new UserSchema(user);
        userSchema.save()
            .then((createdUser) => res.json(createdUser))
            .catch((err: any) => res.status(500).json(err));
    }

    updateUserById(req: Request, res: Response) {
        const userId: string = matchedData(req).id;
        const newUser: User = matchedData(req)[''];
        const replace: boolean = (<any>req).replace;
        let updateUser: any;
        if (replace) {
            updateUser = () => UserSchema.findByIdAndUpdate(userId, newUser);
        } else {
            const orders = newUser.orders;
            delete newUser.orders;
            updateUser = () => UserSchema.updateOne({ _id: userId }, { ...newUser, $addToSet: { orders: { $each: orders || [] } } });
        }
        updateUser()
            .then(() => res.json('Update Successfully'))
            .catch((err: any) => res.status(500).json(err));
    }

    deleteUserById(req: Request, res: Response) {
        const userId: string = matchedData(req).id;
        UserSchema.findByIdAndDelete(userId)
            .then((updatedUser) => res.json(updatedUser))
            .catch((err: any) => res.status(500).json(err));
    }

}
export let userController = new UserController();