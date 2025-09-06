FROM node:24.7-alpine

WORKDIR /app

COPY . ./source/

WORKDIR ./source

RUN yarn --production 
RUN yarn build 
RUN mv ./.output/* ../

WORKDIR /app

RUN rm -rf ./source

EXPOSE 3000

CMD ["node", "./server/index.mjs"]