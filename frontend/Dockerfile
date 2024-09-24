# Build stage
FROM node:lts-alpine AS build
WORKDIR /app

# Accept a build argument for the API URL (or any other variable)
ARG APP_URL="https://api.smd-karlsruhe.de"

# Copy package.json and install dependencies
COPY ./package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Replace the placeholder URL in your source files during build time
RUN sed -i "s|https://api.smd-karlsruhe.de|${APP_URL}|g" src/**/*.js

# Build the application
RUN npm run build

# Production stage
FROM node:lts-alpine AS production

# Copy built application and essential files from build stage
COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .

# Install production dependencies
RUN npm ci --omit dev

EXPOSE 3000

CMD ["node", "."]

