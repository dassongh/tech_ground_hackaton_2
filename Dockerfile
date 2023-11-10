FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 80

ENV NODE_ENV=production
ENV PORT=80

CMD ["npm", "start"]