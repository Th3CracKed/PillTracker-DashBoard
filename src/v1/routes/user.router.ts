import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { userController } from '../controllers/user.controller';
import { body, check, sanitize } from 'express-validator';
import { isJsonValid, validateFn } from '../../utils';
import { userJsonSchema, UserRequired } from '../models';
const router = express.Router();

/**
 * Get All Users
 * @param populate get param to populate id fields
 */
router.get('', [check('populate').optional().isBoolean()],
    userController.getAllUser);


/**
 * Get user by id
 * @param populate get param to populate id fields
 */
router.get('/:id',
    [check('id').exists().trim(),
    check('populate').optional().isBoolean()],
    userController.getUserById);


/**
 * Create User
 * @params required : firstName, lastName, Email (unique)
 * @param optional orders: collections of string ids
 */
router.post('',
    [body()
        .custom(isJsonValid(userJsonSchema, UserRequired)),
    check('email', 'Please enter a valid email address.').trim().isEmail(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize('email').normalizeEmail({ gmail_remove_dots: true })],
    validateFn(userController.createUser));

/**
 * Update User, adding orders to existing when
 */
router.post('/:id',
    [check('id').exists().trim(),
    body()
        .custom(isJsonValid(userJsonSchema)),
    check('email', 'Please enter a valid email address.').trim().isEmail(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize('email').normalizeEmail({ gmail_remove_dots: true })],
    (req: Request, res: Response, next: NextFunction) => {
        (<any>req).replace = false;
        next();
    },
    validateFn(userController.updateUserById));

/**
 * Update User, replace orders
 */
router.put('/:id',
    [check('id').exists().trim(),
    check('orders').optional(),
    body().custom(isJsonValid(userJsonSchema)),
    check('email', 'Please enter a valid email address.').trim().isEmail(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize('email').normalizeEmail({ gmail_remove_dots: true })],
    (req: Request, res: Response, next: NextFunction) => {
        (<any>req).replace = true;
        next();
    },
    validateFn(userController.updateUserById));

/**
 * Delete User
 */
router.delete('/:id',
    check('id').exists().trim(),
    validateFn(userController.deleteUserById));

export { router as userRouter };