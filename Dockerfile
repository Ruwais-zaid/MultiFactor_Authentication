# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app


# Install the dependencies
RUN npm install

# Copy everything from the server folder to /app in the container
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["npm","run","dev"]
