FROM node:slim
 EXPOSE 1337

 RUN mkdir -p /usr/src/app
 WORKDIR /usr/src/app

 ARG NODE_ENV
 ENV NODE_ENV $NODE_ENV
 COPY package.json /usr/src/app/
 RUN yarn install && yarn cache clean
 COPY . /usr/src/app

 CMD [ "node", "src/server.js --host words-db-box" ]

