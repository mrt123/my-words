# Description
This container provides REST API service on port 1337. 

# Pre-requisites
REST API service provided by this container depends on user-defined 
docker network "network-1" to communicate with database. 

## In production:
Make sure you: 
* [understand user-defined networks](https://docs.docker.com/engine/userguide/networking/#user-defined-networks) 
* have your network created: `docker network create network-1`
* have another container with database provided join this network. Read: [connecting containers](https://docs.docker.com/engine/userguide/networking/work-with-networks/#connect-containers)
* note: `link` option may be used here (its not the same as legacy`link` for default bridge network).


# Run for development
* `npm start`

# Run via Docker
Build Image
* `docker build -t words-api .`

Stop previous container if running
* `docker stop words-api-box`

Run container & publish port to the host
* `docker run -p 1337:1337 -e NODE_ENV=production --net=network-1 --rm -d --name words-api-box words-api`

Test:
* Access through container shell: `docker exec -it words-api-box bash` then `curl localhost:1337/api/words/box`
* Or use your local env `curl localhost:1337/api/words/box`
* See logs : `docker logs words-api-box`


Useful Queries:
* TODO  (document API via examples)
``` 

```


# Road-map: 
* Move to node:slim container (bash is still required for troubleshooting)

