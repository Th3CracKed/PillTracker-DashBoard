import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { User } from '../models';
import { isTrueBool } from '../../utils';
import { userService } from '../services';

export class UserController {

    getAllUser(req: Request, res: Response) {
        const populate: string = matchedData(req).populate;
        userService.getAllUser(isTrueBool(populate))
        .then(users => res.json(users))
        .catch(err => res.status(404).json(err));
    }

    getUserById(req: Request, res: Response) {
        const userId: string = matchedData(req).id;
        const populate: string = matchedData(req).populate;
        userService.getUserById(userId, isTrueBool(populate))
        .then(user => res.json(user))
        .catch(err => res.status(404).json(err));
    }

    createUser(req: Request, res: Response) {
        const user: User = matchedData(req)[''];
        userService.createUser(user)
            .then((createdUser) => res.json(createdUser))
            .catch((err: any) => res.status(500).json(err));
    }

    updateUserById(req: Request, res: Response) {
        const userId: string = matchedData(req).id;
        const newUser: User = matchedData(req)[''];
        const replace: boolean = (<any>req).replace;
        userService.updateUserById(userId, newUser, replace)
            .then(() => res.json('Update Successfully'))
            .catch((err: any) => res.status(500).json(err));
    }

    deleteUserById(req: Request, res: Response) {
        const userId: string = matchedData(req).id;
        userService.deleteUserById(userId)
            .then((updatedUser) => res.json(updatedUser))
            .catch((err: any) => res.status(500).json(err));
    }

}
export let userController = new UserController();