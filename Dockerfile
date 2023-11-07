FROM node:20 AS builder

WORKDIR /vault

COPY . .

RUN yarn

RUN yarn build

CMD [ "yarn", "start:dev" ]
