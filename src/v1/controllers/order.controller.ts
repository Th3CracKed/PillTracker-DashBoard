import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import OrderSchema from '../models/order.model';
import UserSchema from '../models/user.model';
import { Order } from '../models';

export class OrderController {

    getAllOrder(req: Request, res: Response) {
        OrderSchema.find((err: any, orders: Order[]) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(orders);
            }
        });
    }

    getOrderById(req: Request, res: Response) {
        const orderId: string = matchedData(req).id;
        OrderSchema.findById(orderId, (err: any, order: Order) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(order);
            }
        });
    }

    createOrder(req: Request, res: Response) {
        const order: Order = matchedData(req)[''];
        const orderSchema = new OrderSchema(order);
        orderSchema.save()
            .then((createdOrder) => {
                UserSchema.updateOne({_id: order.userId}, { $addToSet: { orders: createdOrder._id } })
                .then(() => res.json(createdOrder))
                .catch((err: any) => res.status(500).json(err));
            })
            .catch((err: any) => res.status(500).json(err));
    }

    updateOrderById(req: Request, res: Response) {
        const orderId: string = matchedData(req).id;
        const newOrder: Order = matchedData(req)[''];
        const userId: string = matchedData(req)[''].userId;
        OrderSchema.findByIdAndUpdate(orderId, newOrder)
            .then((updatedOrder) => {
                UserSchema.updateOne({_id: userId}, { $addToSet: { orders: updatedOrder._id } })
                .then(() => res.json('Update Successfully'))
                .catch((err: any) => res.status(500).json(err));
            })
            .catch((err: any) => res.status(500).json(err));
    }

    deleteOrderById(req: Request, res: Response) {
        const orderId: string = matchedData(req).id;
        OrderSchema.findByIdAndDelete(orderId)
            .then((updatedOrder) => res.json(updatedOrder))
            .catch((err: any) => res.status(500).json(err));
    }

}

export let orderController = new OrderController();
