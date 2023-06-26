# Stage 1 - Build Angular App
FROM node:16 as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

# Stage 2 - Serve Angular App via Nginx
FROM nginx:alpine
COPY --from=build /app/dist/my-planet-ui /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
