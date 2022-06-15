FROM nginx:1.22.0-alpine

WORKDIR /app

COPY . .

RUN apk add npm
RUN npm i
RUN npm run build

RUN CP -r dist/. /usr/share/nginx/html