import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envConfiguration, envValidation } from '@/config';
import { AdminModule } from './admin/admin.module';
import { IntakeModule } from './intake/intake.module';

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
  ],
})
export class AppModule {}
