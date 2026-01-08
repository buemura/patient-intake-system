import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/shared/database/database.module';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { FORM_REPOSITORY } from './persistence/form.repository';
import { MongooseFormRepository } from './persistence/mongoose/mongoose-form.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [FormController],
  providers: [
    FormService,
    {
      provide: FORM_REPOSITORY,
      useClass: MongooseFormRepository,
    },
  ],
  exports: [FormService],
})
export class FormModule {}
