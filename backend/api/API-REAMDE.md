# Description
API & AUTH server.

# Install
* `npm install`

# Run
## In development
* `node src/server.js --facebook-secret your-fb-secret --dev`

# Production
## SSH
* `aws ecr get-login`
* execute login command
* `ssh -i ~/Desktop/tomasz-key-pair.pem ec2-user@ec2-54-89-222-246.compute-1.amazonaws.com`


#Road-map: 
* mask facebook-secret from log output

