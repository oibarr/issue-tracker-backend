# Issue Tracker: Express Backend

    Minimal backend API for Issue Tracker implemented in Express + SQLite.

## Features

    User Signup + Login with JWT

    Create Projects (owned by user)

    Create Issues (belonging to project)

    Project ownership enforced via middleware

    RESTful API tested with curl

## Running the project

```bash
cd backend-express
cp .env.local .env
npm install
npm run dev
```

## Setting up .env

```bash
JWT_SECRET=<your-jwt-secret>
PORT=3000
```

## API Routes

Auth

    POST /auth/signup → create user

    POST /auth/login → returns JWT token

Projects

    GET /projects → list user’s projects

    GET /projects/:id → get project by id

    POST /projects → create project

Issues

    GET /projects/:projectId/issues → list issues

    POST /projects/:projectId/issues → create issue

## Testing with curl

Signup

```bash
curl -X POST http://localhost:3000/auth/signup \
 -H "Content-Type: application/json" \
 -d '{"email":"user@example.com","password":"123456"}'
```

Login (get token)

```bash
curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"user@example.com","password":"123456"}'
```

    Copy the "token" value from the response.

Set token

```bash
export TOKEN=<paste-your-token-here>
```

Create Project

```bash
curl -X POST http://localhost:3000/projects \
 -H "Authorization: Bearer $TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"name":"My Project"}'
```

List Projects

```bash
curl -X GET http://localhost:3000/projects \
 -H "Authorization: Bearer $TOKEN"
```

Get Project by Id

```bash
curl -X GET http://localhost:3000/projects/1 \
 -H "Authorization: Bearer $TOKEN"
```

Create Issue

```bash
curl -X POST http://localhost:3000/projects/1/issues \
 -H "Authorization: Bearer $TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"title":"First Issue"}'
```

List Issues

```bash
curl -X GET http://localhost:3000/projects/1/issues \
 -H "Authorization: Bearer $TOKEN"
```

Notes

    Project ownership enforced — user can only see their own projects / issues.

    If project is not owned → returns 404.

    JWT token required for all project and issue routes.
