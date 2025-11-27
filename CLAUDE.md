# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Development Server
```bash
pnpm dev                # Start development server with hot reload
pnpm run dev:db-connect # Test database connection only
```

### Database Operations
```bash
pnpm seed              # Run database migrations (drizzle-kit push)
pnpm studio            # Launch Drizzle Studio for database management
```

### Type Checking
```bash
pnpm tpye-check        # TypeScript type checking (note: script name has typo)
```

## Architecture Overview

This is a TypeScript + Express backend API with a layered architecture using PostgreSQL and Drizzle ORM.

### Core Architecture Patterns

**Database Layer**: Uses Drizzle ORM with PostgreSQL. Schema definitions are in `src/db/schema.ts` with two main tables: `usersTable` and `productsTable`. Database connection is managed through `src/utils/db.helper.ts`.

**Route Organization**: Implements permission-based routing with clear separation:
- Public routes (no auth required): User registration/login and customer product queries
- Protected routes (JWT required): Admin product management operations
- Authentication middleware sits between public and protected route groups

**Service Layer Pattern**: Clear separation between controllers and database operations:
- `src/services/user.service.ts`: Handles user operations with bcrypt password hashing
- `src/services/product.service.ts`: Manages product CRUD with search and pagination

**Authentication System**: JWT-based authentication using the `jose` library:
- 24-hour token expiration
- Middleware-based token verification
- Bearer token format expected in Authorization header

### Key Technical Details

**Middleware Stack** (applied in order):
1. CORS configuration
2. JSON body parsing
3. Rate limiting (10 requests per second)
4. Pino HTTP logging

**Error Handling**: Custom `AppError` class with global error handler in `src/utils/globalErrorhandler.ts`. Uses standardized response helpers from `src/utils/response.helper.ts`.

**Logging System**: Pino-based logging with multi-target output:
- Console output via pino-pretty (colorized)
- File logging: `src/logs/all-logs.log` and `src/logs/errors.log`
- Automatic log level adjustment based on HTTP status codes

**API Structure**:
- Customer endpoints: `/v1/products`, `/v1/products/:id`, `/v1/products/count`
- Admin endpoints: `/v1/products-manage/*` (CRUD operations)
- User endpoints: `/v1/signup`, `/v1/login`

### Development Notes

**Environment Variables**: Database configuration uses `DATABASE_URL` for PostgreSQL connection. The project uses dotenvx for environment variable management.

**TypeScript Configuration**: Uses tsx for development with watch mode. Strict type checking is enabled.

**Security Implementation**:
- bcrypt with 10 rounds for password hashing
- Express rate limiting for API protection
- CORS configured for cross-origin requests

**Database Schema**: Currently implements users and products entities. The products table supports search functionality with name-based ILIKE queries.

**Response Format**: Standardized JSON responses using helper functions for success, error, and not-found scenarios.