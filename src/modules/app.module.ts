import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envConfiguration, envValidation } from '@/config';
import { BillingModule } from './billing/billing.module';
import { EhrModule } from './ehr/ehr.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { FormModule } from './form/form.module';
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
    IntakeModule,
    FormModule,
    BillingModule,
    EhrModule,
    EligibilityModule,
    SchedulingModule,
  ],
})
export class AppModule {}
