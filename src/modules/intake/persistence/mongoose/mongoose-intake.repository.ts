import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { INTAKE_MODEL } from '@/shared/database/mongoose/mongoose.provider';
import { CreateIntake, Intake } from '../../entities/intake.entity';
import { IntakeRepository } from '../intake.repository';

@Injectable()
export class MongooseIntakeRepository implements IntakeRepository {
  constructor(
    @Inject(INTAKE_MODEL)
    private readonly intakeModel: Model<Intake>,
  ) {}

  private toEntity(doc: Intake & { _id: any }): Intake {
    return {
      id: doc._id.toString(),
      patientId: doc.patientId,
      formId: doc.formId,
      status: doc.status,
      formAnswers: doc.formAnswers,
      validationErrors: doc.validationErrors,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findById(id: string): Promise<Intake | null> {
    const intake = await this.intakeModel.findById(id).exec();
    if (!intake) return null;

    return this.toEntity(intake);
  }

  async create(intake: CreateIntake): Promise<Intake> {
    const createdIntake = await this.intakeModel.create({
      ...intake,
      status: 'IN_PROGRESS',
    });
    return this.toEntity(createdIntake);
  }

  async addFormAnswers(
    id: string,
    formAnswers: Record<string, any>,
  ): Promise<Intake | null> {
    const updatedIntake = await this.intakeModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            formAnswers,
            status: 'SUBMITTED',
            updatedAt: new Date(),
          },
        },
        { new: true },
      )
      .exec();
    if (!updatedIntake) return null;

    return this.toEntity(updatedIntake);
  }
}
