FROM node:21 AS build-stage

COPY . /code

WORKDIR /code

RUN npm install

RUN npm run build

FROM nginx
COPY --from=build-stage /code/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]