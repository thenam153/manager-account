FROM node:14.8

WORKDIR /app
COPY . /app

RUN npm install

CMD node app.js
EXPOSE 3000
