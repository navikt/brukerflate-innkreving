# Build stage
FROM node:22 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage using distroless
FROM gcr.io/distroless/nodejs22-debian12 AS run

WORKDIR /app

# Copy the build output directories
COPY --from=build /app/.output ./.output
COPY --from=build /app/.vinxi ./.vinxi
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Set environment to production
ENV NODE_ENV=production

# Command to run the application directly
CMD [".output/server/index.mjs"]
