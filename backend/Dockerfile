# this dockerfile does not automatically update. 
# Instead the packages need to be made manually 
# (and applied to the go.mod, go.sum). 

# Stage 1: Build the Go (pocketbase) binary 
FROM golang:latest AS builder

# Set working directory
WORKDIR /pb

# Copy go modules and download them
COPY go.mod go.sum ./
RUN go mod download

# Copy rest of the app
COPY . .

# Build your Go app
RUN CGO_ENABLED=0 GOOS=linux go build -o pocketbase .

# Stage 2: Create a minimal image
FROM alpine:latest

# Set working directory
WORKDIR /pb

# Copy built binary from builder
COPY . .
# Remove everything except HTML files
RUN find . -type f ! -name '*.html' -delete
# COPY binary
COPY --from=builder /pb/pocketbase .

# Copy database from build stage
COPY --from=builder /pb/pb_data ./pb_data 

# Optionally, if you want to keep data persistent (set mount point)
VOLUME /pb/pb_data

# Expose the port PocketBase runs on
EXPOSE 8090

# Run the app
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
