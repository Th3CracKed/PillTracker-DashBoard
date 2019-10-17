import ProductSchema from '../models/product.model';
import { Product } from '../models';

export class ProductService {

    getAllProduct() {
        return ProductSchema.find();
    }

    getProductById(productId: string) {
        return ProductSchema.findById(productId);
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