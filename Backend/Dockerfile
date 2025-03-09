# Use the official Bun image.
FROM oven/bun:latest

# Set working directory.
WORKDIR /app

# Copy dependency manifests.
COPY package.json bun.lock index.ts ./
COPY /src ./src

# Install dependencies with Bun.
RUN bun install

COPY node_modules/.prisma ./node_modules/.prisma

# Run microservice.
CMD ["bun", "start"]