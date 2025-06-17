FROM node:22-slim AS base

FROM base AS deps
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=secret,id=npmrc,target=/app/.npmrc pnpm fetch
COPY package.json ./
RUN pnpm install --offline --frozen-lockfile

FROM deps AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json vite.config.ts ./
COPY src/ ./src/
RUN pnpm run build

FROM base
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/.output

ENV NODE_ENV=production

CMD [".output/server/index.mjs"]
