FROM nginx:stable-alpine

COPY ./nginx/default.conf etc/nginx/conf.d/default.conf
COPY ./key.pem /key.pem
COPY ./cert.pem /cert.pem

RUN mkdir /static