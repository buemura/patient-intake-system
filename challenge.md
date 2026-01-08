You are designing the backend for a patient intake system for a healthtech company.
Requirements

1. Dynamic Intake Forms
   - Initial Form Information:
   - Name
   - Age
   - Location (between the valid options)
   - Insurance (between a list of options)

- When the Next button is pressed the next form changes frequently according to
  business rules.

- Propose different form structures to take more basic information that are different
  depending on initial answers on Location and Insurance. 2 different cases are
  enough.

- Backend must not require redeploys when forms change. You should show a
  simple 3rd scenario where it happens after the initial system was deployed.

2. Intake Submission

- Patients submit intake answers
- Answers must be validated against the correct form version
- Intake can be completed over multiple sessions

3. Intake Completion Events
   When intake is completed, the system must notify the services below. You do not need to
   implement those services. You can just add logs to prove those systems were notified
   - Eligibility service
   - Scheduling service
   - Billing service
   - EHR sync service

Each service consumes events independently.

4. Scalability & Reliability
   The system must remain reliable under load and partial failures.

- The API should handle traffic spikes without becoming unavailable.
- Downstream services (eligibility, billing, etc.) may be slow, fail, or be temporarily
  unavailable.
- Intake submissions must never be lost, even if downstream processing fails.

5. Heavy Processing
   Some intake validations are computationally expensive.
   - CPU-heavy validations must not block the Node.js event loop
   - Intake submission APIs should remain responsive while validations run
   - Heavy processing should be executed asynchronously and outside the request
     lifecycle

6. Real-Time Intake Status
   Simulate real-time intake progress by notifying the patient as downstream steps complete.
   Each downstream service should report its completion status:
   - Eligibility checked
   - Appointment scheduled
   - Billing completed
   - EHR synchronized

Updates should be produced asynchronously by background workers.
A UI is not required: logs, API responses, or a simple stream are sufficient.

🏗 Expected Tech Stack

- Node.js (TypeScript preferred)
- MongoDB (form schemas & responses)
- RabbitMQ/Redis
- Docker Compose + env vars (for simple run)
