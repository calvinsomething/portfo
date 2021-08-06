FROM node:16-alpine3.14
RUN addgroup server && adduser -G server --system server
WORKDIR /app
COPY ./package*.json ./
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]