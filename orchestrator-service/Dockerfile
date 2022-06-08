FROM node:14.18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3335

CMD ["npm", "run", "dev"]
