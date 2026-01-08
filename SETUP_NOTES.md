# Config Store - Setup Notes
## Helm Course - Section Overview

### Project Overview
- **Project Name**: `config-store`
- **Purpose**: Key-Value Store API (Helm course optional exercise)
- **Repository**: `https://github.com/jameshill-hue/config-store`

---

## Command Line Steps Executed

### Step-by-Step Commands:

1. **Navigate to project directory**
   ```bash
   cd config-store
   ```

2. **Check git status** (repository already cloned from GitHub)
   ```bash
   git status
   # Output: On branch main, up to date with 'origin/main', working tree clean
   ```

3. **Initialize npm project** (with default values)
   ```bash
   npm init -y
   ```
   - Creates `package.json` with default configuration
   - Note: Initial `npm init` was canceled, then used `-y` flag for non-interactive mode

4. **Create Docker and project structure files**
   ```bash
   touch dockerfile .dockerignore compose.yaml
   mkdir src
   ```

5. **Install production dependencies** (with exact versions)
   ```bash
   npm i --save-exact express@4.21.1 sequelize@6.37.5 pg@8.13.1 pg-hstore@2.3.4 body-parser@1.20.3 cors@2.8.5
   ```
   - Installed 107 packages
   - Note: 4 high severity vulnerabilities reported (can be addressed later)

6. **Verify installation**
   ```bash
   npm install
   ```
   - Confirmed all packages up to date

7. **Install development dependency**
   ```bash
   npm install --save-exact --save-dev nodemon@3.1.7
   ```
   - Added 29 packages (total 137 packages after dev dependency)

---

## Lesson 2: Building the Express Application

### Commands Used:

8. **Run application locally in development mode**
   ```bash
   npm run dev
   ```
   - Starts Express server with nodemon for auto-reload
   - Server runs on port 3000 (default)
   - Accessible at `http://localhost:3000`

9. **Build and run with Docker Compose (with watch mode)**
   ```bash
   docker compose up --build --watch
   ```
   - `--build`: Rebuilds images before starting
   - `--watch`: Enables file watching for hot-reload in containers
   - Maps container port 80 to host port 3000
   - Uses development stage from multi-stage Dockerfile

---

## What Has Been Set Up

### 1. **GitHub Repository**
- Created new repository: `jameshill-hue/config-store`
- Repository already cloned locally (git status shows clean working tree on main branch)
- Repository URL configured in `package.json`

### 2. **Node.js Project Structure**
- **Package Manager**: npm (CommonJS)
- **Project Type**: Express.js API application
- **Main Entry**: `index.js` (to be created)

### 3. **Dependencies Installed**

#### Production Dependencies:
- **express** (v4.21.1) - Web framework for Node.js
- **pg** (v8.13.1) - PostgreSQL client for Node.js
- **sequelize** (v6.37.5) - ORM for PostgreSQL
- **pg-hstore** (v2.3.4) - Serialization library for PostgreSQL hstore
- **body-parser** (v1.20.3) - Middleware for parsing request bodies
- **cors** (v2.8.5) - Cross-Origin Resource Sharing middleware

#### Development Dependencies:
- **nodemon** (v3.1.7) - Auto-restart development server

### 4. **Docker Configuration**

#### Files Created:
- **`dockerfile`** - Docker image definition (currently empty, to be configured)
- **`compose.yaml`** - Docker Compose configuration (currently empty, to be configured)
- **`.dockerignore`** - Files to exclude from Docker build:
  - `node_modules/` - Dependencies (will be installed in container)
  - `.env*` - Environment files (for security)

### 5. **Project Structure**
```
config-store/
├── src/              # Source code directory (empty, ready for code)
├── node_modules/     # Installed dependencies
├── package.json      # Project configuration & dependencies
├── package-lock.json # Locked dependency versions
├── dockerfile        # Docker image definition
├── compose.yaml      # Docker Compose setup
├── .dockerignore     # Docker build exclusions
├── LICENSE           # License file
└── README.md         # Project documentation
```

---

## Key Points

### Application Stack:
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL (via Sequelize ORM)
- **Containerization**: Docker (Dockerfile + Docker Compose)
- **API Type**: RESTful Key-Value Store API

### Next Steps (Likely):
1. Create application code in `src/` directory
2. Configure Dockerfile for Node.js application
3. Set up Docker Compose with PostgreSQL service
4. Create database models using Sequelize
5. Implement API endpoints for key-value operations
6. Commit and push changes to GitHub repository

### Important Files Status:
- ✅ `package.json` - Configured with dependencies and dev script
- ✅ `.dockerignore` - Configured (excludes node_modules and .env*)
- ✅ Git repository - Already cloned and initialized (on main branch)
- ✅ `dockerfile` - Multi-stage build configured (development & production)
- ✅ `compose.yaml` - Docker Compose configured with watch mode
- ✅ `src/index.js` - Basic Express application created

