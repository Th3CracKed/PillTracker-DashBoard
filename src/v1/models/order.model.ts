import * as mongoose from 'mongoose';
import { Schema } from 'jsonschema';

export interface Order {
  orderDate: string;
  deliveryDate: string;
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
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

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
    userId: {
      type: 'string'
    }
  },
  required: ['orderDate', 'deliveryDate'],
  additionalProperties: false
};




export default mongoose.model('Order', OrderSchema);