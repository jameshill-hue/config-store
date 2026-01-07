# Development stage: Used for local development with hot-reload
FROM node:22-alpine AS development

WORKDIR /app
# Copy package files first for better Docker layer caching
COPY package*.json .
# Install all dependencies (including dev dependencies like nodemon)
RUN npm ci
# Copy source code
COPY src src
# Run development server with nodemon for auto-reload
CMD ["npm", "run", "dev"]

# Production dependencies stage: Install only production dependencies
FROM node:22-alpine AS prod-dependencies

WORKDIR /app
COPY package*.json .
# Install only production dependencies (excludes dev dependencies)
RUN npm ci --only=production

# Production stage: Minimal distroless image for security and size
FROM gcr.io/distroless/nodejs22 AS production

WORKDIR /app
# Copy production node_modules from previous stage
COPY --from=prod-dependencies /app/node_modules node_modules
# Copy source code
COPY src src
# Run the application directly (no shell, minimal attack surface)
CMD ["src/index.js"]