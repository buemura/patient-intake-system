import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from '../database.provider';
import { FormSchema } from './schemas/form.schema';
import { IntakeSchema } from './schemas/intake.schema';
import { PatientSchema } from './schemas/patient.schema';

export const PATIENT_MODEL = Symbol('PATIENT_MODEL');
export const FORM_MODEL = Symbol('FORM_MODEL');
export const INTAKE_MODEL = Symbol('INTAKE_MODEL');

export const mongooseProviders = [
  {
    provide: PATIENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('patients', PatientSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: FORM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('forms', FormSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: INTAKE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('intakes', IntakeSchema),
    inject: [DATABASE_CONNECTION],
  },
];
