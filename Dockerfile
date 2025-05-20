# Build stage
FROM node:22 AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Set up npm to use GitHub Packages
RUN --mount=type=secret,id=node_auth_token,env=NODE_AUTH_TOKEN
RUN echo '@navikt:registry=https://npm.pkg.github.com' > .npmrc && \
    echo '//npm.pkg.github.com/:_authToken=$NODE_AUTH_TOKEN' >> .npmrc

# Install dependencies
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
