# ##############################################################################
#                            🏗️  BASE STAGE
# ##############################################################################
# - Sets up foundational Node.js + Alpine environment
# - Configures system dependencies
# - Optional: Sets npm registry for non-CI environments
# ##############################################################################
FROM node:22.14.0-alpine AS base

ARG PACKAGE_NAME
ARG CI
ARG TURBO_TEAM
ARG TURBO_TOKEN
ARG DO_NOT_TRACK

RUN apk update && \
  apk add --no-cache libc6-compat && \
  [ "$CI" != "true" ] && npm config set registry https://registry.npmmirror.com || true

# ##############################################################################
#                         📦 PNPM SETUP STAGE
# ##############################################################################
# - Installs pnpm globally
# - Configures pnpm environment variables
# - Prepares for turbo workspace pruning
# ##############################################################################
FROM base AS base-with-pnpm

ENV CI=${CI}
ENV DO_NOT_TRACK=${DO_NOT_TRACK}
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm

# ##############################################################################
#                         ✂️  PRUNER STAGE
# ##############################################################################
# - Uses turbo prune to optimize monorepo structure
# - Creates lean workspace for Docker deployment
# - Reduces final image size significantly
# ##############################################################################
FROM base-with-pnpm AS pruner

WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune $PACKAGE_NAME --docker

# ##############################################################################
#                         🔨 BUILDER STAGE
# ##############################################################################
# - Installs production dependencies
# - Builds application artifacts
# - Performs cleanup to minimize layer size
# ##############################################################################
FROM base-with-pnpm AS builder

ENV TURBO_TEAM=${TURBO_TEAM}
ENV TURBO_TOKEN=${TURBO_TOKEN}

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=pruner /app/scripts ./scripts
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm run build

RUN find . -type d \( -name node_modules -o -name src \) -prune -exec rm -rf '{}' +

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install -P && \
  rm -rf ./scripts

# ##############################################################################
#                         🚀 RUNNER STAGE
# ##############################################################################
# - Final production-optimized image
# - Runs as non-root 'node' user for security
# - Contains only runtime essentials
# ##############################################################################
FROM base AS runner

USER node

WORKDIR /app

COPY --from=builder --chown=node:node /app .

ENTRYPOINT ["node", "apps/server/dist/index.js"]

EXPOSE 5183
