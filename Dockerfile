# Step 1: Build Stage
FROM node:18 AS builder
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy project files and build
COPY . .
RUN yarn build

# Step 2: Production Stage
FROM node:18
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Expose port and run the app
EXPOSE 3000
CMD ["node", "dist/main"]
