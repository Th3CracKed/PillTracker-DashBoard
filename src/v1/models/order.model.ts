import * as mongoose from 'mongoose';
import { Schema } from 'jsonschema';
import { ObjectId } from 'mongodb';

const ProductOrderSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    productId: { type: ObjectId, ref: 'Product' }
  }
);

interface ProductOrder {
  quantity: Number;
  productId: ObjectId | string;
}

export interface Order {
  orderDate: string;
  deliveryDate: string;
  productOrder: ProductOrder[];
  userId?: string;
}

const OrderSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date,
      required: true
    },
    deliveryDate: {
      type: Date,
      required: true
    },
    productOrder: [{ type: ProductOrderSchema, required: true }]
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

OrderSchema.post('remove', function () {
  productOrder.remove({ orderId: this._id }).exec();
});

export let productOrderJsonSchema: Schema = {
  id: '/ProductOrderJsonSchema',
  type: 'object',
  properties: {
    quantity: {
      type: 'number'
    },
    productId: {
      type: 'string'
    }
  },
  required: ['quantity', 'productId'],
  additionalProperties: false
};

export let orderJsonSchema: Schema = {
  id: '/OrderJsonSchema',
  type: 'object',
  properties: {
    orderDate: {
      type: 'date-time'
    },
    deliveryDate: {
      type: 'date-time'
    },
    productOrder: {
      type: 'array',
      items: { '$ref': '/ProductOrderJsonSchema' },
      minItems: 1
    },
    userId: {
      type: 'string'
    }
  },
  required: ['orderDate', 'deliveryDate', 'productOrder'],
  additionalProperties: false
};

export const productOrder = mongoose.model('ProductOrder', ProductOrderSchema);
export default mongoose.model('Order', OrderSchema);