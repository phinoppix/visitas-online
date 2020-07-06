FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
EXPOSE 4000

CMD ["npm", "start"]
