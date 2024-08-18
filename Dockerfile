FROM node:18-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV DATABASE_URL="file:./dev.db"

CMD ["npm", "run", "start:prod"]