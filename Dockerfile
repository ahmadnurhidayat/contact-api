# Use the official Node.js 14 Alpine image as a base
FROM node:20-alpine

ENV CONNECTION_STRING="mongodb+srv://hidayatahmad:H!d4y4t4hm4d@ahmadcluster.msmj41z.mongodb.net/my-contact-backend?authMechanism=SCRAM-SHA-1"
ENV JWT_SECRET="rahasia"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json .

# Install only production dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Set the default command to run the app
CMD ["pnpm", "start"]