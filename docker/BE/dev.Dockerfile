FROM node:lts AS builder

WORKDIR /usr/src/app

COPY . .
COPY .env.docker ./.env

RUN npm install --quite --no-optional --no-fund --loglevel=error
RUN npm run build

CMD ["npm", "run", "start:dev"]