# Build stage
FROM node:lts-alpine AS build
WORKDIR /app

# Define build argument (ARG)
ARG API_URL="https://api.smd-karlsruhe.de"
ARG PR_NUMBER=""

# Set environment variable (optional for runtime)
ENV VITE_API_URL=$API_URL
ENV VITE_PR_NUMBER=$PR_NUMBER

# Copy package.json and install dependencies
COPY ./package*.json ./
RUN npm install

# Copy all source files
COPY . .


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

