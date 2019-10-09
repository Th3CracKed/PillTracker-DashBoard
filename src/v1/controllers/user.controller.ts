import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import UserSchema from '../models/user.model';
import { User } from '../models/user.model';


export class UserController {
    // Todo factorize to support all types
    // example : mongoService.save(req, typeToSerial),  save extract data from req based on type

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
        const userId = matchedData(req).id;
        UserSchema.findById(userId, (err: any, user: User) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(user);
            }
        });
    }

    createUser(req: Request, res: Response) {
        const user: User = matchedData(req)[''];
        const userModel = new UserSchema({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });

        userModel.save()
            .then((createdUser) => res.json(createdUser))
            .catch((err: any) => res.status(500).json(err));
    }

    updateUserById(req: Request, res: Response) {
        const userId = matchedData(req).id;
        const newUser: User = matchedData(req)[''];
        UserSchema.findByIdAndUpdate(userId, newUser)
            .then(() => res.json('Update Successfully'))
            .catch((err: any) => res.status(500).json(err || 'Failed to update'));
    }

    deleteUserById(req: Request, res: Response) {
        const userId = matchedData(req).id;
        UserSchema.findByIdAndDelete(userId)
            .then((updatedUser) => res.json(updatedUser))
            .catch((err: any) => res.status(500).json(err));
    }

}
export let userController = new UserController();