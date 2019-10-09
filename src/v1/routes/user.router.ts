import * as express from 'express';
import { userController } from '../controllers/user.controller';
import { body, check, sanitize } from 'express-validator';
import { isJsonValid } from '../../utils';
import { userJsonSchema } from '../models/user.model';
const router = express.Router();

/**
 * Get All Users
 */
router.get('',
    userController.getAllUser);


/**
 * Get user by id
 */
router.get('/:id',
    [check('id').exists().trim()],
    userController.getUserById);


/**
 * Create User
 */
router.post('',
    [body()
        .custom(isJsonValid(userJsonSchema)),
    check('email', 'Please enter a valid email address.').trim().isEmail(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize('email').normalizeEmail({ gmail_remove_dots: true })],
    userController.createUser);

/**
 * Update User
 */
router.put('/:id',
    [check('id').exists().trim(),
    body().custom(isJsonValid(userJsonSchema)),
    check('email', 'Please enter a valid email address.').trim().isEmail(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize('email').normalizeEmail({ gmail_remove_dots: true })],
    userController.updateUserById);


router.delete('/:id',
    check('id').exists().trim(),
    userController.deleteUserById);

export { router as userRouter };