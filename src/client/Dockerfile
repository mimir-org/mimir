# syntax=docker/dockerfile:1.3
# build environment
# base image
FROM node:13.12.0-alpine as build
ARG ENVIR
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN apk add --update python make g++\ && rm -rf /var/cache/apk/*
RUN npm ci --silent
RUN npm install react-scripts@4.0.1 -g --silent
COPY . ./
RUN npm run build:$ENVIR
# production environment
FROM nginx:stable-alpine as final
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
