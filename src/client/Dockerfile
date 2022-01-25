FROM node:13.12.0-alpine AS base
WORKDIR /app
ARG ENVIR
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
RUN npm run build:$ENVIR

FROM nginx:stable-alpine AS final
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh .
EXPOSE 80
ENTRYPOINT "./start.sh" "MIMIR_ENV" "__MIMIR_ENV__" "/usr/share/nginx/html/index.html"