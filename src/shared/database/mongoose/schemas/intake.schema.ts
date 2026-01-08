import * as mongoose from 'mongoose';

const ValidationErrorSchema = new mongoose.Schema(
  {
    fieldKey: { type: String, required: true },
    message: { type: String, required: true },
  },
  { _id: false },
);

const DownstreamStatusSchema = new mongoose.Schema(
  {
    eligibility: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED'],
      default: 'PENDING',
    },
    scheduling: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED'],
      default: 'PENDING',
    },
    billing: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED'],
      default: 'PENDING',
    },
    ehr: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED'],
      default: 'PENDING',
    },
  },
  { _id: false },
);

export const IntakeSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    status: {
      type: String,
      enum: ['IN_PROGRESS', 'SUBMITTED', 'COMPLETED', 'FAILED'],
      default: 'IN_PROGRESS',
      required: true,
    },
    formAnswers: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    validationErrors: {
      type: [ValidationErrorSchema],
      required: false,
    },
    downstreamStatus: {
      type: DownstreamStatusSchema,
      required: false,
      default: () => ({
        eligibility: 'PENDING',
        scheduling: 'PENDING',
        billing: 'PENDING',
        ehr: 'PENDING',
      }),
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);
