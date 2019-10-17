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
    product: { type: ObjectId, ref: 'Product', unique: true }
  }
);

interface ProductOrder {
  quantity: Number;
  product: ObjectId | string;
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

export let productOrderJsonSchema: Schema = {
  id: '/ProductOrderJsonSchema',
  type: 'object',
  properties: {
    quantity: {
      type: 'number'
    },
    product: {
      type: 'string'
    }
  },
  required: ['quantity', 'product'],
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

export default mongoose.model('Order', OrderSchema);