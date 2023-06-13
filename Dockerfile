# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build
CMD ["npm", "run","start:dev"]
#docker build --tag nestjs-docker .
# docker run -p 8080:8080 -d nestjs-docker