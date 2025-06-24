# Issue Tracker: Nest Backend

    Minimal backend API for Issue Tracker implemented in NestJS + TypeORM + SQLite.

## Features

    User Signup + Login with JWT

    Create Projects (owned by user)

    Create Issues (belonging to project)

    Project ownership enforced via service

    RESTful API tested with curl

## Running the project

```bash
cd backend-nest
cp .env.local .env
npm install
npm run start:dev
```

## Setting up .env

```bash
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=1h
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

## Design

Why this schema?

The schema follows a simple relational structure:

    users → can create many projects

    projects → can have many issues

Each project belongs to a single user (ownership enforced).

Each issue belongs to a project.

Provides clear ownership boundaries: a user can only see their own projects and issues.

# How authentication works

The app uses JWT for authentication:

    Passwords are hashed with bcrypt

    On login, a signed JWT token is returned

    Routes are protected using middleware (Express) or guards (NestJS)

    The token includes the user ID (sub)

    Ownership is enforced by validating that the user owns the project being accessed

# How I would expand the system

Add issue assignees — issues could have a foreign key to a user (or multiple users)

Add teams — projects could be owned by a team instead of an individual

Add issue status transitions and history/audit log

Add timestamps — created_at / updated_at

Add PATCH / DELETE endpoints for projects and issues
