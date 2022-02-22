#pulls the official image
FROM node:16.5.0-alpine AS build

#sets the working dir
WORKDIR /usr/src/phantom-backend

#install all dependencies and copy needed files
COPY package.json package-lock.json ./
RUN npm install && npm run build

FROM node:16.5.0-alpine
COPY --from=build /usr/src/phantom-backend/dist ./dist
COPY --from=build /usr/src/phantom-backend/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "start"]
