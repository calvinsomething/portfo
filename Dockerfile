FROM node:16-alpine3.14
RUN addgroup server && adduser -G server --system server
USER server
RUN mkdir /home/server/app
WORKDIR /home/server/app
COPY --chown=server:server package*.json ./
RUN npm install --only=prod
EXPOSE 5000
CMD ["npm", "start"]
