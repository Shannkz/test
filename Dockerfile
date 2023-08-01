FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d

EXPOSE 8082