docker-compose down
docker image rm emart-ui
docker build . -t emart-ui
docker-compose up -d