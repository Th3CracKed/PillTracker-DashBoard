import * as mongoose from 'mongoose';
import { Schema } from 'jsonschema';

export interface Product {
  productName: string;
  series: string;
  description?: string;
}

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    series: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export let productJsonSchema: Schema = {
  id: '/ProductJsonSchema',
  type: 'object',
  properties: {
    productName: {
      type: 'string'
    },
    series: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  },
  required: ['productName', 'series'],
  additionalProperties: false
};

export default mongoose.model('Product', ProductSchema);