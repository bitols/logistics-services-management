FROM node:14.18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3331

CMD ["npm", "run", "dev"]
