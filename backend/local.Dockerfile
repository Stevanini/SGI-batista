FROM node:lts AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install --quite --no-optional --no-fund --loglevel=error
RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]