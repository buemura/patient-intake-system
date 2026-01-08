import 'dotenv/config';
import * as mongoose from 'mongoose';
import { FormSchema } from '../src/shared/database/mongoose/schemas/form.schema';

async function seed() {
  // Connect to MongoDB
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(databaseUrl);
  console.log('Connected to MongoDB');

  // Create the Form model
  const FormModel = mongoose.model('forms', FormSchema);

  // Define the seed documents
  const forms = [
    {
      location: 'urban',
      insuranceType: 'unimed',
      fields: [
        {
          name: 'height',
          dataType: 'number',
          required: true,
        },
        {
          name: 'weight',
          dataType: 'number',
          required: true,
        },
      ],
    },
    {
      location: 'urban',
      insuranceType: 'bradesco',
      fields: [
        {
          name: 'height',
          dataType: 'number',
          required: true,
        },
        {
          name: 'weight',
          dataType: 'number',
          required: true,
        },
        {
          name: 'bloodType',
          dataType: 'string',
          required: true,
        },
      ],
    },
  ];

  try {
    // Clear existing forms (optional - remove if you want to keep existing data)
    // await FormModel.deleteMany({});

    // Insert the forms
    console.log('Inserting forms...');
    const insertedForms = await FormModel.insertMany(forms);
    console.log(`Successfully inserted ${insertedForms.length} forms`);
    insertedForms.forEach((form, index) => {
      console.log(
        `  - Form ${index + 1}: ${form.location} / ${form.insuranceType}`,
      );
    });
  } catch (error) {
    if (error.code === 11000) {
      console.log(
        'Some forms already exist (unique constraint violation). Skipping insertion.',
      );
    } else {
      throw error;
    }
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
