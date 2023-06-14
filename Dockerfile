FROM node:16.19.0-alpine

COPY package.json ./
COPY tsconfig.json ./
COPY server ./server
COPY .env ./.env
RUN yarn install
RUN yarn build

RUN ls
EXPOSE 4000

CMD [ "npm", "start" ]
