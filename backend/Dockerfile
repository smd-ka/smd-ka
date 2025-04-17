# Stage 1: Build the Go binary
FROM golang:latest AS builder

# Set working directory
WORKDIR /app

# Copy go modules and download them
COPY go.mod go.sum ./
RUN go mod download

# Copy rest of the app
COPY . .

# Build your Go app
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

# Stage 2: Create a minimal image
FROM alpine:latest

# Set working directory
WORKDIR /app

# Copy built binary from builder
COPY --from=builder /app/app .

# Copy database from build stage
COPY --from=builder /app/pb_data ./pb_data 
# Optionally, if you want to keep data persistent (set mount point)
VOLUME /app/pb_data

# Expose the port PocketBase runs on
EXPOSE 8090

# Run the app
CMD ["./app", "serve", "--http=0.0.0.0:8090"]
