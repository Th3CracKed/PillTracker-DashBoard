import * as express from 'express';
import { orderController } from '../controllers/order.controller';
import { body, check } from 'express-validator';
import { isJsonValid, validateFn } from '../../utils';
import { orderJsonSchema, productOrderJsonSchema } from '../models/order.model';
const router = express.Router();

/**
 * Get All Orders
 */
router.get('',
    validateFn(orderController.getAllOrder));

/**
 * Get order by id
 */
router.get('/:id',
    [check('id').exists().trim()],
    validateFn(orderController.getOrderById));

/**
 * Create Order
 */
router.post('', [
    body()
        .custom(isJsonValid(orderJsonSchema, productOrderJsonSchema))],
    validateFn(orderController.createOrder));

/**
 * Update Order (replace)
 */
router.put('/:id',
    [check('id').exists().trim(),
    body().custom(isJsonValid(orderJsonSchema, productOrderJsonSchema))],
    validateFn(orderController.updateOrderById));

/**
 * Delete Order
 */
router.delete('/:id',
    check('id').exists().trim(),
    validateFn(orderController.deleteOrderById));

export { router as orderRouter };