import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const DATABASE_CONNECTION = Symbol('DATABASE_CONNECTION');

export const connectionProvider = [
  {
    inject: [ConfigService],
    provide: DATABASE_CONNECTION,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(configService.getOrThrow<string>('database.url')),
  },
];
