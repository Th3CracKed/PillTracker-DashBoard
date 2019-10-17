import * as mongoose from 'mongoose';
import { Schema } from 'jsonschema';

export interface Timeline {
  repeat: number;
  gap: number;
  reminders: Date[];
}

const TimelineSchema = new mongoose.Schema(
  {
    repeat: {
      type: Number,
      required: true
    },
    gap: {
      type: Number,
      required: true
    },
    reminders: [{ type: Date, required: true }]
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export let timelineJsonSchema: Schema = {
  id: '/TimelineJsonSchema',
  type: 'object',
  properties: {
    repeat: {
      type: 'number'
    },
    gap: {
      type: 'number'
    },
    reminders: {
      type: 'array',
      items: {
        type: 'date-time'
      }
    }
  },
  additionalProperties: false
};

export let timelineRequired: Schema = {
  id: '/TimelineJsonSchemaRequired',
  required: ['repeat', 'gap', 'reminders']
};


export default mongoose.model('Timeline', TimelineSchema);