FROM node:0.10-onbuild

RUN npm install -g gulp

WORKDIR /usr/src/app

CMD gulp
