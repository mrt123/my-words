# Description
Docker container to provide database for development & production.

# Pre-requisites

## In production:
Make sure you:
* [understand user-defined networks](https://docs.docker.com/engine/userguide/networking/#user-defined-networks)
* have your network created: `docker network create network-1`
* have other container who use this database join this network. Read: [connecting containers](https://docs.docker.com/engine/userguide/networking/work-with-networks/#connect-containers)
* note: `link` option may be used here (its not the same as legacy`link` for default bridge network).

# Run
Build Image
* `docker build . -t words-db .`

Stop previous container if running
* `docker stop words-api-box`

Run container & publish port to the host
* `docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 --net=network-1 --rm -d --name words-db-box words-db`

Test DB:
* Access through container shell: `docker exec -it words-db-box bash` then `mysql -p`
* Or use your local client `mysql -u root -p123 -h 127.0.0.1`
* See logs : `docker logs words-db-box`


Useful Queries:
* none (queries are simple, check backend code for examples)


#Road-map:
* Consider whether KNEX migration belongs in DB or API or separate
** when I deploy db I want db to be up to date
** when I deploy API ... I probably just want to deploy API (but I might also be deploying new features which require db schema update)
** API will be deployed way more often then schema (but DB container itself might never be re-deployed)
** running knex when there's no migration shouldn't take more then a split second
** I don't deploy API via docker on local (can I deploy an already migrated DB container?)
