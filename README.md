# Task Management API

## Requirements

- Node.js 18+
- A running MongoDB instance

## Setup

```bash
yarn install
cp .env.example .env   # then adjust values if needed
```

Environment variables:

| Variable      | Description                     | Default                                        |
| ------------- | ------------------------------- | ---------------------------------------------- |
| `PORT`        | HTTP port                       | `3000`                                         |
| `NODE_ENV`    | Runtime environment             | `development`                                  |
| `MONGODB_URI` | MongoDB connection string       | `mongodb://localhost:27017/task-api-intern`    |
| `LOG_LEVEL`   | Winston log level               | `info`                                         |

## Scripts

```bash
yarn dev            # run in watch mode with ts-node
yarn build          # compile TypeScript to dist/
yarn start          # run the compiled build
yarn seed           # insert sample users for testing
yarn lint           # run ESLint
yarn format         # format with Prettier
```

## Running

```bash
yarn seed     # optional: create sample users
yarn dev
```

- API base: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/docs`
- Health check: `http://localhost:3000/health`
