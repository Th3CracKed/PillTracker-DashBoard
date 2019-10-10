import * as mongoose from 'mongoose';
import { Schema } from 'jsonschema';

export interface User extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
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
    }
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
    }
  },
  required: ['firstName', 'lastName', 'email'],
  additionalProperties: false
};




export default mongoose.model<User>('User', UserSchema);