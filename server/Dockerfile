FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

RUN addgroup -g 1001 -S nodejs && adduser -S appuser -u 1001 -G nodejs

USER appuser

EXPOSE 5000

CMD ["npm", "start"]