---

## Technical Stack Summary
- **Runtime**: Node.js (CommonJS)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Containerization**: Docker + Docker Compose
- **Development**: nodemon for hot-reloading

---

## Lesson 2: Building the Express Application - Details

### What Was Built:

#### 1. **Express Application (`src/index.js`)**
- Basic Express server setup with middleware
- CORS enabled for cross-origin requests
- Body parser for JSON request handling
- Simple GET route at root path (`/`)
- Port configuration via environment variable (defaults to 3000)

#### 2. **Multi-Stage Dockerfile**
- **Development Stage**: 
  - Uses `node:22-alpine` base image
  - Installs all dependencies (including dev)
  - Runs `npm run dev` with nodemon for hot-reload
- **Production Dependencies Stage**:
  - Separate stage to install only production dependencies
  - Optimizes final image size
- **Production Stage**:
  - Uses `distroless/nodejs22` for minimal attack surface
  - No shell, minimal OS components
  - Copies only production dependencies and source code

#### 3. **Docker Compose Configuration (`compose.yaml`)**
- **Service**: `app`
  - Builds using development target
  - Port mapping: `3000:80` (host:container)
  - Environment: `PORT=80` (container port)
  - **Watch Mode**: Syncs `./src` to `/app/src` for hot-reload
  - Custom network: `config-store-net`

#### 4. **Package.json Scripts**
- Added `"dev": "nodemon src/index.js"` script
- Enables running application with auto-reload during development

### Key Concepts:

- **Multi-stage Docker builds**: Separate stages for development and production optimize image size and security
- **Docker Compose watch mode**: Automatically syncs file changes to container for development
- **Distroless images**: Minimal production images with no shell or package manager for better security
- **Environment variables**: PORT can be configured via environment for flexibility

### Development Workflow:
1. Local development: `npm run dev` (runs on port 3000)
2. Containerized development: `docker compose up --build --watch` (runs on port 3000, mapped from container port 80)

---

## Lesson 3: Configuring PostgreSQL for the Project

### Commands Used:

10. **Run application with Docker Compose** (includes PostgreSQL service)
   ```bash
   docker compose up --build --watch
   ```
   - Starts both application and PostgreSQL database services
   - Database connection is established before server starts
   - Watch mode enabled for hot-reload

### What Was Built:

#### 1. **Database Connection Module (`src/db.js`)**
- Created Sequelize instance for PostgreSQL connection
- Uses `DB_URL` environment variable for connection string
- Configured with PostgreSQL dialect
- Exported for use throughout the application

#### 2. **Updated Express Application (`src/index.js`)**
- Added database connection import
- **Database startup sequence**:
  1. Authenticate connection to PostgreSQL
  2. Sync database models (creates tables if needed)
  3. Start Express server only after successful DB connection
- Error handling for database connection failures

#### 3. **Docker Compose PostgreSQL Service (`compose.yaml`)**
- **New `db` service**:
  - Uses official `postgres:17.1` image
  - Environment variables for database initialization:
    - `POSTGRES_USER` - Database user
    - `POSTGRES_PASSWORD` - Database password
    - `POSTGRES_DB` - Database name
  - Persistent volume (`postgres-data`) for data storage
  - Connected to `config-store-net` network

- **Updated `app` service**:
  - Added `DB_URL` environment variable
  - Connection string format: `postgresql://user:password@db:5432/database`
  - Uses service name `db` for hostname (Docker Compose DNS)
  - Added `depends_on: db` to ensure database starts first

#### 4. **Git Ignore File (`.gitignore`)**
- Standard Node.js `.gitignore` template
- Excludes `node_modules/`, logs, cache files
- Excludes `.env` files (for security)
- Prevents committing sensitive data and build artifacts

### Key Concepts:

- **Sequelize ORM**: Object-Relational Mapping for PostgreSQL
- **Database connection string**: Uses environment variables for flexibility and security
- **Service dependencies**: `depends_on` ensures database starts before application
- **Docker Compose networking**: Services can communicate using service names as hostnames
- **Persistent volumes**: Database data survives container restarts
- **Database synchronization**: `db.sync()` creates tables based on Sequelize models

### Environment Variables Required:

