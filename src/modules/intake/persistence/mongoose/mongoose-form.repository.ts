import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { FORM_MODEL } from '@/shared/database/mongoose/mongoose.provider';
import { Form } from '../../entities/form.entity';
import { InsuranceType, PatientLocation } from '../../entities/patient.entity';
import { FormRepository } from '../form.repository';

@Injectable()
export class MongooseFormRepository implements FormRepository {
  constructor(
    @Inject(FORM_MODEL)
    private readonly formModel: Model<Form>,
  ) {}

  private toEntity(doc: Form & { _id: any }): Form {
    return {
      id: doc._id.toString(),
      insuranceType: doc.insuranceType,
      location: doc.location,
      fields: doc.fields,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findOne(
    insuranceType: InsuranceType,
    location: PatientLocation,
  ): Promise<Form | null> {
    const form = await this.formModel
      .findOne({ location, insuranceType })
      .lean()
      .exec();

    if (!form) return null;

    return this.toEntity(form);
  }
}
