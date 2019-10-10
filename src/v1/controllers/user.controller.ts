import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import UserSchema from '../models/user.model';
import { User } from '../models/user.model';

export class UserController {

    getAllUser(req: Request, res: Response) {
        UserSchema.find((err: any, users: User[]) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(users);
            }
        });
    }

    getUserById(req: Request, res: Response) {
        const userId: string = matchedData(req).id;
        UserSchema.findById(userId, (err: any, user: User) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(user);
            }
        });
    }

    createUser(req: Request, res: Response) {
        try {
            const user: User = new UserSchema({ ...matchedData(req)[''], ...{ points: 0 } });
            user.save()
                .then((createdUser) => res.json(createdUser))
                .catch((err: any) => res.status(500).json(err));
        } catch (err) {
            res.status(500).json(err);
        }
    }

    updateUserById(req: Request, res: Response) {
        const userId: string = matchedData(req).id;
        const newUser: User = matchedData(req)[''];
        UserSchema.findByIdAndUpdate(userId, newUser)
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