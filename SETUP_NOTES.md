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

