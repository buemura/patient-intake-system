import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { IntakeModule } from './intake/intake.module';

@Module({
  imports: [AdminModule, IntakeModule],
})
export class AppModule {}
