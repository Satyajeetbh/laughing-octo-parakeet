FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy server code
COPY . .

EXPOSE 5000

# Start server
CMD ["npm", "start"]
