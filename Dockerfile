FROM node:10 as builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.15
COPY --from=builder /app/build/ /usr/share/nginx/html
EXPOSE 80
COPY /client.conf /etc/nginx/conf.d/default.conf