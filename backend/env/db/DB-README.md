# Run
Build Image
* `docker build -t my-words-db .`

Remove previous containers if exist
* `docker rm -f my-words-db1`

Run & publish port to the host
* `docker run --name my-words-db1 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -d my-words-db`

Test DB:
* Access through container shell: `docker exec -it my-words-db1 bash` then `mysql -p`
* Or use your local client `mysql -u root -p -h 127.0.0.1`


#TODO: 
* expand docker file ( https://docs.docker.com/engine/getstarted/step_four/ )

