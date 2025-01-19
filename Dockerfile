
FROM node:latest

RUN mkdir -p /var/www
WORKDIR /var/www

COPY package.json /var/www
RUN npm install

COPY ./webpack.config.js /var/www
COPY ./client /var/www/client

RUN npm run build

COPY ./ /var/www

EXPOSE 3000

CMD [ "node", "server/app.js" ]
