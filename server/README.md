## Prisma commands

> [!IMPORTANT]
> All these commands should be only run on development environment.

```sh
# Seed the database
pnpm prisma:seed

# Generate/update the Prisma client
pnpm prisma generate

# Create migration files and apply them
pnpm prisma migrate dev

# Reset the database
pnpm prisma migrate reset
```

> [!IMPORTANT]
> This is the only production command.

```sh
# Apply migrations.
pnpm prisma migrate deploy
```

## PM2 commands

```sh
# Start the application
pm2 start ecosystem.config.js

# Stop the application
pm2 stop ecosystem.config.js

# Restart the application
pm2 restart ecosystem.config.js

# Delete the application
pm2 delete ecosystem.config.js

# List all running applications
pm2 list
```
