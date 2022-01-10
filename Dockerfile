# Telling Docker the version of node we want to build the image from
FROM node:14 

# Working Directory. Holds the application code inside the image
WORKDIR /app

# optional: set up env variables (differentiate between envs, sharing urls, etc...)
# ENV NODE_ENV=stage
ENV NODE_ENV=production

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source code inside the Docker image 
#  (tells Docker to copy everything at node_aws root-level into the root-level of the new image that's inside the container)
COPY . .

# (for production) globally installs pm2 inside the container (manage production-level node apps)
RUN npm install -g pm2

# instruction to have the port mapped by the docker daemon
EXPOSE 5000

# Define the command that will be used to start the server
# stage: CMD [ "node", "server.js" ] 
CMD [ "pm2-runtime", "server.js" ]