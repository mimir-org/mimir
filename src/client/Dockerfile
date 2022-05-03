FROM node:16.14.0-alpine AS base
ARG MIMIR_VERSION=2.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .

FROM base as lint
RUN npm run lint

FROM base as format
RUN npm run format:check

FROM base as test
ENV CI=true
RUN npm test

FROM base as build
RUN npm run build

FROM nginx:1.21-alpine AS final
ARG MIMIR_VERSION
ENV MIMIR_ENV_MIMIR_VERSION=$MIMIR_VERSION
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh .
RUN chmod +x start.sh
EXPOSE 80
ENTRYPOINT "./start.sh" "MIMIR_ENV" "__MIMIR_ENV__" "/usr/share/nginx/html/index.html"