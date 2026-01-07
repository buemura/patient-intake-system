import * as mongoose from 'mongoose';

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
      required: true,
    },
    formAnswers: { type: mongoose.Schema.Types.Mixed, required: false },
    validationErrors: {
      type: [{ fieldKey: String, message: String }],
      required: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);
