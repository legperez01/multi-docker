FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install nodemon --save-dev
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
