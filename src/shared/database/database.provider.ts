import * as mongoose from 'mongoose';

export const DATABASE_CONNECTION = Symbol('DATABASE_CONNECTION');

export const connectionProvider = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://admin:admin@localhost:27017/intake_db?authSource=admin',
      ),
  },
];
