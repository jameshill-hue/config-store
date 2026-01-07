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
- ✅ `package.json` - Configured with dependencies
- ✅ `.dockerignore` - Configured (excludes node_modules and .env*)
- ✅ Git repository - Already cloned and initialized (on main branch)
- ⏳ `dockerfile` - Created but empty (needs configuration)
- ⏳ `compose.yaml` - Created but empty (needs configuration)
- ⏳ `src/` - Directory created but empty (needs application code)

---

## Technical Stack Summary
- **Runtime**: Node.js (CommonJS)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Containerization**: Docker + Docker Compose
- **Development**: nodemon for hot-reloading

