FROM node:24.7-alpine

WORKDIR /app

COPY . ./source/

RUN cd ./source ; yarn --production ; yarn build ; mv ./.output/* ../ ; cd .. ; rm -rf ./source ; yarn cache clean

EXPOSE 3000

CMD ["node", "./server/index.mjs"]