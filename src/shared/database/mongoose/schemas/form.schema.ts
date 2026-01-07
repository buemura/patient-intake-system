import * as mongoose from 'mongoose';

const FieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dataType: { type: String, required: true },
    required: { type: Boolean, required: true },
  },
  { _id: false }, // optional: prevents automatic _id on subdocs
);

export const FormSchema = new mongoose.Schema(
  {
    insuranceType: {
      type: String,
    },
    location: {
      type: String,
    },
    fields: [FieldSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

FormSchema.index({ insuranceType: 1, location: 1 }, { unique: true });
