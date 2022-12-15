# specify the node base image with your desired version node:<version>
FROM node:16
# replace this with your application's default port
RUN mkdir -p /bot
WORKDIR /bot
RUN npm install discord.js
COPY . .
CMD ["node", "app.js"]