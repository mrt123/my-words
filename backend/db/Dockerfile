FROM mysql:latest
EXPOSE 3306

ADD 0-dictionary-1913.sql /docker-entrypoint-initdb.d
ADD 1-favorites.sql /docker-entrypoint-initdb.d