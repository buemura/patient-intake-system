import { DownstreamStatusEnum, IntakeStatusEnum } from '../intake.enum';

export class CreateIntake {
  patientId: string;
  formId: string;
}

class ValidationError {
  fieldKey: string;
  message: string;
}

class DownstreamStatus {
  eligibility: DownstreamStatusEnum;
  scheduling: DownstreamStatusEnum;
  billing: DownstreamStatusEnum;
  ehr: DownstreamStatusEnum;
}

export class Intake {
  id: string;
  patientId: string;
  formId: string;
  status: IntakeStatusEnum;
  formAnswers?: Record<string, any>;
  validationErrors?: Array<ValidationError>;
  downstreamStatus?: DownstreamStatus;
  createdAt: Date;
  updatedAt: Date;
}
