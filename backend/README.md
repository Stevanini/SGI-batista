# Sistema de Gestão da Igreja (SGI)

## Rodando o app

```bash
# development
$ npm run start
```

## Banco de dados

```
mkdir -p /var/lib/data
```

```
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -v /var/lib/data -d postgres
```
ou criar junto com o PGAdmin via docker compose:

```
docker-compose -f ./docker-compose-pg.yml -p postgres up -d
```

## Docker 

### Utils

```
docker build --pull --rm -f Dockerfile -t backend:latest .
docker buildx build -t "sgi" .
docker run --network="host" -p 5555:5555 sgi
docker volume create --name=/opt/docker/sgi
docker-compose -f ./docker-compose.yml -p app --env-file ./backend/.docker.env up -d
docker-compose -f ./docker-compose.yml -p app --env-file .docker.env up --build
```

## OpenSSL

(Download)[https://slproweb.com/products/Win32OpenSSL.html]
