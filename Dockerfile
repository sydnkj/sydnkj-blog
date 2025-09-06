FROM node:24.2-alpine

WORKDIR /app

COPY . .

RUN yarn config set registry https://registry.npmmirror.com \
    && yarn \
    && yarn build \

CMD ["node", ".output/server/index.mjs"]