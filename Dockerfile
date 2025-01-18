FROM node:latest 
RUN mkdir -p /var/www
WORKDIR /var/www
COPY package.json /var/www
RUN npm install
COPY ./ /var/www
EXPOSE 3000
CMD [ "node", "backend/app.js" ]


