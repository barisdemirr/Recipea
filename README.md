# Recipea

Recipea is a full-stack recipe management application designed with a decoupled architecture. It features a high-performance .NET 9 backend and a modern Next.js 16 frontend.

## Tech Stack

### Backend
- Framework: .NET 9
- Database: PostgreSQL
- Authentication: JWT (JSON Web Token)
- Features: Global Exception Handling, Image upload system (stored in wwwroot)

### Frontend
- Framework: Next.js 16
- Styling: Standard CSS (No Tailwind CSS)

---

## Prerequisites

Make sure you have the following installed on your machine:
1. .NET 9 SDK
2. Node.js (Latest LTS version)
3. PostgreSQL Server
4. A terminal or command prompt

---

## Installation & Setup Guide

### 1. Database Setup
The application uses PostgreSQL. Follow these steps to prepare your database:

1. Open your PostgreSQL management tool (e.g., pgAdmin 4).
2. Create a new database named `RecipeaDb`.
3. Locate the `appsettings.json` file in the **Backend** project folder.
4. Update the connection string with your own PostgreSQL username and password:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost; Port=5432; Database=RecipeaDb; Username=YOUR_POSTGRES_USERNAME; Password=YOUR_POSTGRES_PASSWORD"
}
