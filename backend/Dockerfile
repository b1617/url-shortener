FROM node:20-alpine

WORKDIR /app/backend

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
