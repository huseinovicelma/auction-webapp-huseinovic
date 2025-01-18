# Usa l'immagine di Node.js più recente
FROM node:latest

# Crea la cartella /var/www per la tua app
RUN mkdir -p /var/www
WORKDIR /var/www

# Copia il package.json e installa le dipendenze (frontend e backend)
COPY package.json /var/www
RUN npm install

# Copia il file webpack.config.js e i file frontend (ad esempio .vue)
COPY ./webpack.config.js /var/www
COPY ./frontend /var/www/frontend

# Compila il progetto frontend con Webpack
RUN npm run build
# Copia i file rimanenti dell'app (backend)
COPY ./ /var/www

# Espone la porta per il server Node.js
EXPOSE 3000

# Comando per avviare il backend
CMD [ "node", "backend/app.js" ]
