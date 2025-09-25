#!/bin/sh

# this is a docker script for build project image, please don't exec this script in other enviroment!!!

echo $TZ > /etc/timezone
cd source
yarn
yarn build
yarn cache clean --all
mv .output/* /app/
cd /app
rm -rf ./source