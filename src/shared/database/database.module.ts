import { Module } from '@nestjs/common';

import { connectionProvider } from './database.provider';
import { mongooseProviders } from './mongoose/mongoose.provider';

@Module({
  providers: [...connectionProvider, ...mongooseProviders],
  exports: [...connectionProvider, ...mongooseProviders],
})
export class DatabaseModule {}
