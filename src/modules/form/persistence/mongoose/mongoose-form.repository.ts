import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { InsuranceType, PatientLocation } from '@/modules/patient/patient.enum';
import { FORM_MODEL } from '@/shared/database/mongoose/mongoose.provider';
import { CreateForm, Form } from '../../form.entity';
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

  async findById(id: string): Promise<Form | null> {
    const form = await this.formModel.findById(id).lean().exec();
    if (!form) return null;
    return this.toEntity(form);
  }

  async findByLocationAndInsurance(
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

  async createForm(form: CreateForm): Promise<Form> {
    const createdForm = await this.formModel.create(form);
    return this.toEntity(createdForm);
  }
}
