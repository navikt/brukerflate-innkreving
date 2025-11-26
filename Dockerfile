# Use dev variant for building (includes npm, shell, package managers)
FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-dev AS base-dev

# Use production variant for runtime (minimal, no npm/shell)
FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22 AS base-prod

# Dependencies stage
FROM base-dev AS deps
WORKDIR /app

# Set up pnpm environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
USER root
RUN corepack enable
USER node

# Copy package manager files first for better caching
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc.template ./

# Handle GitHub token substitution and fetch dependencies
RUN --mount=type=secret,id=github_npm_token,env=GITHUB_NPM_TOKEN \
    sed "s/<YOUR_GITHUB_TOKEN>/${GITHUB_NPM_TOKEN}/g" .npmrc.template > .npmrc && \
    pnpm fetch

# Copy package.json and install dependencies
COPY package.json ./
RUN pnpm install --offline --frozen-lockfile

# Build stage
FROM base-dev AS build
WORKDIR /app

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy build configuration and source code
COPY package.json tsconfig.json vite.config.ts ./
COPY src/ ./src/

# Build the application
RUN pnpm run build

FROM base-dev AS srvx-install
WORKDIR /srvx
RUN npm install srvx@0.9.6

# Production stage - use minimal production image
FROM base-prod AS production
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

COPY --from=srvx-install /srvx/node_modules /app/node_modules

# Copy built application (both server and client)
COPY --from=build /app/dist /app/dist

# Expose port 3000 (default for srvx)
EXPOSE 3000

# Use non-root user for security
USER node

CMD ["node_modules/.bin/srvx", "--prod", "-s", "dist/client", "dist/server/server.js"]
