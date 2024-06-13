# Stage 1: Build the Angular app
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copiar a configuração do Nginx para o diretório de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/angular-app /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
