FROM node:24.7-bookworm

WORKDIR /app

COPY . ./source/

SHELL ["/usr/bin/bash", "-c"]

WORKDIR ./source

RUN yarn --production 
RUN yarn build 
RUN mv ./.output/* ../

WORKDIR /app

RUN rm -rf ./source

EXPOSE 3000

CMD ["node", "./server/index.mjs"]