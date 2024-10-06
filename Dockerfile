# Use an official Node.js runtime as the base image
FROM node:20

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
