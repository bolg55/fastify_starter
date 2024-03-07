# Fastify Starter project 🚀🖥️

This is a starter project for building APIs with Fastify. It comes preconfigured with some of the most popular plugins and services, including Redis, Supertokens, NeonDB, and more.

This project is designed to be a starting point for building APIs with Fastify. It comes with a folder structure and configuration that is designed to be easy to understand and modify.

> [!WARNING]
> **Front end is not production ready.**
> The front end is not production ready and is only meant for testing the API. You should build your own front end for production.

## New - React frontend for testing

I've added a new React frontend for testing the API. You can find it in the `frontend` folder. It is a simple react app built with vite and SWC.

The front end allows you to sign in, view protected routes, update profile name, sign out, and make a payment using Stripe.

> [!NOTE]
> The `Pricing` page persists state on redirect to the Stripe checkout page. This is done using local storage. You should use a more secure method in production, such as a state manager like zustand, jotai etc.

## NEW - TanStack

I have refactored some of the frontend code to use the Tanstack, specifically Tanstack Query, formerly known as React Query, and Tanstack Router (v1). This is a powerful data fetching library, and router that makes it easy to fetch, cache, and update data in your React applications. It is designed to be easy to use and easy to understand, and is a great fit for this project.

> [!IMPORTANT]
> If you do not deploy your backend to a live server, you will need to use something like [ngrok](https://ngrok.com/) to expose your local server to the internet so that the frontend can communicate with it when testing the Stripe integration.

## Core features

- [x] Fastify
- [x] Drizzle ORM
- [x] CORS
- [x] Helmet
- [x] Swagger Docs
- [x] Redis cache (via Upstash)
- [x] Auth (via Supertokens)
- [x] Neon Database (PostgreSQL)
- [x] Stripe integration
- [x] React with Vite
- [x] Tanstack Query
- [x] Tanstack Router

### Folder structure

The folder structure is designed to be easy to understand and modify. It is designed to be modular and easy to scale.

```markdown
fastify-starter
├── frontend
│ ├── public
│ ├── src
│ │ ├── assets
│ │ ├── components
│ │ ├── hooks
│ │ └── utils
│ ├── .env.example
│ ├── tailwind.config.js
│ └── vite.config.ts
│
├── fastify
│ ├── migrations
│ ├── src
│ │ ├── config
│ │ ├── controllers
│ │ ├── db
│ │ ├── middlewares
│ │ ├── models
│ │ ├── plugins/...
│ │ ├── registration
│ │ ├── routes
│ │ ├── schemas
│ │ ├── services
│ │ ├── utils
│ │ └── main.ts
│ ├── .env.example
│ ├── drizzle.config.ts
│ ├── tsconfig.json
│ └── custom.d.ts
```

### Configuration

Included is a `.env.example` file which you can use to create your own `.env` file to store your environment variables.

In the `src/config` folder, you can find the `env.ts` file which is used to validate the variable type using [zod](https://www.npmjs.com/package/zod) and [zennv](https://www.npmjs.com/package/zennv).

You can remove any of the variables from the schema validation if you don't need them.

> [!TIP]
> You will still need to add your environment variables to your .env file.
> This takes the place of using traditional dotenv and `process.env` to access environment variables. If you do not care about validation and would prefer not to use this, you can remove the `env.ts` file and use `dotenv` instead. You will just need to find and replace anywhere that uses `env` with `process.env`.

## Drizzle ORM

This starter project comes preconfigured with [Drizzle ORM](https://orm.drizzle.team/). Drizzle is a modern, type-safe, and easy-to-use ORM for TypeScript. Using Drizzle you can define & manage database schemas in TypeScript, access your data in a SQL-like or relational way, and take advantage of opt in tools to push your developer experience through the roof.

If you know SQL, you know Drizzle.

## Core plugins

### Redis

This starter project is preconfigured to use [Upstash](https://upstash.com/) as a serverless Redis cache. You can change the redis configuration if you'd like to use a different provider or your own server. To change the redis configuration, you can modify the `src/plugins/redis.ts` file.

Redis has also been added directly to the fastify instance, so you can access it from your routes, controllers, and services.

```typescript
// src/routes/example.ts
import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/example', async (request, reply) => {
    const cache = await fastify.redis.get('example');
    if (cache) {
      return JSON.parse(cache);
    }

    const data = { example: 'data' };
    await fastify.redis.set('example', JSON.stringify(data), 'EX', 60);
    return data;
  });
}
```

### Swagger docs

This starter project comes preconfigured with Swagger Docs. You can access the docs at `/docs` when you run the server. Each route is documented with the parameters, responses, and more. You can modify the configuration in the `src/plugins/swagger.ts` file.

### Cors

This starter project comes preconfigured with CORS. You can modify the configuration in the `src/plugins/cors.ts` file. The configuration is set to work with supertokens by default.

### Helmet

This starter project comes preconfigured with Helmet. You can modify the configuration in the `src/plugins/helmet.ts` file.

### Auth via Supertokens

This starter project comes preconfigured with [Supertokens](https://supertokens.com/). Supertokens is a secure, open-source and easy to use authentication and session management solution. The hosted version of supertokens is used in this starter project, and allows up to 5000 users. Supertokens also offer a self-hosted version for larger projects, as well as user management, multi-tenancy, and more.

Some of the features of Supertokens include:

- Passwordless authentication
- Email verification (Magic links)
- Session management
- JWT
- OAuth
- Social login
- Multi-factor authentication
- And more

You can sign up for a free account at [supertokens.com](https://supertokens.com/). You can modify the configuration in the `src/plugins/auth.ts` file.

### Neon database

This starter project comes preconfigured with [Neon](https://neon.tech/). Neon is a serverless, globally distributed, and highly scalable postgres database. It is designed to be a drop-in replacement for traditional SQL databases, and is built on top of the PostgreSQL protocol. NeonDB is designed to be a fully managed, serverless, and globally distributed database that is easy to use and scales automatically.

You can sign up for a free account at [neon.tech](https://neon.tech/).

#### Migration scripts

Using `drizzle-kit` you can easily migrate your database schema. Provided are the following scripts in the `package.json` file:

```json
"migration:generate": "drizzle-kit generate:pg --config=drizzle.config.ts",
"migration:push": "node -r esbuild-register src/db/migrate.ts",
"migrate": "drizzle-kit generate:pg --config=drizzle.config.ts && node -r esbuild-register src/db/migrate.ts"
```

You can run the migration script using the following command:

```zsh
pnpm run migrate
```

### Stripe integration

Stripe is a popular payment gateway that allows you to accept payments online. This starter project comes preconfigured with Stripe, allowing for both one-time and recurring payments as well as subscription management and webhooks.

## 🤓 Getting started

>[!TIP]
> If you would rather use npm or yarn:
> 1. Delete the `node_modules` folder and the `pnpm-lock.yaml` file. You can do this by running `rm -rf node_modules pnpm-lock.yaml` in your terminal.
> 2. Run `yarn` or `npm i` to install dependencies, create new `node_modules` folder and new `*.lock` file   

1. Clone the repo
2. Run `pnpm install` to install required dependencies
3. Create a `.env` file using the `.env.example` file as a template
4. Run `pnpm run migrate` to create the database schema
5. Run `pnpm run dev` to start the server in development mode

# Required environment variables

## Frontend

```env
VITE_API_DOMAIN=<'get from API'>
VITE_WEBSITE_DOMAIN=<'update with your domain'>

# GET FROM STRIPE
VITE_STRIPE_PUBLIC_KEY="CHANGE_ME"

# Product Price IDs (FROM STRIPE)
VITE_PRODUCT_STARTER="price_CHANGE_ME"
VITE_PRODUCT_PRO="price_CHANGE_ME"
VITE_PRODUCT_ENTERPRISE="price_CHANGE_ME"
```

## Backend

```env
NODE_ENV= 'development'

DATABASE_CONNECTION= '<database connection string from Neon>'

UPSTASH_REDIS_REST_URL= 'https://<get from upstash>'
UPSTASH_REDIS_REST_TOKEN= '<get from upstash>'

STRIPE_SECRET_KEY= '<get from stripe>'
STRIPE_PUBLIC_KEY= '<get from stripe>'
STRIPE_WEBHOOK_SECRET= '<get from stripe>'

SUPERTOKENS_CONNECTION_URI= '<get from supertokens>'
SUPERTOKENS_API_KEY= '<get from supertokens>'

API_DOMAIN= 'http://localhost:8080'
WEBSITE_DOMAIN= 'http://localhost:5173'
```

## 🤝 Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request. You can also submit an issue if you find a bug or have a feature request.

## 💚 Support

If you need help with this project, you can reach out to me on Twitter at [@kellenbolger](https://twitter.com/kellenbolger).

## License

MIT
