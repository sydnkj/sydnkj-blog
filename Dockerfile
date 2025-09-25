FROM node:24.8-trixie-slim

ENV TZ=Asia/Shanghai

WORKDIR /app

COPY . ./source/

RUN bash ./source/scripts/build.sh  

EXPOSE 3000

CMD ["node", "./server/index.mjs"]