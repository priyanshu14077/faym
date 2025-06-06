# Web Analytics Backend Service

A TypeScript backend to collect, store, and analyze user interaction events. Built using Express.js, Prisma, and PostgreSQL, this service supports data ingestion and API-driven analytics.

## 📦 Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Faker (for generating sample data)

---

## 🚀 Getting Started

1. Clone the Repository

```bash
git clone https://github.com/priyanshu14077/faym
cd web-analytics-backend
```
2. Install alk the necessary dependancies
npm install

3. Configure Environment Variables
4. Initialize the Database
{ npx prisma generate || npx db push }
5. Generate Sample Data (Optional)
   { npm run generate-data }

6. Run the developeemt server.
{ npm run dev }

API ENDPOINTS 

A. POST /events

Request Body:

{
  "user_id": "user_123",
  "event_type": "view",
  "payload": {
    "url": "http://localhost:5000",
    "title": "Web-analytics"
  }
}

B. GET /analytics/event-counts
Query Params:

event_type (optional)

start_date (optional, ISO format)

end_date (optional, ISO format)


