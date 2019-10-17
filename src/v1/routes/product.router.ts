import * as express from 'express';
import { productController } from '../controllers';
import { body, check } from 'express-validator';
import { isJsonValid, validateFn } from '../../utils';
import { productJsonSchema } from '../models';
const router = express.Router();

/**
 * Get All Products
 */
router.get('',
    validateFn(productController.getAllProduct));

/**
 * Get product by id
 */
router.get('/:id',
    [check('id').exists().trim()],
    validateFn(productController.getProductById));

/**
 * Create Product
 */
router.post('', [
    body()
        .custom(isJsonValid(productJsonSchema))],
    validateFn(productController.createProduct));

/**
 * Update Product (replace)
 */
router.put('/:id',
    [check('id').exists().trim(),
    body().custom(isJsonValid(productJsonSchema))],
    validateFn(productController.updateProductById));

/**
 * Delete Product
 */
router.delete('/:id',
    check('id').exists().trim(),
    validateFn(productController.deleteProductById));

export { router as productRouter };