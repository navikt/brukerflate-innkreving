FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.12.1 --activate

FROM base AS prod

WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=secret,id=npmrc,target=/app/.npmrc pnpm fetch

COPY . .
RUN pnpm install --offline
RUN pnpm run build

FROM base
WORKDIR /app
COPY --from=prod /app/node_modules /app/node_modules
COPY --from=prod /app/.output /app/.output
COPY --from=prod /app/package.json /app/package.json

# Set environment to production
ENV NODE_ENV=production

CMD ["pnpm", "start"]
