FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22 AS base

FROM base AS deps
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc.template ./
RUN --mount=type=secret,id=github_npm_token,env=GITHUB_NPM_TOKEN \
    sed "s/<YOUR_GITHUB_TOKEN>/${GITHUB_NPM_TOKEN}/g" .npmrc.template > .npmrc && \
    pnpm fetch
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
