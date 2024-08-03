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
podman run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -v /var/lib/data -d postgres
```

## OpenSSL

(Download)[https://slproweb.com/products/Win32OpenSSL.html]
