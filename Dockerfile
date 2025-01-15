FROM node:latest
RUN mkdir -p /var/www
WORKDIR /var/www
COPY ./app/package.json /var/www
RUN npm install
COPY . /var/www
RUN npm install -g nodemon
EXPOSE 3000
CMD ["npx", "nodemon", "--watch", ".", "-e", "js", "./app/app.js"]
#CMD ["node", "./server/app.js"]