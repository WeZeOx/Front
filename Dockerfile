FROM node

WORKDIR /app/front

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]