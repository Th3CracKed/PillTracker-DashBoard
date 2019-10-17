import ProductSchema from '../models/product.model';
import { Product } from '../models';

export class ProductService {

    getAllProduct(populate: boolean) {
        const findAllProduct = () => ProductSchema.find();
        return populate ? findAllProduct().populate('timeline') : findAllProduct();
    }

    getProductById(productId: string, populate: boolean) {
        const findProductById = () => ProductSchema.findById(productId);
        return populate ? findProductById().populate('timeline') : findProductById();
    }

    createProduct(product: Product) {
        const productSchema = new ProductSchema(product);
        return productSchema.save();
    }

    async updateProductById(productId: string, newProduct: Product) {
        return ProductSchema.findByIdAndUpdate(productId, newProduct);
    }

    deleteProductById(productId: string) {
        return ProductSchema.findByIdAndDelete(productId);
    }

}

export let productService = new ProductService();