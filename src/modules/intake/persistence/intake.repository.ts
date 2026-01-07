import { CreateIntake, Intake } from '../entities/intake.entity';

export const INTAKE_REPOSITORY = Symbol('INTAKE_REPOSITORY');

export interface IntakeRepository {
  findById(id: string): Promise<Intake | null>;
  create(intake: CreateIntake): Promise<Intake>;
  addFormAnswers(
    id: string,
    formAnswers: Record<string, any>,
  ): Promise<Intake | null>;
}
