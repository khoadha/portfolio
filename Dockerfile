# Build Stage
FROM node:19-alpine AS angular

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Serve Angular using Nginx
FROM nginx:alpine
COPY --from=angular /app/docs/browser /usr/share/nginx/html

# Expose port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]