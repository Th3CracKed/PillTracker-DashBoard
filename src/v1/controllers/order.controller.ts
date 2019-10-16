import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { Order } from '../models';
import { orderService } from '../services';

export class OrderController {

    getAllOrder(req: Request, res: Response) {
        orderService.getAllOrder()
        .then((orders) => res.json(orders))
        .catch(err => res.status(404).json(err));
    }

    getOrderById(req: Request, res: Response) {
        const orderId: string = matchedData(req).id;
        orderService.getOrderById(orderId)
        .then(order => res.json(order))
        .catch(err => res.status(404).json(err));
    }

    createOrder(req: Request, res: Response) {
        const order: Order = matchedData(req)[''];
        orderService.createOrder(order)
        .then(createdOrder => res.json(createdOrder))
        .catch((err: any) => res.status(500).json(err));
    }

    updateOrderById(req: Request, res: Response) {
        const orderId: string = matchedData(req).id;
        const newOrder: Order = matchedData(req)[''];
        const userId: string = matchedData(req)[''].userId;
        orderService.updateOrderById(orderId, newOrder, userId)
        .then(() => res.json('Update Successfully'))
        .catch((err: any) => res.status(500).json(err));
    }

    deleteOrderById(req: Request, res: Response) {
        const orderId: string = matchedData(req).id;
        orderService.deleteOrderById(orderId)
        .then(deletedOrder => res.json(deletedOrder))
        .catch((err: any) => res.status(500).json(err));
    }

}

export let orderController = new OrderController();
