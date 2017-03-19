docker rm -f my-words-db1
docker rmi my-words-db
docker build -t my-words-db . &&
docker run --name my-words-db1 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -d my-words-db &&
watch -n 1 docker ps
