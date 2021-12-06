# syntax=docker/dockerfile:1.3

FROM node:13.12.0-alpine as build
ARG ENVIR
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN apk add --update python make g++\ && rm -rf /var/cache/apk/*
RUN npm install react-scripts@4.0.1 -g --silent
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build:$ENVIR

FROM nginx:stable-alpine as final
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
