import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { Product } from '../models';
import { productService } from '../services';
import { isTrueBool } from '../../utils';

export class ProductController {

    getAllProduct(req: Request, res: Response) {
        const populate: string = matchedData(req).populate;
        productService.getAllProduct(isTrueBool(populate))
        .then((products) => res.json(products))
        .catch(err => res.status(404).json(err));
    }

    getProductById(req: Request, res: Response) {
        const productId: string = matchedData(req).id;
        const populate: string = matchedData(req).populate;
        productService.getProductById(productId, isTrueBool(populate))
        .then(product => res.json(product))
        .catch(err => res.status(404).json(err));
    }

    createProduct(req: Request, res: Response) {
        const product: Product = matchedData(req)[''];
        productService.createProduct(product)
        .then(createdProduct => res.json(createdProduct))
        .catch((err: any) => res.status(500).json(err));
    }

    updateProductById(req: Request, res: Response) {
        const productId: string = matchedData(req).id;
        const newProduct: Product = matchedData(req)[''];
        productService.updateProductById(productId, newProduct)
        .then(() => res.json('Update Successfully'))
        .catch((err: any) => res.status(500).json(err));
    }

    deleteProductById(req: Request, res: Response) {
        const productId: string = matchedData(req).id;
        productService.deleteProductById(productId)
        .then(deletedProduct => res.json(deletedProduct))
        .catch((err: any) => res.status(500).json(err));
    }

}

export let productController = new ProductController();
