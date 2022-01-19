FROM node:13.12.0-alpine AS dependencies
WORKDIR /app
ENV \
  PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm ci --silent

FROM dependencies AS lint
COPY . .
RUN npm run lint

FROM dependencies AS format
COPY . .
RUN npm run format:check

FROM dependencies AS test
ENV CI=true
COPY . .
RUN npm test

FROM dependencies AS build
ARG ENVIR
COPY . .
RUN npm run build:$ENVIR

FROM nginx:stable-alpine AS final
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]