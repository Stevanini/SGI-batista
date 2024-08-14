# Docker

- rode os comandos da pasta docker
- rode no terminal: chmod -R 755 .

## Rodando apenas o banco de dados

```
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -v /var/lib/data -d postgres
```

ou criar junto com o PGAdmin via docker compose:

```
docker-compose -f ./DB/docker-compose.db.yml -p postgres up -d
```

### Backend

Build da imagem Local:

```
cd ../backend/ && docker build --pull --rm -f local.Dockerfile -t backend-local:latest . && cd ../docker
```

Build da imagem dev:

```
docker build --pull --rm -t backend-dev:latest -f ./BE/dev.Dockerfile "../backend"
```

Build do compose:

```
docker-compose -f ./BE/docker-compose.dev.yml -p backend --env-file ../backend/.env.docker up -d
```

### Frontend

Build da imagem:

```
docker build --pull --rm -t frontend-dev:latest -f ./FE/dev.Dockerfile "../frontend"
```

Build do compose:

```
docker-compose -f ./FE/docker-compose.dev.yml up -d
```

# Utils

Limpe o Cache do Docker

```
docker builder prune --force
```
