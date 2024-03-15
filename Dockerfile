## Use an official Node runtime as a parent image
#FROM node:18-alpine AS deps
#
## Set the working directory in the container
#WORKDIR /app
#
## Copy package.json and package-lock.json to the working directory
#COPY package.json package-lock.json ./
#
## Install any needed packages specified in package.json
#RUN npm install
#
## Bundle app source inside Docker image
#COPY . .
#
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD npm run dev