FROM node:slim
 EXPOSE 1337

 RUN mkdir -p /usr/src/app
 WORKDIR /usr/src/app

 ARG NODE_ENV
 ENV NODE_ENV $NODE_ENV
 COPY . /usr/src/app/
 RUN yarn install && yarn cache clean
 RUN yarn global add knex

CMD [ "node", "src/server.js" ]
