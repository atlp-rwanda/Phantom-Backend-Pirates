# pulls the official image
FROM node:16.5.0-alpine

# sets the working dir & set ownership on them to a node user
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app

# install all dependencies and copy needed files
COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["node", "src/app.js"]
