
FROM node:22

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]