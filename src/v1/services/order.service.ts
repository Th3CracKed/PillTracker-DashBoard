import OrderSchema from '../models/order.model';
import UserSchema from '../models/user.model';
import { Order } from '../models';

export class OrderService {

    getAllOrder(populate: boolean) {
        const findAllOrder = () => OrderSchema.find();
        return populate ?
        findAllOrder().populate({ path: 'productOrder.product', model: 'Product'} )
        : findAllOrder();
    }

    getOrderById(orderId: string, populate: boolean) {
        const findAllOrder = () => OrderSchema.findById(orderId);
        return populate ?
        findAllOrder().populate({ path: 'productOrder.product', model: 'Product'} )
        : findAllOrder();
    }

    async createOrder(order: Order) {
        const orderSchema = new OrderSchema(order);
        const createdOrder = await orderSchema.save();
        await UserSchema.updateOne({ _id: order.userId }, { $addToSet: { orders: createdOrder._id } });
        return createdOrder;
    }

    async updateOrderById(orderId: string, newOrder: Order, userId: string) {
        const updatedOrder = await OrderSchema.findByIdAndUpdate(orderId, newOrder);
        return UserSchema.updateOne({ _id: userId }, { $addToSet: { orders: updatedOrder._id } });
    }

    deleteOrderById(orderId: string) {
        return OrderSchema.findByIdAndDelete(orderId);
    }

}

export let orderService = new OrderService();