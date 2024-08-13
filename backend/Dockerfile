FROM node:lts AS builder

WORKDIR /usr/src/app
COPY . .
COPY ./.env.development ./.env

RUN npm install --quite --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]