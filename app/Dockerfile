FROM node:latest
WORKDIR /app
COPY /app/package.json .
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install nodejs
RUN npm install
COPY /app .
EXPOSE 3000
CMD [ "npm", "start" ]
