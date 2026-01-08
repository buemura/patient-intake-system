export const envConfiguration = () => ({
  serverPort: parseInt(process.env.PORT!) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  messaging: {
    rabbitmq: {
      host: process.env.RABBITMQ_URL,
    },
  },
});