Create a `.env` file with:
```
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

### Database Connection Flow:

1. Docker Compose starts PostgreSQL service
2. PostgreSQL initializes with provided credentials
3. Application service starts and connects to database
4. Sequelize authenticates connection
5. Database models are synchronized (tables created)
6. Express server starts listening for requests

### Important Files Status:
- ✅ `src/db.js` - Database connection module created
- ✅ `src/index.js` - Updated with database connection logic
- ✅ `compose.yaml` - PostgreSQL service added with volumes
- ✅ `.gitignore` - Standard Node.js ignore patterns added

---

## Lesson 4: Developing the API Routes for the Key-Value Store

### Commands Used:

11. **Run application with Docker Compose** (for testing)
   ```bash
   docker compose up --build --watch
   ```
   - Starts application and database services
   - Watch mode enables hot-reload during development

### What Was Built:

#### 1. **Database Model (`src/models.js`)**
- **KV Model Definition**:
  - Created Sequelize model for key-value storage
  - **Key field**: 
    - Type: STRING
    - Required (allowNull: false)
    - Unique constraint (prevents duplicate keys)
  - **Value field**:
    - Type: STRING
    - Required (allowNull: false)
- Model is synchronized with database on startup (creates `KVs` table)

#### 2. **API Routes (`src/routes.js`)**
- Created Express Router with 5 RESTful endpoints:
  
  **GET `/api/kv`** - List all key-value pairs
  - Returns: Array of all key-value entries
  - Status: 200 (success) or 500 (error)
  
  **GET `/api/kv/:key`** - Get specific key-value pair
  - Params: `key` (URL parameter)
  - Returns: Single key-value object
  - Status: 200 (found), 404 (not found), or 500 (error)
  
  **POST `/api/kv`** - Create new key-value pair
  - Body: `{ key: string, value: string }`
  - Validation: Both key and value required
  - Prevents duplicates (returns 400 if key exists)
  - Returns: Created key-value object
  - Status: 201 (created), 400 (bad request), or 500 (error)
  
  **PUT `/api/kv/:key`** - Update existing key-value pair
  - Params: `key` (URL parameter)
  - Body: `{ value: string }`
  - Validation: Value required
  - Returns: Updated key-value object
  - Status: 200 (updated), 404 (not found), 400 (bad request), or 500 (error)
  
  **DELETE `/api/kv/:key`** - Delete key-value pair
  - Params: `key` (URL parameter)
  - Returns: No content
  - Status: 204 (deleted), 404 (not found), or 500 (error)

#### 3. **Updated Main Application (`src/index.js`)**
- Imported API routes module
- Mounted routes at `/api` prefix
- All API endpoints accessible under `/api/kv/*`

### Key Concepts:

- **Sequelize Models**: Define database schema and provide ORM methods
- **Express Router**: Modular route organization for better code structure
- **RESTful API Design**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Async/Await**: Handle asynchronous database operations
- **Error Handling**: Try-catch blocks with appropriate HTTP status codes
- **Input Validation**: Validate required fields before processing
- **HTTP Status Codes**:
  - 200: Success
  - 201: Created
  - 204: No Content (successful deletion)
  - 400: Bad Request (validation errors)
  - 404: Not Found
  - 500: Internal Server Error

### API Endpoints Summary:

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/kv` | List all pairs | - | `{ data: [...] }` |
| GET | `/api/kv/:key` | Get one pair | - | `{ data: {...} }` |
| POST | `/api/kv` | Create pair | `{ key, value }` | `{ data: {...} }` |
| PUT | `/api/kv/:key` | Update pair | `{ value }` | `{ data: {...} }` |
| DELETE | `/api/kv/:key` | Delete pair | - | 204 No Content |

### Testing with Postman:

#### Test Cases:

1. **Create Key-Value Pair**:
   - Method: POST
   - URL: `http://localhost:3000/api/kv`
   - Body (JSON): `{ "key": "test-key", "value": "test-value" }`
   - Expected: 201 Created with data

2. **Get All Key-Value Pairs**:
   - Method: GET
   - URL: `http://localhost:3000/api/kv`
   - Expected: 200 OK with array of all pairs

3. **Get Specific Key-Value Pair**:
   - Method: GET
   - URL: `http://localhost:3000/api/kv/test-key`
   - Expected: 200 OK with specific pair

4. **Update Key-Value Pair**:
   - Method: PUT
   - URL: `http://localhost:3000/api/kv/test-key`
   - Body (JSON): `{ "value": "updated-value" }`
   - Expected: 200 OK with updated pair

5. **Delete Key-Value Pair**:
   - Method: DELETE
   - URL: `http://localhost:3000/api/kv/test-key`
   - Expected: 204 No Content

6. **Error Cases**:
   - POST without key/value: 400 Bad Request
   - POST duplicate key: 400 Bad Request
   - GET non-existent key: 404 Not Found
   - PUT non-existent key: 404 Not Found
   - DELETE non-existent key: 404 Not Found

### Important Files Status:
- ✅ `src/models.js` - KV model defined with Sequelize
- ✅ `src/routes.js` - Complete RESTful API routes implemented
- ✅ `src/index.js` - Routes mounted at `/api` prefix

