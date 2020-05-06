FROM node:8.11.4

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

RUN yarn global add serve

EXPOSE 5000

CMD [ "serve", "-s", "build"]
