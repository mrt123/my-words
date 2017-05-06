docker build -t words-db . . &&
docker rm -f words-db-box
docker run  -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 --net=network-1 --rm -d --name words-db-box words-db &&
watch -n 1 docker ps
