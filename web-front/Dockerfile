FROM node:14.18-alpine  AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=my-app-build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=my-app-build /app/dist/web-front /usr/share/nginx/html

EXPOSE 8081
