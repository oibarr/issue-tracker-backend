# Issue Tracker — Backend Implementations

This project implements the required backend API for the Issue Tracker take-home assessment in two versions:

- backend-express — Express + SQLite
- backend-nest — NestJS + TypeORM + SQLite

## Features

- Relational DB schema: users → projects → issues
- User Signup + Login with JWT
- Password hashing with bcrypt
- Ownership enforced
- RESTful API
- Tested with curl
- Minimal app focused on core requirements

## Running the projects

```bash
cd backend-express
cp .env.local .env
npm install
npm run dev
```

```bash
cd backend-nest
cp .env.local .env
npm install
npm run start:dev
```

## Testing

- See respective backend README — curl examples included.
