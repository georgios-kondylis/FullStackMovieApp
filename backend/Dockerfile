# Dockerfile

# Use official Node.js 18 image as base
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose port (change to your app's port)
EXPOSE 5000

# Run your app
CMD ["node", "server.js"]
