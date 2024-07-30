# Sistema de Gestão da Igreja (SGI)

## Rodando o docker app
```bash
# 1° - Construa a imagem Docker
$ docker build -t frontend-app .

# 2° - Construção e Inicialização dos Contêineres
$ docker-compose up --build
```

## Comandos adicionais do Docker Compose

```bash
# Subir os contêineres em background:
$ docker-compose up -d

# Parar os contêineres:
$ docker-compose down

# Visualizar logs dos contêineres:
$ docker-compose logs -f

```

Com isso, você terá um ambiente configurado para rodar o projeto usando Docker Compose.