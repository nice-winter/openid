# template-turborepo-vue [![CI](https://github.com/nice-winter/template-turborepo-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/nice-winter/template-turborepo-vue/actions/workflows/ci.yml) [![Publish GitHub Container Registry](https://github.com/nice-winter/template-turborepo-vue/actions/workflows/publish-docker.yml/badge.svg)](https://github.com/nice-winter/template-turborepo-vue/actions/workflows/publish-docker.yml)

A monorepo project template managed with Turborepo, including both web and server applications.

## Using this example

Run the following command:

```sh
npx degit https://github.com/nice-winter/template-turborepo-vue.git my-turborepo
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

#### apps:

- `web`: A [Vue 3](https://vuejs.org/) app with [Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/), and [Nuxt UI](https://ui.nuxt.com/)
- `server`: A simple [Fastify](https://fastify.dev/)-powered server that exposes APIs for the web app

#### packages:

- `ui`: a stub Vue component library shared by both `web` and other Vue3-based applications
- `eslint-config`: shared ESLint configuration used across projects
- `tsconfig`: shared tsconfig.json configurations used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Docker Compose

This project also supports building applications under the `apps/` directory using Docker Compose.
A complete CI/CD workflow has been set up based on GitHub Actions, covering testing, bundling, building, and publishing Docker images.

For more details, see: [Docker Compose](#docker-compose-1).

## Develop and Build

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

See [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching).

## Docker Compose

We all know that deploying a project quickly and properly is one of the hardest — and most frustrating — challenges in the industry.
That's why this project comes with a complete CI/CD workflow powered by GitHub Actions and Docker Compose.
The best part? You can start coding right away without worrying about all those painful deployment issues!

### Build Images

Simply run `docker compose build` and the build process will start!

```
docker compose build
```

### Start or Stop the Container

Once the image has been built, run the following command to start the container immediately:

```
docker compose up -d
```

To stop and remove the running container:

```
docker compose down
```

## License

[MIT License](LICENSE)
