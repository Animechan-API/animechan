# Contribution guidelines

### Pre-requisites

> Assuming that [Node.js](https://nodejs.org/en/download/) is already installed.

- [MongoDB](https://www.mongodb.com/docs/manual/installation/) : NoSQL database
- [Mongosh](https://www.mongodb.com/docs/mongodb-shell/install/) : MongoDB shell
- [Pnpm](https://pnpm.io/installation) : Package manager (optional but recommended)

### Setup

1. Install the dependencies.

> This will install all the dependencies for both the backend and the frontend

```bash
pnpm install:all
```

2. Make sure your MongoDB server is running.

> This is for linux systems only. For windows, please refer to the official documentation.

```bash
# Start the server
sudo systemctl start mongod

# Check the status
sudo systemctl status mongod
```

2. Seed the database with test data.

> You can find the initial seed data in `backend/scripts/test-data.json`. \
> If needed you can also modify this file to add more data for testing purposes.

```bash
pnpm backend:seed
```

3. Start the application.

> This will start both the backend and the frontend servers in development mode concurrently.

```bash
pnpm start:dev
```

> If you want to start the backend and the frontend servers separately, you can use the following commands.

```bash
# Start the backend server
pnpm backend:dev

# Start the frontend server
pnpm frontend:dev
```
