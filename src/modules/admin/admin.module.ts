import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/shared/database/database.module';
import { FORM_REPOSITORY } from '../intake/persistence/form.repository';
import { MongooseFormRepository } from '../intake/persistence/mongoose/mongoose-form.repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: FORM_REPOSITORY,
      useClass: MongooseFormRepository,
    },
  ],
})
export class AdminModule {}
