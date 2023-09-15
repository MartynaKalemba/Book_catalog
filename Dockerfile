FROM httpd:2.4.53-alpine
LABEL topic="BookStoreApp"
ADD . /usr/local/apache2/htdocs
EXPOSE 3000
