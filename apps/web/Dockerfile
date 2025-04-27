# #############################################################################
#                            🏗️  BASE STAGE
# #############################################################################
# - Sets up foundational Node.js environment
# - Configures PNPM and CI settings
# - Prepares build environment
# #############################################################################
FROM node:22.14.0-alpine AS base

ARG PACKAGE_NAME
ARG CI
ARG TURBO_TEAM
ARG TURBO_TOKEN
ARG DO_NOT_TRACK

ENV CI=${CI}
ENV DO_NOT_TRACK=${DO_NOT_TRACK}
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk update && \
  apk add --no-cache libc6-compat && \
  [ "$CI" != "true" ] && npm config set registry https://registry.npmmirror.com || true

RUN npm install -g pnpm

# #############################################################################
#                         ✂️  PRUNER STAGE
# #############################################################################
# - Uses turbo prune to optimize workspace
# - Creates lean dependency tree
# - Reduces final image size
# #############################################################################
FROM base AS pruner

WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune $PACKAGE_NAME --docker

# #############################################################################
#                         🔨 BUILDER STAGE
# #############################################################################
# - Installs production dependencies
# - Builds application artifacts
# - Prepares for final deployment
# #############################################################################
FROM base AS builder

ENV TURBO_TEAM=${TURBO_TEAM}
ENV TURBO_TOKEN=${TURBO_TOKEN}

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=pruner /app/scripts ./scripts
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm run build

# #############################################################################
#                         🚀 RUNNER STAGE
# #############################################################################
# - Production-optimized final image
# - Uses unprivileged nginx user
# - Contains only runtime essentials
# - Ready for deployment
# #############################################################################
FROM nginxinc/nginx-unprivileged:1.26.3-alpine AS runner

COPY --from=pruner --chown=nginx:nginx /app/apps/web/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=pruner --chown=nginx:nginx /app/apps/web/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=builder --chown=nginx:nginx /app/apps/web/dist/ .

EXPOSE 80 443 8080 4433
