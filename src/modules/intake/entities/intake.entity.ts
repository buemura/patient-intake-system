export enum IntakeStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export class CreateIntake {
  patientId: string;
  formId: string;
}

export class Intake {
  id: string;
  patientId: string;
  formId: string;
  status: IntakeStatus;
  formAnswers?: Record<string, any>;
  validationErrors?: Array<{ fieldKey: string; message: string }>;
  createdAt: Date;
  updatedAt: Date;
}
