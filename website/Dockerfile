FROM node:19.6.1

WORKDIR /website

COPY ../conexaopet-web/.env ./

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000