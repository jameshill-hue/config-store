# Config Store - Setup Notes
## Helm Course - Section Overview

### Project Overview
- **Project Name**: `config-store`
- **Purpose**: Key-Value Store API (Helm course optional exercise)
- **Repository**: `https://github.com/jameshill-hue/config-store`

---

## What Has Been Set Up

### 1. **GitHub Repository**
- Created new repository: `jameshill-hue/config-store`
- Repository URL configured in `package.json`
- Note: Local git repository not yet initialized (as shown in terminal)

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
1. Initialize git repository locally
2. Create application code in `src/` directory
3. Configure Dockerfile for Node.js application
4. Set up Docker Compose with PostgreSQL service
5. Create database models using Sequelize
6. Implement API endpoints for key-value operations

### Important Files Status:
- ✅ `package.json` - Configured with dependencies
- ✅ `.dockerignore` - Configured
- ⏳ `dockerfile` - Created but empty (needs configuration)
- ⏳ `compose.yaml` - Created but empty (needs configuration)
- ⏳ `src/` - Directory created but empty (needs application code)
- ⏳ Git repository - Not initialized locally yet

---

## Technical Stack Summary
- **Runtime**: Node.js (CommonJS)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Containerization**: Docker + Docker Compose
- **Development**: nodemon for hot-reloading

