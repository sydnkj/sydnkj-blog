FROM node:24.2-alpine

WORKDIR /app

COPY . .

RUN yarn && yarn build 

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]