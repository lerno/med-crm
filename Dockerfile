FROM node:8.9.4-alpine

RUN apk add --update \
util-linux

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

CMD npm start
