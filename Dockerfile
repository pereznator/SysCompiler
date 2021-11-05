FROM node:14.17.2

RUN mkdir -p /proyecto/back

WORKDIR /proyecto/back

COPY back/package*.json ./

RUN npm install

COPY back/build .

COPY back/src .

EXPOSE 3000

CMD ["npm", "run", "dev"]