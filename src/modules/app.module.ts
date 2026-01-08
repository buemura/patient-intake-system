import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envConfiguration, envValidation } from '@/config';
import { AdminModule } from './admin/admin.module';
import { BillingModule } from './billing/billing.module';
import { EhrModule } from './ehr/ehr.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { IntakeModule } from './intake/intake.module';
import { SchedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [envConfiguration],
      validate: envValidation,
    }),
    AdminModule,
    IntakeModule,
    BillingModule,
    EhrModule,
    EligibilityModule,
    SchedulingModule,
  ],
})
export class AppModule {}
