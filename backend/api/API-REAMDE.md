# Description
API & AUTH server.
* provides REST API service on port 1337
* run it via docker Docker or directly in node

# Pre-requisites
* `npm install -g yarn`
* `yarn global add knex`    - if you wish to work with db migrations

# Install
* `yarn install`
* have these env variables preset:
** WORDS_FB_SECRET   (your facebook app's secret)
** WORDS_SECRET  - used to generate auth token (required for production only)
* You must ensure DB is running (required db spec will be printed upon npn start)

# Run Locally via Node
* `npm start`

## Run Locally via Docker
Build Image
* `docker build -t words-api .`

Create user defined network  (TODO: check if default bridge network can be used instead)
* `docker network create network-1` - needed to communicate with DB docker container

Stop previous container if running
* `docker stop words-api-box`

Run container & publish port to the host
* `docker run -p 1337:1337 -e NODE_ENV=dev --net=network-1 --rm -d --name words-api-box words-api`

## Test local docker container:
* Access through container shell: `docker exec -it words-api-box bash` then `curl localhost:1337/api/words/box`
* Or use your local env `curl localhost:1337/api/words/box`
* See logs : `docker logs words-api-box`

## Publish new image with AWS
* `aws ecr get-login` & exec returned login command
* `docker build -t words-api ./backend/api`
* `docker tag words-api:latest 065171125835.dkr.ecr.us-east-1.amazonaws.com/words-api:latest`
* `docker push 065171125835.dkr.ecr.us-east-1.amazonaws.com/words-api:latest`

## Run new version of app via AWS - ECS (Ec2 Container Service)
* Setup api service task:
** network mode : bridge
** Container settings:
*** map host port 80 to container port 1337	(tcp)
*** setup FB_SECRET & NODE_ENV=production
*** setup extra host : words-db-box	172.17.0.2 
* stop and start task in the cluster (No need to create new task revision unless you're changing task config)


## Notes on AWS:
Make sure you: 
* [understand user-defined networks](https://docs.docker.com/engine/userguide/networking/#user-defined-networks) 
* make sure both API & DB containers are able to communicate via network Read: [connecting containers](https://docs.docker.com/engine/userguide/networking/work-with-networks/#connect-containers)
* note: `link` option may be used here (its not the same as legacy`link` for default bridge network).


## SSH (to troubleshoot EC2 instance)
* `aws ecr get-login`
* execute login command
* `ssh -i ~/Desktop/tomasz-key-pair.pem ec2-user@ec2-54-89-222-246.compute-1.amazonaws.com`

# Road-map: 
* Move to node:slim container (bash is still required for troubleshooting)
* partially mask facebook-secret from log output
* change app.protocol / host / port  to ui.protocol etc (will be used to: redirect  before/&/after login)

