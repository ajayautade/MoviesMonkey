# Multi-stage Dockerfile for React app

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Accept API keys as build arguments
ARG REACT_APP_TMDB_API_KEY
ARG REACT_APP_OMDB_API_KEY
ENV REACT_APP_TMDB_API_KEY=$REACT_APP_TMDB_API_KEY
ENV REACT_APP_OMDB_API_KEY=$REACT_APP_OMDB_API_KEY

COPY package.json package-lock.json* ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
