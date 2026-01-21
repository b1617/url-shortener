FROM node:20-alpine

WORKDIR /app/shared-types

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "watch"]
