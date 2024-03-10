FROM node:19.6.1

WORKDIR /website

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000