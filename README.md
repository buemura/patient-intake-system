# Patient Intake System

A backend system for managing dynamic patient intake forms with event-driven architecture for a healthtech company. The system supports dynamic form configuration, multi-session intake completion, and asynchronous processing of downstream services.

## 🏗️ Tech Stack

This application is built with the following technologies:

- **Runtime**: Node.js with TypeScript
- **Framework**: NestJS 11.x
- **Database**: MongoDB (via Mongoose 9.x)
- **Message Queue**: RabbitMQ (via AMQP)
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker Compose
- **Validation**: class-validator & class-transformer

### Key Dependencies

- `@nestjs/common`, `@nestjs/core` - NestJS framework
- `@nestjs/microservices` - Microservices support
- `@nestjs/platform-express` - HTTP server
- `mongoose` - MongoDB ODM
- `amqplib`, `amqp-connection-manager` - RabbitMQ client
- `class-validator` - DTO validation

## 📋 Prerequisites

Before setting up the application, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Docker** and **Docker Compose** (for running MongoDB and RabbitMQ)

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Infrastructure Services

Start MongoDB and RabbitMQ using Docker Compose:

```bash
docker-compose up -d
```

This will start:

- **MongoDB** on port `27017`
  - Default credentials: `admin/admin`
  - Data persisted in `./data/mongodata`
- **RabbitMQ** on port `5672` (AMQP) and `15672` (Management UI)
  - Default credentials: `guest/guest`
  - Management UI: http://localhost:15672

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DATABASE_URL=mongodb://admin:admin@localhost:27017/patient-intake?authSource=admin
RABBITMQ_URL=amqp://guest:guest@localhost:5672
```

**Environment Variables:**

- `PORT` - Server port (default: 3000)
- `DATABASE_URL` - MongoDB connection string
- `RABBITMQ_URL` - RabbitMQ connection string

### 4. Seed the Database

Populate the database with initial form configurations:

```bash
npm run db:seed
```

This will create sample form configurations based on location and insurance type combinations.

## 🏃 Starting the Application

### Development Mode

Start the application in watch mode (auto-reload on file changes):

```bash
npm run start:dev
```

### Production Mode

Build and start the application:

```bash
npm run build
npm run start:prod
```

### Debug Mode

Start with debugging enabled:

```bash
npm run start:debug
```

## 📚 API Documentation

Once the application is running, access the Swagger API documentation at:

**http://localhost:3000/docs**

The Swagger UI provides interactive documentation for all available endpoints.

## 🏛️ Architecture

### Module Structure

The application is organized into the following modules:

- **Intake Module** - Main intake submission and management
- **Form Module** - Dynamic form configuration and retrieval
- **Patient Module** - Patient configuration and retrieval
- **Billing Module** - Billing service consumer (RabbitMQ)
- **Ehr Module** - EHR sync service consumer (RabbitMQ)
- **Eligibility Module** - Eligibility service consumer (RabbitMQ)
- **Scheduling Module** - Scheduling service consumer (RabbitMQ)

### Event-Driven Architecture

The system uses RabbitMQ for asynchronous event processing:

1. When an intake is completed, events are published to RabbitMQ
2. Each downstream service (eligibility, scheduling, billing, EHR) consumes events independently
3. Services process events asynchronously and can handle failures gracefully
4. The system remains responsive even if downstream services are slow or unavailable

### Key Features

- **Dynamic Forms**: Form structure determined by location and insurance type
- **Multi-Session Support**: Intakes can be completed over multiple sessions
- **Form Validation**: Answers validated against the correct form version
- **Asynchronous Processing**: Heavy validations and downstream processing don't block the API
- **Resilience**: Intake submissions are never lost, even if downstream services fail
- **Real-Time Updates**: Background workers update intake status as services complete

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:cov
```

Run end-to-end tests:

```bash
npm run test:e2e
```

## 🔧 Development Scripts

- `npm run build` - Build the application for production
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint and fix issues
- `npm run format` - Format code with Prettier
- `npm run db:seed` - Seed the database with initial data

## 📝 Project Structure

```
src/
├── config/              # Environment configuration and validation
├── main.ts              # Application entry point
├── modules/             # Feature modules
│   ├── intake/         # Intake submission logic
│   ├── form/           # Form configuration
│   ├── billing/        # Billing service consumer
│   ├── ehr/            # EHR service consumer
│   ├── eligibility/    # Eligibility service consumer
│   └── scheduling/     # Scheduling service consumer
└── shared/             # Shared utilities
    ├── database/       # Database configurations and schemas
    └── queue/          # RabbitMQ queue configuration

scripts/
└── seed.ts             # Database seeding script

data/
└── mongodata/          # MongoDB data persistence (Docker volume)
```

## 🔍 Monitoring

- **RabbitMQ Management UI**: http://localhost:15672
  - Monitor queues, connections, and message rates
  - View message routing and consumer status

- **Application Logs**: Check console output for:
  - Server startup confirmation
  - RabbitMQ connection status
  - Event consumption logs from each service
  - Intake processing status updates

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure Docker Compose is running: `docker-compose ps`
- Check MongoDB logs: `docker-compose logs mongodb`
- Verify `DATABASE_URL` includes correct authentication credentials

### RabbitMQ Connection Issues

- Ensure RabbitMQ is running: `docker-compose ps`
- Check RabbitMQ logs: `docker-compose logs rabbitmq`
- Verify `RABBITMQ_URL` format: `amqp://guest:guest@localhost:5672`
- Access Management UI to verify queues are created

### Port Already in Use

If port 3000 is already in use, change the `PORT` environment variable in your `.env` file.

## 📄 License

This project is private and unlicensed.
