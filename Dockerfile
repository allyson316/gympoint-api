FROM node:10.17.0-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN npm cache verify && \
  yarn --silent --progress=false --production

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
