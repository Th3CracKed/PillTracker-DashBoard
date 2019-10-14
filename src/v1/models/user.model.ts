import * as mongoose from 'mongoose';
import { Schema } from 'jsonschema';
import { ObjectId } from 'mongodb';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  orders?: ObjectId[];
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      required: true,
      trim: true,
      lowercase: true
    },
    points: {
      type: Number,
      required: true,
      default: 0
    },
    orders: [{ type: ObjectId, ref: 'Order'}]
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export let userJsonSchema: Schema = {
  id: '/UserJsonSchema',
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      'type': 'string'
    },
    orders: {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    }
  },
  required: ['email'],
  additionalProperties: false
};

export let requiredForCreation: Schema = {
  id: '/UserJsonSchemaRequired',
  required: ['firstName', 'lastName']
};



export default mongoose.model('User', UserSchema);