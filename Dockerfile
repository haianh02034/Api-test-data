FROM node:16.15-alpine

# Set a working directory
WORKDIR /usr/src/app

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

RUN npm install typescript -g
RUN npm i npmrc -g
RUN npm install pm2 -g
RUN npm install ts-node@10.9.1 -g

COPY package.json .
COPY package-lock.json .
COPY tsconfig.base.json .
COPY tsconfig.json .
COPY jest.config.ts .
COPY jest.preset.js .
COPY babel.config.json .

COPY nx.json .

RUN npm i --no-audit

COPY apps ./apps
COPY libs ./libs

COPY bin ./bin

RUN npm run build

RUN npm prune --production

RUN rm -rf ./apps
RUN rm -rf ./libs
RUN rm -rf ./bin